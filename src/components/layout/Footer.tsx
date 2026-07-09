import { useRef } from 'react';
import styles from './Footer.module.css';
import { NewsletterForm } from './NewsletterForm';
import type { PublicPage } from './navigation';

interface FooterProps {
  onNavigate: (page: PublicPage) => void;
  onEnterAdmin?: () => void;
}

// Footer del storefront: marca, columnas de links, newsletter y bottom bar.
// Acceso temporal/mock al admin: triple-click (o Alt/Option + click) sobre el
// texto "Hecho por Mouselabs". No hay link visible en el navbar público.
export function Footer({ onNavigate, onEnterAdmin }: FooterProps) {
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCreditClick = (e: React.MouseEvent) => {
    if (!onEnterAdmin) return;
    // Alt/Option + click = atajo directo al admin demo.
    if (e.altKey) {
      onEnterAdmin();
      return;
    }
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      onEnterAdmin();
      return;
    }
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 600);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <span className={styles.logo}>OLFFY®</span>
            <p className={styles.tagline}>Papelería ilustrada para organizar, crear y regalar con magia.</p>
            <div className={styles.social}>
              <a className={styles.socialLink} href="#" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className={styles.colTitle}>Tienda</h3>
            <div className={styles.linkList}>
              <button type="button" className={styles.linkBtn} onClick={() => onNavigate('tienda')}>Ver catálogo</button>
              <button type="button" className={styles.linkBtn} onClick={() => onNavigate('novedades')}>Novedades</button>
              <button type="button" className={styles.linkBtn} onClick={() => onNavigate('regalos')}>Regalos</button>
            </div>
          </div>

          <div>
            <h3 className={styles.colTitle}>Nosotros</h3>
            <div className={styles.linkList}>
              <button type="button" className={styles.linkBtn} onClick={() => onNavigate('historia')}>Nuestra historia</button>
              <button type="button" className={styles.linkBtn} onClick={() => onNavigate('contacto')}>Contacto</button>
              <button type="button" className={styles.linkBtn} onClick={() => onNavigate('puntos')}>OLFFY Puntos</button>
            </div>
          </div>

          <div className={styles.newsletterCol}>
            <h3 className={styles.colTitle}>Newsletter</h3>
            <p>Envíos a todo Chile · Retiro en tienda</p>
            <NewsletterForm />
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© {new Date().getFullYear()} OLFFY. Todos los derechos reservados.</span>
          <button
            type="button"
            className={styles.credit}
            onClick={handleCreditClick}
            title="Admin (demo, temporal): triple-click o Alt/Option + click"
          >
            Hecho por Mouselabs
          </button>
        </div>
      </div>
    </footer>
  );
}
