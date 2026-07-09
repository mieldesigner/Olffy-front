import { Button, EmptyState, IconPlaceholder } from '../ui';
import { CartLineItem } from '../cart';
import { useCart } from '../../context/CartContext';
import styles from './CheckoutReview.module.css';

interface CheckoutReviewProps {
  promoInput: string;
  onPromoInputChange: (value: string) => void;
  promoApplied: boolean;
  promoError: boolean;
  onApplyPromo: () => void;
  onContinue: () => void;
  onGoToTienda: () => void;
}

function formatClp(n: number): string {
  return '$' + n.toLocaleString('es-CL');
}

// Paso 1 del checkout — resumen del carrito (reutiliza CartLineItem), código
// promo mock (10% off con OLFFY10 / PAPELERIA / BIENVENIDA) y total final.
export function CheckoutReview({
  promoInput,
  onPromoInputChange,
  promoApplied,
  promoError,
  onApplyPromo,
  onContinue,
  onGoToTienda,
}: CheckoutReviewProps) {
  const { cartItems, incrementQty, decrementQty, removeFromCart, cartSubtotal, formattedCartSubtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <EmptyState
        icon={<IconPlaceholder size={64} color="var(--olffy-amarillo)" />}
        title="Tu carrito está vacío"
        description="Agrega productos antes de continuar con el checkout."
        action={
          <Button variant="primary" size="sm" onClick={onGoToTienda}>
            Ir a la tienda
          </Button>
        }
      />
    );
  }

  const discount = promoApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const total = cartSubtotal - discount;

  return (
    <div>
      <div className={styles.list}>
        {cartItems.map((item) => (
          <CartLineItem
            key={item.id}
            item={item}
            onIncrement={incrementQty}
            onDecrement={decrementQty}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className={styles.promoRow}>
        <input
          className={styles.promoInput}
          type="text"
          value={promoInput}
          onChange={(e) => onPromoInputChange(e.target.value)}
          placeholder="Código de descuento"
        />
        <Button variant="outline" onClick={onApplyPromo}>
          Aplicar
        </Button>
      </div>
      {promoApplied && <div className={styles.promoApplied}>Código aplicado — 10% off</div>}
      {promoError && !promoApplied && <div className={styles.promoError}>Código no válido</div>}

      <div className={styles.totals}>
        <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span>{formattedCartSubtotal}</span>
        </div>
        {promoApplied && (
          <div className={`${styles.totalRow} ${styles.discountRow}`}>
            <span>Descuento (10%)</span>
            <span>−{formatClp(discount)}</span>
          </div>
        )}
        <div className={styles.grandTotalRow}>
          <span className={styles.grandTotalLabel}>Total</span>
          <span className={styles.grandTotalValue}>{formatClp(total)}</span>
        </div>
      </div>

      <Button variant="primary" className={styles.continueBtn} onClick={onContinue}>
        Continuar con el envío →
      </Button>
    </div>
  );
}
