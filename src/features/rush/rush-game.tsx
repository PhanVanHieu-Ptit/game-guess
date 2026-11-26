'use client';

import {
  useEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { dailySeed, vietnamDay } from '@/domain/rush/puzzles';
import {
  rushChallengeUrl,
  type RushChallenge,
} from '@/domain/share/rush-challenge';
import {
  initialRushState,
  RUSH_DURATION_MS,
  rushReducer,
} from '@/domain/rush/run';
import { StorageNotice } from '@/features/game-shell/storage-notice';
import { Button, ButtonLink } from '@/features/ui/button';
import {
  readRushBest,
  saveRushBest,
  subscribeRushBest,
} from '@/services/storage/rush-records';
import styles from './rush.module.css';
import { useRushAnalytics } from './use-rush-analytics';

function RushMascot() {
  return (
    <div className={styles.mascot} aria-hidden="true">
      <span className={styles.orbitOne}>?</span>
      <span className={styles.orbitTwo}>!</span>
      <div className={styles.face}>
        <div className={styles.eyes}>
          <i />
          <i />
        </div>
        <span className={styles.smile} />
      </div>
      <span className={styles.spark}>ϟ</span>
      <span className={styles.mascotCaption}>NHÌN KỸ. NGHĨ KHÁC.</span>
    </div>
  );
}

export function RushGame({
  daily = false,
  challenge = null,
  invalidChallenge = false,
}: {
  daily?: boolean;
  challenge?: RushChallenge | null;
  invalidChallenge?: boolean;
}) {
  const [state, dispatch] = useReducer(
    rushReducer,
    undefined,
    initialRushState,
  );
  const [share, setShare] = useState('');
  const analytics = useRushAnalytics(state);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const best = useSyncExternalStore(
    subscribeRushBest,
    () =>
      readRushBest(
        daily
          ? `daily:${challenge?.day ?? vietnamDay(Date.now())}`
          : challenge
            ? `challenge:v1:${challenge.seed}`
            : 'free',
      ),
    () => 0,
  );
  const active = state.phase === 'playing' || state.phase === 'feedback';

  useEffect(() => {
    if (!active) return;
    const tick = () => dispatch({ type: 'tick', now: Date.now() });
    const timer = window.setInterval(tick, 100);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [active]);

  useEffect(() => {
    if (state.phase !== 'feedback') return;
    const timer = window.setTimeout(
      () => dispatch({ type: 'next', now: Date.now() }),
      state.feedback?.correct ? 700 : 2400,
    );
    return () => window.clearTimeout(timer);
  }, [state.phase, state.feedback]);

  useEffect(() => {
    if (state.phase === 'finished') saveRushBest(state.recordKey, state.score);
  }, [state.phase, state.recordKey, state.score]);

  useEffect(() => {
    if (state.phase === 'playing' || state.phase === 'finished') {
      window.scrollTo(0, 0);
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [state.phase, state.index]);

  function start() {
    const now = Date.now();
    const day = challenge?.day ?? vietnamDay(now);
    const recordKey = daily
      ? `daily:${day}`
      : challenge
        ? `challenge:v1:${challenge.seed}`
        : 'free';
    const seed =
      challenge?.seed ??
      (daily ? dailySeed(day) : crypto.getRandomValues(new Uint32Array(1))[0]);
    setShare('');
    analytics.start({
      mode: daily ? 'daily' : 'rush',
      seed,
      day: daily ? day : '',
      challenged: challenge !== null,
    });
    dispatch({
      type: 'start',
      now,
      recordKey,
      seed,
      previousBest: readRushBest(recordKey),
    });
  }

  function challengeText() {
    const url = rushChallengeUrl(window.location.origin, {
      version: 1,
      seed: state.seed,
      score: state.score,
      ...(daily ? { day: state.recordKey.slice(6) } : {}),
    });
    return `Mình đạt ${state.score} điểm, giải ${state.solved} câu trong Đấu trí 60 giây của Lắt Léo${daily ? `, bộ câu ngày ${state.recordKey.slice(6)}` : ''}. Cùng bộ câu, bạn vượt được không? ${url}`;
  }

  async function copyChallenge() {
    const text = challengeText();
    try {
      await navigator.clipboard.writeText(text);
      setShare('Đã sao chép! Gửi cho người bạn muốn thách đấu nhé.');
      analytics.share('copied');
    } catch {
      setShare(text);
      analytics.share('manual');
    }
  }

  async function shareChallenge() {
    if (typeof navigator.share !== 'function') {
      await copyChallenge();
      return;
    }
    try {
      await navigator.share({
        title: 'Lắt Léo · Bạn vượt được không?',
        text: challengeText(),
      });
      setShare('Đã mở lời thách đấu. Rủ bạn so điểm nhé!');
      analytics.share('shared');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        analytics.share('cancelled');
        return;
      }
      await copyChallenge();
    }
  }

  const puzzle = state.deck[state.index];
  const seconds = Math.ceil(state.remainingMs / 1000);
  const newRecord = state.score > state.previousBest;
  const rank =
    state.score >= 2000
      ? 'Trùm lắt léo'
      : state.score >= 1000
        ? 'Não có võ'
        : state.score >= 500
          ? 'Bắt đầu bén rồi!'
          : 'Não đang khởi động';

  return (
    <main className={`page ${styles.page}`}>
      <nav className={styles.nav} aria-label="Điều hướng đấu trí">
        <ButtonLink variant="quiet" href="/">
          ← Trang chủ
        </ButtonLink>
        <span className={styles.mode}>
          {daily ? 'MỖI NGÀY MỘT KÈO' : 'CHẾ ĐỘ TỐC ĐỘ'}
        </span>
      </nav>

      {state.phase === 'ready' ? (
        <section className={styles.intro}>
          <p className={styles.eyebrow}>
            {daily ? 'ĐẤU TRÍ MỖI NGÀY' : 'ĐẤU TRÍ 60 GIÂY'}
          </p>
          <h1 className={styles.title}>
            {challenge ? (
              'Bạn vượt được?'
            ) : (
              <>
                Nhanh tay.
                <br />
                <span>Đừng nhanh tin.</span>
              </>
            )}
          </h1>
          {!challenge && <RushMascot />}
          {challenge && (
            <aside className={styles.challenge} aria-label="Lời thách đấu">
              <strong>Bạn có vượt được {challenge.score} điểm?</strong>
              <p>Cùng bộ câu, cùng thứ tự · 60 giây · 3 mạng.</p>
              {challenge.day && (
                <p>Bộ câu ngày {challenge.day} · giờ Việt Nam.</p>
              )}
            </aside>
          )}
          {invalidChallenge && (
            <p className={styles.description} role="status">
              Link thách đấu không hợp lệ hoặc thuộc phiên bản khác. Bạn vẫn có
              thể chơi bộ câu hiện tại.
            </p>
          )}
          <Button
            className={styles.start}
            block
            variant="primary"
            onClick={start}
          >
            Vào trận · 60 giây →
          </Button>
          <p className={styles.description}>
            {daily
              ? 'Cùng bộ câu, cùng thứ tự trong ngày. Rủ bạn chơi rồi so điểm xem ai tỉnh hơn.'
              : 'Chữ nói một đằng, mắt thấy một nẻo. Bạn giữ được cái đầu tỉnh trong 60 giây chứ?'}
          </p>
          <div className={styles.rules}>
            <div>
              <strong>
                60<span>giây</span>
              </strong>
              <p>Đua với đồng hồ</p>
            </div>
            <div>
              <strong>♥ ♥ ♥</strong>
              <p>Sai mất một mạng</p>
            </div>
            <div>
              <strong>+200</strong>
              <p>Tối đa mỗi câu</p>
            </div>
          </div>
          <p className={styles.best}>
            🏆{' '}
            {challenge
              ? 'Kỷ lục bộ câu này của bạn'
              : daily
                ? 'Kỷ lục hôm nay của bạn'
                : 'Kỷ lục của bạn'}
            : <strong>{best} điểm</strong>
          </p>
          <p className={styles.finePrint}>
            Đúng liên tiếp tăng điểm: 100 → 125 → 150 → 175 → 200.{' '}
            {challenge
              ? 'Bộ câu trong link được giữ nguyên khi chơi lại.'
              : daily
                ? 'Bộ câu đổi lúc 0h, giờ Việt Nam.'
                : 'Mỗi lượt xáo bộ câu mới.'}
          </p>
          <ButtonLink variant="quiet" href={daily ? '/rush' : '/daily'}>
            {daily ? 'Chơi bộ câu ngẫu nhiên →' : 'Thử bộ câu hôm nay →'}
          </ButtonLink>
        </section>
      ) : state.phase === 'finished' ? (
        <section className={styles.result} aria-label="Kết quả đấu trí">
          <p className={styles.eyebrow}>
            {state.lives === 0
              ? 'HẾT MẠNG, CHƯA HẾT VUI'
              : state.remainingMs > 0
                ? 'BẠN ĐÃ PHÁ ĐẢO BỘ CÂU!'
                : 'MỘT PHÚT ĐÃ HẾT!'}
          </p>
          <div className={styles.resultMedal} aria-hidden="true">
            {newRecord ? '🏆' : '⚡'}
          </div>
          <h1 ref={headingRef} tabIndex={-1} className={styles.resultTitle}>
            {rank}
          </h1>
          <p className={styles.resultScore} data-testid="rush-final-score">
            {state.score}
            <span>điểm</span>
          </p>
          {newRecord && <p className={styles.record}>✦ KỶ LỤC CÁ NHÂN MỚI ✦</p>}
          {challenge && (
            <p className={styles.challenge} role="status">
              {state.score > challenge.score
                ? `Bạn đã vượt mốc ${challenge.score} điểm!`
                : state.score === challenge.score
                  ? `Hòa rồi! Cùng đạt ${challenge.score} điểm.`
                  : `Bạn đạt ${state.score} điểm. Thử lại để vượt mốc ${challenge.score} nhé!`}
            </p>
          )}
          <Button
            block
            variant="primary"
            className={styles.start}
            onClick={start}
          >
            {daily ? 'Gỡ kèo · Chơi lại →' : 'Phục thù · Thêm một lượt →'}
          </Button>
          <dl className={styles.resultStats}>
            <div>
              <dt>Câu đúng</dt>
              <dd>{state.solved}</dd>
            </div>
            <div>
              <dt>Chuỗi tốt nhất</dt>
              <dd>{state.bestCombo}</dd>
            </div>
            <div>
              <dt>Kỷ lục{daily ? ' hôm nay' : ''}</dt>
              <dd>{Math.max(state.score, state.previousBest)}</dd>
            </div>
          </dl>
          {state.feedback && !state.feedback.correct && (
            <p className={styles.lastTrap}>
              <strong>Cú lừa cuối: </strong>
              {puzzle.explanation}
            </p>
          )}
          <p className={styles.description}>
            {newRecord
              ? 'Lượt vừa rồi bén đấy. Thêm một lượt, phá luôn kỷ lục mới?'
              : `Thử lại để vượt ${state.previousBest > 0 ? state.previousBest : 500} điểm nhé. Mỗi cú lừa đều có cách gỡ.`}
          </p>
          <Button block onClick={shareChallenge}>
            Thách đấu bạn bè
          </Button>
          <Button block variant="quiet" onClick={copyChallenge}>
            Sao chép lời thách đấu
          </Button>
          {share && (
            <p className={styles.share} role="status">
              {share}
            </p>
          )}
          <p className={styles.finePrint}>
            Kỷ lục lưu trên thiết bị này.
            {challenge && ' Điểm bạn bè tự chia sẻ · Có thể chơi lại.'}
          </p>
          {challenge && (
            <ButtonLink block variant="quiet" href={daily ? '/daily' : '/rush'}>
              {daily ? 'Chơi bộ câu hôm nay' : 'Chơi bộ câu ngẫu nhiên'}
            </ButtonLink>
          )}
          <ButtonLink block variant="quiet" href="/levels">
            Đổi gió với 42 màn phiêu lưu →
          </ButtonLink>
        </section>
      ) : (
        <section className={styles.arena} aria-label="Trận đấu trí">
          <div className={styles.scoreboard}>
            <div className={styles.hud}>
              <div
                className={styles.clock}
                data-urgent={seconds <= 10}
                role="timer"
                aria-label={`Còn ${seconds} giây`}
              >
                <strong>{seconds}</strong>
                <span>GIÂY</span>
              </div>
              <div className={styles.score}>
                <span>ĐIỂM</span>
                <strong data-testid="rush-score">{state.score}</strong>
              </div>
              <div
                className={styles.lives}
                aria-label={`Còn ${state.lives} mạng`}
              >
                <span aria-hidden="true">
                  {Array.from({ length: 3 }, (_, i) => (
                    <i key={i} data-lost={i >= state.lives}>
                      ♥
                    </i>
                  ))}
                </span>
                <span>3 SAI LÀ DỪNG</span>
              </div>
            </div>
            <div className={styles.timerTrack} aria-hidden="true">
              <span
                style={{
                  transform: `scaleX(${state.remainingMs / RUSH_DURATION_MS})`,
                }}
              />
            </div>
          </div>
          <div className={styles.questionMeta}>
            <span>CÂU {state.index + 1}</span>
            <span className={styles.combo} data-hot={state.combo >= 3}>
              {state.combo > 1
                ? `🔥 Chuỗi ${state.combo} · +${100 + Math.min(state.combo, 4) * 25} / câu`
                : '✦ Đúng liên tiếp để tăng điểm'}
            </span>
          </div>
          <div className={styles.question} key={state.index}>
            <p className={styles.eyebrow}>{puzzle.tag}</p>
            <h1 className={styles.prompt} ref={headingRef} tabIndex={-1}>
              {puzzle.prompt}
            </h1>
            {puzzle.tokens && (
              <div
                className={styles.basket}
                role="group"
                aria-label="Rổ trái cây"
              >
                {puzzle.tokens.map((token, i) => (
                  <span key={i} role="img" aria-label={token}>
                    {token}
                  </span>
                ))}
              </div>
            )}
            {puzzle.answer.length > 1 && (
              <p className={styles.sequence} aria-live="polite">
                {state.selected
                  .map(
                    (id) =>
                      puzzle.options.find((option) => option.id === id)?.label,
                  )
                  .join(' → ')}
                {state.selected.length > 0 ? ' → ' : ''}
                {Array.from(
                  { length: puzzle.answer.length - state.selected.length },
                  () => '○',
                ).join(' → ')}
              </p>
            )}
            <div
              className={styles.options}
              data-sequence={puzzle.answer.length > 1}
              data-family={puzzle.family}
            >
              {puzzle.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  data-touch-target
                  className={styles.option}
                  style={{ color: option.color, fontSize: option.size }}
                  aria-label={
                    option.color
                      ? `${option.label}, mực ${option.id.toLowerCase()}`
                      : option.label
                  }
                  disabled={
                    state.phase !== 'playing' ||
                    state.selected.includes(option.id)
                  }
                  data-selected={state.selected.includes(option.id)}
                  data-correct={
                    state.phase === 'feedback' &&
                    puzzle.answer.includes(option.id)
                  }
                  data-wrong={
                    state.phase === 'feedback' &&
                    !state.feedback?.correct &&
                    state.selected.at(-1) === option.id
                  }
                  onClick={() =>
                    dispatch({ type: 'answer', id: option.id, now: Date.now() })
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div
            className={styles.feedback}
            data-correct={state.feedback?.correct}
            role="status"
          >
            {state.phase === 'feedback' ? (
              <>
                <strong>
                  {state.feedback?.correct
                    ? `Chuẩn! +${state.feedback.points} điểm`
                    : 'Dính bẫy rồi! −1 mạng'}
                </strong>
                <p>
                  {state.feedback?.correct
                    ? state.combo >= 3
                      ? `Chuỗi ${state.combo}! Giữ nhịp nào.`
                      : 'Tiếp tục nào, bạn đang làm tốt!'
                    : puzzle.explanation}
                </p>
                <Button
                  variant="quiet"
                  onClick={() => dispatch({ type: 'next', now: Date.now() })}
                >
                  Câu tiếp →
                </Button>
              </>
            ) : (
              <p>Đọc kỹ một nhịp, bớt mất một mạng.</p>
            )}
          </div>
        </section>
      )}
      <StorageNotice />
    </main>
  );
}
