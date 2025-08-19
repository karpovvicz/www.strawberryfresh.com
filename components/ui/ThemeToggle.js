import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted, systemPreference } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
        <div className={styles.button} aria-hidden="true"></div>
    );
  }

  const isSystemDark = systemPreference === 'dark';
  const currentTheme = theme === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

  return (
      <button
          onClick={toggleTheme}
          className={`${styles.button} ${theme === 'dark' ? 'dark' : ''}`}
          aria-label={`Switch to ${nextTheme} mode. Current: ${currentTheme} mode${isSystemDark ? ' (system prefers dark)' : ''}`}
          title={`Switch to ${nextTheme} mode`}
      >
        <div className={styles.icon}>
          {/* Sun Icon */}
          <svg
              className={styles.sun + (theme === 'light' ? '' : ' dark')}
              style={{ opacity: theme === 'light' ? 1 : 0, transform: theme === 'light' ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          {/* Moon Icon */}
          <svg
              className={styles.moon + (theme === 'dark' ? ' dark' : '')}
              style={{ opacity: theme === 'dark' ? 1 : 0, transform: theme === 'dark' ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
        {/* Glow effect */}
        <div className={
            styles.glow + ' ' + (theme === 'light' ? styles.glowLight : styles.glowDark)
        }></div>
      </button>
  );
}