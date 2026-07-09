import { ProductImage } from '../components/ui';
import { GiftIcon, type GiftIconName } from '../components/storefront';
import styles from './HistoriaPage.module.css';

const PROCESS_STEPS: { icon: GiftIconName; bg: string; iconBg: string; title: string; text: string }[] = [
  { icon: 'bulb', bg: 'var(--olffy-crema)', iconBg: 'var(--olffy-amarillo)', title: 'Idea', text: 'Todo nace de una idea creativa inspirada en la vida cotidiana y en pequeños detalles.' },
  { icon: 'pen', bg: 'var(--olffy-morado-suave)', iconBg: 'var(--olffy-morado)', title: 'Ilustración', text: 'Cada diseño se ilustra a mano, con cariño y con la paleta de colores OLFFY.' },
  { icon: 'ruler', bg: 'var(--olffy-naranjo-suave)', iconBg: 'var(--olffy-naranjo)', title: 'Diseño', text: 'Las ilustraciones toman forma en cuadernos, planners y papelería pensados para durar.' },
  { icon: 'package', bg: 'var(--olffy-amarillo-suave)', iconBg: '#c8901a', title: 'Empaque', text: 'Empacamos cada pedido a mano en Viña del Mar, listo para viajar a todo Chile.' },
];

const TEAM = [
  { title: 'Equipo creativo OLFFY', bg: '#DEDDF2', text: 'Diseñamos e ilustramos cada producto con mucho cariño, cuidando cada detalle desde la idea hasta el papel.' },
  { title: 'Atención y pedidos', bg: '#FBD4C2', text: 'Coordinamos envíos, retiros en tienda y respondemos tus dudas para que tu experiencia sea siempre cálida.' },
];

const GALLERY_COLORS = ['#FFE9A8', '#DEDDF2', '#FBD4C2'];

const LOCATION_ITEMS: { icon: GiftIconName; title: string; text: string }[] = [
  { icon: 'pin', title: 'Viña del Mar', text: 'Nuestro taller y tienda están aquí' },
  { icon: 'store', title: 'Retiro en tienda', text: 'Coordina tu retiro sin costo' },
  { icon: 'package', title: 'Envíos a todo Chile', text: 'Llegamos a cada rincón del país' },
];

// Página "Nuestra historia" — 100% editorial y estática (sin estado propio).
// Reutiliza ProductImage como placeholder visual en banner/equipo/galería.
export function HistoriaPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>NUESTRA HISTORIA</div>
        <h1 className={styles.title}>Papelería ilustrada hecha con amor</h1>
        <p className={styles.text}>
          OLFFY nació de las ganas de convertir ilustraciones hechas a mano en cuadernos,
          planners y papelería que acompañen tu día a día. Creemos que organizar tu mundo
          puede ser un acto creativo — por eso cada producto está pensado para inspirar,
          regalar y guardar con cariño.
        </p>
      </div>

      <div className={styles.bannerFrame}>
        <div className={styles.bannerBox}>
          <ProductImage bg="#DEDDF2" shape="rect" aspectRatio="auto" />
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Proceso creativo</h2>
        <div className={styles.processGrid}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.title} className={styles.processCard} style={{ background: step.bg }}>
              <div className={styles.processIcon} style={{ background: step.iconBg }}>
                <GiftIcon name={step.icon} size={22} color="#fff" />
              </div>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processText}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>El equipo</h2>
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <div key={member.title} className={styles.teamCard}>
              <div className={styles.teamImage}>
                <ProductImage bg={member.bg} shape="rect" aspectRatio="auto" />
              </div>
              <div className={styles.teamInfo}>
                <div className={styles.teamTitle}>{member.title}</div>
                <div className={styles.teamText}>{member.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Galería</h2>
        <div className={styles.galleryGrid}>
          {GALLERY_COLORS.map((color, idx) => (
            <div key={idx} className={styles.galleryFrame}>
              <div className={styles.galleryBox}>
                <ProductImage bg={color} shape="rect" aspectRatio="1 / 1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.locationBlock}>
        {LOCATION_ITEMS.map((item) => (
          <div key={item.title} className={styles.locationItem}>
            <span className={styles.locationIcon}>
              <GiftIcon name={item.icon} size={24} color="var(--olffy-amarillo)" />
            </span>
            <div>
              <div className={styles.locationTitle}>{item.title}</div>
              <div className={styles.locationText}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
