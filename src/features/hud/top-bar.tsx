import { strings } from '@/features/strings';
import { IconButton, IconLink } from '@/features/ui/button';
import { ArrowLeftIcon, RestartIcon } from '@/features/ui/icons';
import styles from './hud.module.css';

export interface TopBarProps {
  ordinal: number;
  total: number;
  onRestart: () => void;
  chapter?: string;
}

/** Thanh trên của màn chơi: về chọn màn · số màn · chơi lại (docs/GDD.md mục 4). */
export function TopBar({ ordinal, total, onRestart, chapter }: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <IconLink href="/levels" label={strings.play.back}>
        <ArrowLeftIcon />
      </IconLink>
      <div>
        <h1 className={styles.title}>{strings.play.levelOf(ordinal, total)}</h1>
        {chapter && <p className={styles.chapter}>{chapter}</p>}
      </div>
      <IconButton label={strings.play.restart} onClick={onRestart}>
        <RestartIcon />
      </IconButton>
    </header>
  );
}
