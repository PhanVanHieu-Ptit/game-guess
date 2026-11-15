import type { HintTier } from '@/domain/hints/hint-machine';
import { strings } from '@/features/strings';
import { Button } from '@/features/ui/button';
import { BulbIcon } from '@/features/ui/icons';
import styles from './hud.module.css';

export interface BottomBarProps {
  hintTier: HintTier;
  /** Nút Gợi ý nhấp nháy (người chơi đang bí). */
  nudge: boolean;
  onOpenHints: () => void;
}

/** Thanh dưới của màn chơi: nút Gợi ý (kèm số gợi ý đã mở). */
export function BottomBar({ hintTier, nudge, onOpenHints }: BottomBarProps) {
  return (
    <footer className={styles.bottomBar}>
      <Button
        block
        variant="primary"
        icon={<BulbIcon />}
        className={styles.hintButton}
        data-nudge={nudge}
        onClick={onOpenHints}
      >
        {strings.play.hint(hintTier)}
      </Button>
    </footer>
  );
}
