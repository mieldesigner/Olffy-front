import { useState, type SubmitEvent } from 'react';
import { Button } from '../ui';
import { AuthOptionButton, type AuthProvider } from './AuthOptionButton';
import styles from './PuntosLoginMock.module.css';

interface PuntosLoginMockProps {
  onEnterDemo: () => void;
}

type AuthMode = 'signup' | 'login';

const PROVIDERS: { provider: AuthProvider; label: string }[] = [
  { provider: 'google', label: 'Continuar con Google' },
  { provider: 'microsoft', label: 'Continuar con Microsoft' },
  { provider: 'apple', label: 'Continuar con Apple' },
];

const PROVIDER_NAMES: Record<AuthProvider, string> = {
  google: 'Google',
  microsoft: 'Microsoft',
  apple: 'Apple',
};

// Panel de acceso mock (sin auth real): tabs Crear cuenta / Iniciar sesión +
// botones sociales. Cualquier acción lleva a un estado de éxito con un botón
// para entrar al dashboard cliente vía onEnterDemo.
export function PuntosLoginMock({ onEnterDemo }: PuntosLoginMockProps) {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError(null);
    setSuccess(null);
  };

  const resetToForm = () => {
    setSuccess(null);
    setError(null);
  };

  const handleSignup = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError(null);
    setSuccess('Cuenta creada en modo demo. Ya puedes revisar tus puntos.');
  };

  const handleLogin = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess('Sesión iniciada en modo demo.');
  };

  const handleSocial = (provider: AuthProvider) => {
    setError(null);
    setSuccess(`Continuaste con ${PROVIDER_NAMES[provider]} en modo demo.`);
  };

  if (success) {
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <span className={styles.successBadge}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5 5 11-11" />
            </svg>
          </span>
          <h3 className={styles.successTitle}>{success}</h3>
          <Button variant="primary" className={styles.dashboardBtn} onClick={onEnterDemo}>
            Ver mi dashboard de puntos
          </Button>
          <button type="button" className={styles.resetLink} onClick={resetToForm}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  const isSignup = mode === 'signup';

  return (
    <div className={styles.card}>
      <div className={styles.tabs} role="tablist" aria-label="Acceso a OLFFY Puntos">
        <button
          type="button"
          role="tab"
          aria-selected={isSignup}
          className={`${styles.tab} ${isSignup ? styles.tabActive : ''}`}
          onClick={() => switchMode('signup')}
        >
          Crear cuenta
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isSignup}
          className={`${styles.tab} ${!isSignup ? styles.tabActive : ''}`}
          onClick={() => switchMode('login')}
        >
          Iniciar sesión
        </button>
      </div>

      {isSignup ? (
        <form className={styles.form} onSubmit={handleSignup}>
          <label className={styles.field}>
            <span className={styles.label}>Correo</span>
            <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.cl" required />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Contraseña</span>
            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Verificar contraseña</span>
            <input className={styles.input} type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
          </label>
          {error && <span className={styles.error}>{error}</span>}
          <Button type="submit" variant="primary" className={styles.submitBtn}>
            Crear cuenta
          </Button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.field}>
            <span className={styles.label}>Correo</span>
            <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.cl" required />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Contraseña</span>
            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <div className={styles.forgotRow}>
            <button type="button" className={styles.forgotLink} onClick={() => setError(null)}>
              Olvidé mi contraseña
            </button>
          </div>
          <Button type="submit" variant="primary" className={styles.submitBtn}>
            Entrar
          </Button>
        </form>
      )}

      <div className={styles.separator}>{isSignup ? 'o continúa con' : 'o entra con'}</div>

      <div className={styles.socials}>
        {PROVIDERS.map((p) => (
          <AuthOptionButton key={p.provider} provider={p.provider} label={p.label} onClick={() => handleSocial(p.provider)} />
        ))}
      </div>

      <p className={styles.note}>Versión demo; la autenticación real se conectará después.</p>
    </div>
  );
}
