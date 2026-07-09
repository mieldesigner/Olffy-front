import styles from './AuthOptionButton.module.css';

export type AuthProvider = 'google' | 'microsoft' | 'apple';

interface AuthOptionButtonProps {
  provider: AuthProvider;
  label: string;
  onClick: () => void;
}

// Marcas SVG inline simples por proveedor (sin librerías ni emojis). Son
// mocks visuales — no hay OAuth real detrás.
function ProviderMark({ provider }: { provider: AuthProvider }) {
  switch (provider) {
    case 'google':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M21.6 12.23c0-.6-.05-1.18-.15-1.73H12v3.27h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.06z" />
          <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.75-5.58-4.11H3.06v2.58A10 10 0 0 0 12 22z" />
          <path fill="#FBBC05" d="M6.42 13.92a6 6 0 0 1 0-3.84V7.5H3.06a10 10 0 0 0 0 9z" />
          <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87A10 10 0 0 0 12 2 10 10 0 0 0 3.06 7.5l3.36 2.58C7.2 7.72 9.4 5.98 12 5.98z" />
        </svg>
      );
    case 'microsoft':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
      );
    case 'apple':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#2a1c10" aria-hidden="true">
          <path d="M17.05 12.5c-.03-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.29 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.88 5.9c.64-.78 1.07-1.85.95-2.93-.92.04-2.03.61-2.69 1.38-.59.69-1.11 1.79-.97 2.85 1.02.08 2.07-.52 2.71-1.3z" />
        </svg>
      );
    default:
      return null;
  }
}

export function AuthOptionButton({ provider, label, onClick }: AuthOptionButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.mark}>
        <ProviderMark provider={provider} />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
