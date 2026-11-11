#!/usr/bin/env python3
"""Validate planning metadata with Python's standard library; no app tests run."""

import argparse
import hashlib
import json
import re
import sys
from collections import Counter, deque
from pathlib import Path


class InvalidPlan(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise InvalidPlan(message)


def indexed(items, label):
    ids = [item['id'] for item in items]
    require(len(ids) == len(set(ids)), 'Duplicate ' + label + ' IDs')
    return {item['id']: item for item in items}


def validate(plan, folder):
    root = folder.parent.parent
    require(plan['schema_version'] == '1.0.0', 'Unsupported schema version')
    tasks = indexed(plan['tasks'], 'task')
    stories = indexed(plan['stories'], 'story')
    epics = indexed(plan['epics'], 'epic')
    features = indexed(plan['features'], 'feature')
    decisions = indexed(plan['decisions'], 'decision')
    sprints = indexed(plan['sprints'], 'sprint')
    require(tasks and sprints, 'Empty tasks or sprints')
    valid_statuses = set(plan['execution']['status_values'])
    required = {
        'id', 'title', 'description', 'priority', 'complexity', 'story_points',
        'dependencies', 'decision_dependencies', 'affected_files',
        'implementation_steps', 'subtasks', 'acceptance_criteria',
        'definition_of_done', 'verification_commands', 'manual_verification',
        'status', 'readiness', 'evidence', 'sprint_id', 'story_id', 'feature_id',
        'epic_id', 'max_target_work_days',
    }
    subtask_ids = []
    for tid, task in tasks.items():
        require(required <= task.keys(), tid + ': missing required fields')
        require(re.fullmatch(r'(?:LL-\d{3}-T\d{2}|AI-T\d{2}|DEF-\d{3,})', tid),
                tid + ': invalid task ID')
        require(task['priority'] in ('P0', 'P1', 'P2', 'P3'), tid + ': priority')
        require(task['complexity'] in ('XS', 'S', 'M', 'L', 'XL'), tid + ': complexity')
        require(type(task['story_points']) is int and task['story_points'] > 0,
                tid + ': points must be positive integer')
        require(task['max_target_work_days'] <= 1, tid + ': split work over one day')
        require(task['status'] in valid_statuses, tid + ': invalid status')
        require(task['readiness'] in ('ready', 'dependency_blocked', 'decision_blocked'),
                tid + ': invalid readiness')
        require(task['story_id'] in stories, tid + ': unknown story')
        require(task['epic_id'] in epics, tid + ': unknown epic')
        require(task['feature_id'] in features, tid + ': unknown feature')
        story = stories[task['story_id']]
        require(story['epic_id'] == task['epic_id'], tid + ': story/epic mismatch')
        require(story['feature_id'] == task['feature_id'], tid + ': story/feature mismatch')
        require(features[task['feature_id']]['epic_id'] == task['epic_id'],
                tid + ': feature/epic mismatch')
        for key in ('title', 'description', 'affected_files', 'implementation_steps',
                    'acceptance_criteria', 'definition_of_done', 'verification_commands'):
            require(bool(task[key]), tid + ': empty ' + key)
        for path in task['affected_files']:
            require(not Path(path).is_absolute() and '..' not in Path(path).parts,
                    tid + ': affected file must be repository relative')
        deps = task['dependencies']
        require(isinstance(deps, list) and len(deps) == len(set(deps)),
                tid + ': duplicate/malformed dependencies')
        require(tid not in deps, tid + ': self dependency')
        require(set(deps) <= tasks.keys(), tid + ': unknown dependency')
        gates = task['decision_dependencies']
        require(len(gates) == len(set(gates)) and set(gates) <= decisions.keys(),
                tid + ': unknown/duplicate decision gate')
        require(len(task['subtasks']) == len(task['implementation_steps']),
                tid + ': subtasks/steps mismatch')
        for i, subtask in enumerate(task['subtasks'], 1):
            require(subtask['id'] == tid + '-S%02d' % i, tid + ': subtask ID')
            require(subtask['title'] == task['implementation_steps'][i - 1],
                    tid + ': subtask title/step mismatch')
            require(subtask['status'] in valid_statuses, tid + ': subtask status')
            subtask_ids.append(subtask['id'])
        require(isinstance(task['evidence'], list), tid + ': evidence must be a list')
        if task['status'] == 'done':
            require(bool(task['evidence']), tid + ': done without evidence')
            require(all(tasks[d]['status'] == 'done' for d in deps),
                    tid + ': done before dependencies')
            require(all(x['status'] == 'done' for x in task['subtasks']),
                    tid + ': done before subtasks')
            for gate in gates:
                decision = decisions[gate]
                require(decision['status'] == 'resolved' and decision['evidence'],
                        tid + ': done before gate ' + gate)
                require(any(tid in ev.get('scope_task_ids', [])
                            for ev in decision['evidence'] if isinstance(ev, dict)),
                        tid + ': missing scoped approval for ' + gate)
    require(len(subtask_ids) == len(set(subtask_ids)), 'Duplicate subtask IDs')

    # Verify the full dependency graph, independently from proposed execution order.
    incoming = {tid: len(t['dependencies']) for tid, t in tasks.items()}
    followers = {tid: [] for tid in tasks}
    for tid, task in tasks.items():
        for dep in task['dependencies']:
            followers[dep].append(tid)
    ready = deque(tid for tid, n in incoming.items() if n == 0)
    seen = []
    while ready:
        tid = ready.popleft()
        seen.append(tid)
        for child in followers[tid]:
            incoming[child] -= 1
            if incoming[child] == 0:
                ready.append(child)
    require(len(seen) == len(tasks), 'Cycle in task dependency graph')

    product_ids = {'LL-%03d' % i for i in range(1, 52)}
    require({sid for sid in stories if sid.startswith('LL-')} == product_ids,
            'Source stories LL-001 through LL-051 must be preserved')
    require(sum(stories[s]['source_story_points'] for s in product_ids) == 211,
            'Source story estimate changed without requirements reconciliation')
    story_members = []
    for sid, story in stories.items():
        require(story['feature_id'] in features and story['epic_id'] in epics,
                sid + ': hierarchy reference')
        require(sid in features[story['feature_id']]['story_ids'],
                sid + ': missing in feature')
        members = story['task_ids']
        require(members and set(members) <= tasks.keys(), sid + ': unknown/empty task list')
        require(all(tasks[x]['story_id'] == sid for x in members), sid + ': task owner mismatch')
        require(story['acceptance_criteria'], sid + ': missing story acceptance criteria')
        story_members.extend(members)
        # Preserve every canonical source-story dependency through internal root tasks.
        for dep_story in story.get('source_dependencies', []):
            require(dep_story in stories, sid + ': unknown source dependency')
            dep_members = stories[dep_story]['task_ids']
            used_inside = {d for x in dep_members for d in tasks[x]['dependencies']
                           if d in dep_members}
            terminal = set(dep_members) - used_inside
            for x in members:
                if not set(tasks[x]['dependencies']).intersection(members):
                    require(terminal <= set(tasks[x]['dependencies']),
                            x + ': dropped canonical dependency ' + dep_story)
    require(Counter(story_members) == Counter(tasks.keys()),
            'Each task must belong to exactly one story')

    admitted_order = set()
    assigned = []
    prior_sprints = set()
    for sprint in plan['sprints']:
        sid = sprint['id']
        require(set(sprint['dependencies']) <= prior_sprints,
                sid + ': unknown, same or later sprint dependency')
        members = sprint['task_ids']
        require(members and set(members) <= tasks.keys(), sid + ': unknown/empty task list')
        require(all(tasks[x]['sprint_id'] == sid for x in members), sid + ': task assignment')
        points = sum(tasks[x]['story_points'] for x in members)
        require(sprint['story_points'] == points, sid + ': point total mismatch')
        require(points <= plan['estimation']['capacity_per_sprint'], sid + ': over capacity')
        for key in ('goal', 'scope', 'deliverables', 'acceptance_criteria',
                    'exit_criteria', 'risks', 'execution_waves'):
            require(sprint.get(key), sid + ': missing ' + key)
        wave_members = []
        for wave in sprint['execution_waves']:
            require(wave and set(wave) <= set(members), sid + ': unknown/empty wave')
            for tid in wave:
                require(set(tasks[tid]['dependencies']) <= admitted_order,
                        tid + ': dependency appears in same or later wave/sprint')
                for dep in tasks[tid]['dependencies']:
                    dep_sprint = tasks[dep]['sprint_id']
                    require(dep_sprint == sid or dep_sprint in sprint['dependencies'],
                            sid + ': missing prerequisite sprint ' + dep_sprint)
            admitted_order.update(wave)
            wave_members.extend(wave)
        require(Counter(wave_members) == Counter(members), sid + ': wave membership mismatch')
        assigned.extend(members)
        prior_sprints.add(sid)
    require(Counter(assigned) == Counter(tasks.keys()),
            'Each task must appear exactly once in sprint candidates')

    for entry in plan['source_files']:
        file = root / entry['path']
        require(file.is_file(), 'Source missing: ' + entry['path'])
        require(hashlib.sha256(file.read_bytes()).hexdigest() == entry['sha256'],
                'Source drift: ' + entry['path'] + '; inspect changes before replanning')

    names = ['PROJECT_ANALYSIS', 'REQUIREMENTS', 'GAP_ANALYSIS', 'ROADMAP', 'BACKLOG',
             'SPRINT_PLAN', 'ARCHITECTURE', 'RISKS', 'EXECUTION_RULES', 'PROGRESS']
    texts = {}
    marker = '<!-- plan-stats: tasks=%d; sprints=%d; points=%d -->' % (
        len(tasks), len(sprints), sum(t['story_points'] for t in tasks.values()))
    for name in names:
        file = folder / (name + '.md')
        require(file.is_file(), 'Missing required document: ' + file.name)
        text = file.read_text(encoding='utf-8')
        require(marker in text, file.name + ': stale counts')
        require('VERIFICATION_PENDING' not in text, file.name + ': verification not recorded')
        texts[name] = text
        for tid in re.findall(r'\b(?:LL-\d{3}-T\d{2}|AI-T\d{2})\b', text):
            require(tid in tasks, file.name + ': unknown task reference ' + tid)
    headings = re.findall(r'^### ((?:LL-\d{3}-T\d{2}|AI-T\d{2}|DEF-\d{3,})) — ',
                          texts['BACKLOG'], re.M)
    require(Counter(headings) == Counter(tasks.keys()), 'BACKLOG task headings mismatch')
    blocks = re.split(r'^### (?=(?:LL-|AI-T|DEF-))', texts['BACKLOG'], flags=re.M)[1:]
    for block in blocks:
        tid = block.split(' — ', 1)[0]
        task = tasks[tid]
        require(block.startswith(tid + ' — ' + task['title']), tid + ': Markdown title drift')
        require('**' + task['priority'] + ' · ' + task['complexity'] + ' · '
                + str(task['story_points']) + ' SP**' in block,
                tid + ': Markdown estimate/priority drift')
        require(task['sprint_id'] in block and '`' + task['status'] + '`' in block,
                tid + ': Markdown sprint/status drift')
        dep_line = re.search(r'^\*\*Dependencies:\*\* (.+)$', block, re.M)
        require(dep_line is not None, tid + ': missing Markdown dependencies')
        dep_text, gate_text = dep_line.group(1).split(' **Decision/evidence gates:** ', 1)
        md_deps = re.findall(r'\[((?:LL-\d{3}-T\d{2}|AI-T\d{2}|DEF-\d{3,}))\]', dep_text)
        require(md_deps == task['dependencies'], tid + ': Markdown dependency drift')
        md_gates = re.findall(r'`([^`]+)`', gate_text)
        require(md_gates == task['decision_dependencies'], tid + ': Markdown gate drift')
        for value in (task['description'], *task['affected_files'],
                      *task['implementation_steps'], *task['acceptance_criteria'],
                      *task['verification_commands'], *task['manual_verification']):
            require(value in block, tid + ': Markdown specification drift: ' + value[:60])
    for story in plan['stories']:
        if story['id'].startswith('LL-'):
            require(re.search(r'^### ' + re.escape(story['id']) + ' — ',
                              texts['REQUIREMENTS'], re.M),
                    story['id'] + ': missing requirements section')
            require('| ' + story['id'] + ' / ' in texts['GAP_ANALYSIS'],
                    story['id'] + ': missing gap row')
    for sprint in plan['sprints']:
        require('## ' + sprint['id'] + ' — ' in texts['SPRINT_PLAN'],
                sprint['id'] + ': missing sprint section')
        section = texts['SPRINT_PLAN'].split('## ' + sprint['id'] + ' — ', 1)[1].split('\n## ', 1)[0]
        md_tasks = re.search(r'^\*\*Task IDs:\*\* (.+)$', section, re.M)
        require(md_tasks is not None, sprint['id'] + ': missing task list')
        listed = re.findall(r'\[((?:LL-\d{3}-T\d{2}|AI-T\d{2}|DEF-\d{3,}))\]',
                            md_tasks.group(1))
        require(listed == sprint['task_ids'], sprint['id'] + ': Markdown membership drift')
        require(str(sprint['story_points']) + '/20 SP' in section,
                sprint['id'] + ': Markdown point drift')
    return {
        'tasks': len(tasks), 'sprints': len(sprints),
        'task_points': sum(t['story_points'] for t in tasks.values()),
        'source_stories': len(product_ids), 'source_points': 211,
        'statuses': dict(Counter(t['status'] for t in tasks.values())),
        'dependency_edges': sum(len(t['dependencies']) for t in tasks.values()),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--plan', type=Path, help='Alternative JSON for structural regression checks')
    args = parser.parse_args()
    folder = Path(__file__).resolve().parent
    file = args.plan or folder / 'tasks.json'
    try:
        plan = json.loads(file.read_text(encoding='utf-8'))
        result = validate(plan, folder)
    except (ValueError, KeyError, TypeError, OSError) as exc:
        print('FAIL: ' + str(exc), file=sys.stderr)
        return 1
    print('PASS: ' + json.dumps(result, ensure_ascii=False, sort_keys=True))
    print('Checked metadata, DAG, waves, source hashes and Markdown; application was not tested.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
