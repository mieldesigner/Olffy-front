import { GiftIcon, type GiftIconName } from '../storefront';
import styles from './BenefitsStrip.module.css';

interface BenefitItem {
  icon: GiftIconName;
  title: string;
  desc: string;
  chipBg: string;
  chipColor: string;
}

// Beneficios como mini feature blocks: chip de color por beneficio + texto.
// Lenguaje distinto al de las cards de "Conoce OLFFY" (más compacto y ágil).
const BENEFITS: BenefitItem[] = [
  { icon: 'package', title: 'Envíos a todo Chile', desc: 'Rápido y seguro, a tu puerta', chipBg: 'var(--olffy-amarillo-suave)', chipColor: '#c8901a' },
  { icon: 'store', title: 'Retiro gratis en tienda', desc: 'Te esperamos en Viña del Mar', chipBg: 'var(--olffy-morado-suave)', chipColor: 'var(--olffy-morado)' },
  { icon: 'palette', title: 'Papelería ilustrada', desc: 'Diseños propios hechos a mano', chipBg: 'var(--olffy-naranjo-suave)', chipColor: 'var(--olffy-naranjo)' },
  { icon: 'heart', title: 'Hecho con amor', desc: 'Cada pedido, empacado con cariño', chipBg: '#d8ecd9', chipColor: '#2e7d32' },
];

export function BenefitsStrip() {
  return (
    <div className={styles.wrap}>
      <ul className={styles.grid}>
        {BENEFITS.map((item) => (
          <li key={item.title} className={styles.item}>
            <span className={styles.chip} style={{ background: item.chipBg, color: item.chipColor }} aria-hidden="true">
              <GiftIcon name={item.icon} size={22} color={item.chipColor} />
            </span>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.desc}>{item.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
