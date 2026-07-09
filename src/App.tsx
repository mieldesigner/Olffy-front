import { useState } from 'react';
import styles from './App.module.css';
import { AnnouncementBar, Navbar, MobileMenuDrawer, Footer } from './components/layout';
import type { PublicPage, AppPage } from './components/layout';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/cart';
import { ProductModal } from './components/product';
import { HomePage } from './pages/HomePage';
import { TiendaPage } from './pages/TiendaPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { ContactoPage } from './pages/ContactoPage';
import { NovedadesPage } from './pages/NovedadesPage';
import { HistoriaPage } from './pages/HistoriaPage';
import { RegalosPage } from './pages/RegalosPage';
import { PuntosPage } from './pages/PuntosPage';
import { AdminPage } from './pages/admin/AdminPage';
import type { Product } from './types';

const ANNOUNCEMENTS = [
  'Envíos a todo Chile',
  'Retiro gratis en tienda · Viña del Mar',
  'Cuadernos, planners, stickers y papelería ilustrada',
  'Hecho con amor, claro',
];

// Fase 8A — Admin interno mock. currentPage es AppPage (público + 'admin').
// El admin tiene su propio layout (sin el chrome del storefront) y se accede
// por el trigger oculto del footer, no por el navbar público.
function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const { cartCount, openCart } = useCart();

  const handleNavigate = (page: PublicPage) => {
    setCurrentPage(page);
  };

  // Admin: vista separada, sin AnnouncementBar/Navbar/Footer del storefront.
  if (currentPage === 'admin') {
    return <AdminPage onExit={() => setCurrentPage('home')} />;
  }

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
        {currentPage === 'historia' && <HistoriaPage />}
        {currentPage === 'regalos' && <RegalosPage onProductClick={setSelectedProduct} />}
        {currentPage === 'puntos' && <PuntosPage />}
      </main>

      <Footer onNavigate={handleNavigate} onEnterAdmin={() => setCurrentPage('admin')} />

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
