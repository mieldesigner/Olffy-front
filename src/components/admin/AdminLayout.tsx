import { useEffect, useState, type ReactNode } from 'react';
import { Drawer } from '../ui';
import { AdminSidebar, ADMIN_NAV, type AdminTab } from './AdminSidebar';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onExit: () => void;
  children: ReactNode;
}

// Shell del panel admin. Desktop (>=1200px): sidebar lateral fija. Tablet/mobile
// (<1200px): topbar con botón menú + drawer lateral con la misma navegación.
export function AdminLayout({ activeTab, onTabChange, onExit, children }: AdminLayoutProps) {
  const [navOpen, setNavOpen] = useState(false);
  const sectionLabel = ADMIN_NAV.find((n) => n.id === activeTab)?.label ?? '';

  // Cierra el drawer con Escape (mismo patrón que otros overlays).
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  // Al cambiar de sección desde el drawer, navega y cierra.
  const handleNavChange = (tab: AdminTab) => {
    onTabChange(tab);
    setNavOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Topbar (solo tablet/mobile). */}
      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setNavOpen(true)}
          aria-label="Abrir menú de navegación"
          aria-expanded={navOpen}
          aria-controls="admin-mobile-nav"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <div className={styles.topbarBrand}>
          <span className={styles.topbarLogo}>OLFFY®</span>
          <span className={styles.topbarSection}>{sectionLabel}</span>
        </div>
      </header>

      {/* Sidebar fija (solo desktop). */}
      <aside className={styles.desktopSidebar}>
        <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} onExit={onExit} />
      </aside>

      {/* Drawer de navegación (tablet/mobile). */}
      <div id="admin-mobile-nav">
        <Drawer isOpen={navOpen} onClose={() => setNavOpen(false)} side="left" panelClassName={styles.navPanel}>
          <AdminSidebar
            activeTab={activeTab}
            onTabChange={handleNavChange}
            onExit={onExit}
            onClose={() => setNavOpen(false)}
          />
        </Drawer>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
