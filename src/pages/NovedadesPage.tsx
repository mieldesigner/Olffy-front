import { CollectionCard, CountdownTimer } from '../components/storefront';
import { ProductGrid } from '../components/product';
import type { PublicPage } from '../components/layout';
import { PRODUCTS } from '../data/products.mock';
import type { Product } from '../types';
import styles from './NovedadesPage.module.css';

interface NovedadesPageProps {
  onProductClick: (product: Product) => void;
  onNavigate: (page: PublicPage) => void;
}

const COLLECTIONS = [
  { title: 'Colección Primavera', description: '12 productos nuevos', bg: '#FFE9A8' },
  { title: 'Edición Violeta', description: '8 productos nuevos', bg: '#DEDDF2' },
  { title: 'Kits Regalo 2026', description: '5 nuevos kits', bg: '#FBD4C2' },
];

// Countdown mock hacia un "próximo lanzamiento" — 7 días desde que se carga
// la página (constante de módulo, no se recalcula en cada render).
const LAUNCH_TARGET = Date.now() + 7 * 24 * 60 * 60 * 1000;

const NEW_PRODUCTS = PRODUCTS.filter((p) => p.tag === 'Nuevo');

// Página de Novedades — colecciones destacadas, countdown de lanzamiento y
// grid de productos nuevos (tag 'Nuevo'), reutilizando ProductGrid/
// ProductModal ya construidos.
export function NovedadesPage({ onProductClick, onNavigate }: NovedadesPageProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>NOVEDADES</div>
        <h1 className={styles.title}>Nuevas colecciones y productos recién llegados</h1>
        <p className={styles.subtitle}>
          Descubre lo último de OLFFY: colecciones limitadas, kits de regalo y los productos
          que acaban de llegar a la tienda.
        </p>
      </div>

      <div className={styles.collectionsGrid}>
        {COLLECTIONS.map((collection) => (
          <CollectionCard
            key={collection.title}
            title={collection.title}
            description={collection.description}
            bg={collection.bg}
            onClick={() => onNavigate('tienda')}
          />
        ))}
      </div>

      <div className={styles.countdownSection}>
        <CountdownTimer eyebrow="PRÓXIMO LANZAMIENTO" title="Nueva colección en camino ✨" targetDate={LAUNCH_TARGET} />
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Nuevos en tienda</h2>
        </div>
        <ProductGrid products={NEW_PRODUCTS} onProductClick={onProductClick} />
      </section>
    </div>
  );
}
