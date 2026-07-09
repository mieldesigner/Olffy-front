import { IconPlaceholder } from '../ui';
import { GiftIcon, type GiftIconName } from '../storefront';
import { PuntosLoginMock } from './PuntosLoginMock';
import styles from './PuntosHero.module.css';

interface PuntosHeroProps {
  onEnterDemo: () => void;
}

const BENEFITS: { icon: GiftIconName; label: string }[] = [
  { icon: 'checklist', label: 'Seguimiento de pedidos' },
  { icon: 'star', label: 'Puntos acumulados' },
  { icon: 'tag', label: 'Cupones y recompensas' },
  { icon: 'users', label: 'Comunidad OLFFY' },
];

// Entrada al Club OLFFY — sección morada integrada de 2 columnas: editorial
// (izquierda) + panel de acceso/registro mock (derecha), en un solo bloque.
export function PuntosHero({ onEnterDemo }: PuntosHeroProps) {
  return (
    <section className={styles.hero}>
      <span aria-hidden="true" className={`${styles.blob} ${styles.blobOne}`} />
      <span aria-hidden="true" className={`${styles.blob} ${styles.blobTwo}`} />
      <span aria-hidden="true" className={styles.flower}>
        <IconPlaceholder size={200} color="rgba(255,255,255,0.06)" />
      </span>

      <div className={styles.grid}>
        <div className={styles.editorial}>
          <div className={styles.eyebrow}>Club OLFFY</div>
          <h1 className={styles.title}>Bienvenida al Club OLFFY</h1>
          <p className={styles.text}>
            Aquí podrás hacer seguimiento de tus pedidos, revisar tus puntos acumulados,
            obtener cupones y formar parte de la comunidad OLFFY.
          </p>
          <ul className={styles.benefits}>
            {BENEFITS.map((benefit) => (
              <li key={benefit.label} className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <GiftIcon name={benefit.icon} size={18} />
                </span>
                <span className={styles.benefitLabel}>{benefit.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <PuntosLoginMock onEnterDemo={onEnterDemo} />
        </div>
      </div>
    </section>
  );
}
