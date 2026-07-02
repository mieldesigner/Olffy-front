import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextValue {
  cartItems: CartItem[];
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  incrementQty: (productId: number) => void;
  decrementQty: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  formattedCartSubtotal: string;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function formatClp(n: number): string {
  return '$' + n.toLocaleString('es-CL');
}

// Estado global de carrito — mock, sin persistencia ni backend.
// Reemplaza al `cart`/`cartOpen`/`addToCart`/etc. del state monolítico original.
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addToCart = useCallback((product: Product, qty: number = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const incrementQty = useCallback((productId: number) => {
    setCartItems((prev) => prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + 1 } : i)));
  }, []);

  const decrementQty = useCallback((productId: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, qty: Math.max(1, i.qty - 1) } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartCount = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);
  const cartSubtotal = useMemo(() => cartItems.reduce((s, i) => s + i.n * i.qty, 0), [cartItems]);
  const formattedCartSubtotal = useMemo(() => formatClp(cartSubtotal), [cartSubtotal]);

  const value: CartContextValue = {
    cartItems,
    cartOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    clearCart,
    cartCount,
    cartSubtotal,
    formattedCartSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
