import { useMemo, useState } from 'react';
import { AdminSearchInput } from './AdminSearchInput';
import { PRODUCTS } from '../../data/products.mock';
import type { Product } from '../../types';
import styles from './AdminPosProductSearch.module.css';

interface AdminPosProductSearchProps {
  onAdd: (product: Product) => void;
}

// Stock mock. En producción viene desde Shopify.
function mockStock(id: number): number {
  return ((id * 7) % 30) + 1;
}

// Buscador de productos del POS. Lee PRODUCTS (solo lectura) y filtra por
// nombre, categoría o precio. No descuenta stock ni modifica PRODUCTS.
export function AdminPosProductSearch({ onAdd }: AdminPosProductSearchProps) {
  const [term, setTerm] = useState('');

  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        p.price.toLowerCase().includes(q),
    );
  }, [term]);

  return (
    <div className={styles.panel}>
      <div className={styles.titleRow}>
        <span className={styles.stepBadge}>3</span>
        <h2 className={styles.title}>Buscar productos</h2>
      </div>
      <AdminSearchInput value={term} onChange={setTerm} placeholder="Buscar por nombre, categoría o precio..." />

      {term.trim() === '' ? (
        <div className={styles.hint}>Escribe para buscar un producto y agregarlo a la venta.</div>
      ) : results.length === 0 ? (
        <div className={styles.hint}>No encontramos productos con ese término.</div>
      ) : (
        <div className={styles.results}>
          {results.map((p) => {
            const stock = mockStock(p.id);
            const low = stock <= 5;
            return (
              <div key={p.id} className={styles.row}>
                <div className={styles.info}>
                  <div className={styles.name}>{p.name}</div>
                  <div className={styles.cat}>
                    {p.cat}
                    {low ? (
                      <span className={styles.lowStock}>Stock bajo</span>
                    ) : (
                      <span className={styles.stock}>· {stock} en stock</span>
                    )}
                  </div>
                </div>
                <span className={styles.precio}>{p.price}</span>
                <button type="button" className={styles.addBtn} onClick={() => onAdd(p)}>
                  Agregar
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
