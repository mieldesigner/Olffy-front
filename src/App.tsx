import { useState } from 'react';
import styles from './App.module.css';
import { AnnouncementBar, Navbar, MobileMenuDrawer, Footer } from './components/layout';
import type { PublicPage } from './components/layout';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/cart';
import { ProductModal } from './components/product';
import { HomePage } from './pages/HomePage';
import { TiendaPage } from './pages/TiendaPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { ContactoPage } from './pages/ContactoPage';
import { NovedadesPage } from './pages/NovedadesPage';
import type { Product } from './types';

const ANNOUNCEMENTS = [
  'Envíos a todo Chile',
  'Retiro gratis en tienda · Viña del Mar',
  'Cuadernos, planners, stickers y papelería ilustrada',
  'Hecho con amor, claro',
];

// Nombres legibles para el placeholder de páginas aún no migradas.
// 'checkout', 'contacto' y 'novedades' no aparecen acá porque ya tienen página real.
const PAGE_LABELS: Record<Exclude<PublicPage, 'checkout' | 'contacto' | 'novedades'>, string> = {
  home: 'Inicio',
  tienda: 'Tienda',
  regalos: 'Regalos',
  historia: 'Nuestra historia',
  puntos: 'OLFFY Puntos',
};

// Fase 6B — Novedades real (colecciones + countdown + productos nuevos) +
// Contacto (5B), Checkout (5A), Home (4A) y Tienda (4B) sobre el layout
// público, el carrito y ProductCard/ProductModal. Sin router todavía:
// currentPage es un simple useState.
function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<PublicPage>('home');
  const { cartCount, openCart } = useCart();

  const handleNavigate = (page: PublicPage) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.page}>
      <AnnouncementBar messages={ANNOUNCEMENTS} />
      <Navbar
        cartCount={cartCount}
        onOpenCart={openCart}
        onOpenMenu={() => setMenuOpen(true)}
        onNavigate={handleNavigate}
      />

      <main className={styles.main}>
        {currentPage === 'home' && (
          <HomePage onProductClick={setSelectedProduct} onNavigate={handleNavigate} />
        )}
        {currentPage === 'tienda' && <TiendaPage onProductClick={setSelectedProduct} />}
        {currentPage === 'checkout' && (
          <CheckoutPage onGoToTienda={() => handleNavigate('tienda')} onGoHome={() => handleNavigate('home')} />
        )}
        {currentPage === 'contacto' && <ContactoPage />}
        {currentPage === 'novedades' && (
          <NovedadesPage onProductClick={setSelectedProduct} onNavigate={handleNavigate} />
        )}
        {currentPage !== 'home' &&
          currentPage !== 'tienda' &&
          currentPage !== 'checkout' &&
          currentPage !== 'contacto' &&
          currentPage !== 'novedades' && (
          <div className={styles.placeholder}>
            <h1 className={styles.placeholderTitle}>{PAGE_LABELS[currentPage]}</h1>
            <p className={styles.placeholderText}>
              Esta página todavía no se ha migrado — llega en una fase posterior.
            </p>
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <MobileMenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={handleNavigate} />

      <CartDrawer
        onGoToCheckout={() => handleNavigate('checkout')}
        onGoToTienda={() => handleNavigate('tienda')}
      />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}

export default App;
