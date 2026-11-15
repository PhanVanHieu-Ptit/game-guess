import { strings } from '@/features/strings';
import { HomeActions } from './home-actions';
import styles from './home.module.css';

/** Trang chủ (docs/GDD.md mục 4, màn hình số 1). Phần chữ tĩnh dựng ở máy chủ; phần phụ thuộc tiến trình nằm ở HomeActions. */
export function HomeScreen() {
  return (
    <main className={`page ${styles.home}`}>
      <header className={styles.hero}>
        {/* Hình bao lì xì trang trí, không mang nghĩa nên ẩn khỏi trình đọc màn hình. */}
        <svg
          className={styles.logo}
          viewBox="0 0 72 88"
          width="72"
          height="88"
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="6"
            y="6"
            width="60"
            height="76"
            rx="10"
            fill="#c62f3b"
            stroke="#231f3f"
            strokeWidth="4"
          />
          <path
            d="M6 30c18 14 42 14 60 0"
            fill="none"
            stroke="#231f3f"
            strokeWidth="4"
          />
          <circle
            cx="36"
            cy="38"
            r="11"
            fill="#ffc53d"
            stroke="#231f3f"
            strokeWidth="4"
          />
        </svg>
        <h1 className={styles.title}>{strings.appName}</h1>
        <p className={styles.tagline}>{strings.tagline}</p>
      </header>
      <HomeActions />
    </main>
  );
}
