import { Button } from '../ui';
import { GiftIcon, type GiftIconName } from '../storefront';
import styles from './CheckoutPayment.module.css';

export type PaymentMethod = 'webpay' | 'transfer' | 'pickup';

interface CheckoutPaymentProps {
  paymentMethod: PaymentMethod;
  onChangeMethod: (method: PaymentMethod) => void;
  formattedTotal: string;
  onFinish: () => void;
  onBack: () => void;
}

const METHODS: { value: PaymentMethod; icon: GiftIconName; title: string; desc: string }[] = [
  { value: 'webpay', icon: 'card', title: 'Webpay', desc: 'Tarjeta de crédito o débito (mock)' },
  { value: 'transfer', icon: 'bank', title: 'Transferencia', desc: 'Transferencia bancaria directa (mock)' },
  { value: 'pickup', icon: 'store', title: 'Pago / retiro en tienda', desc: 'Paga al retirar en Viña del Mar' },
];

// Paso 3 del checkout — método de pago mock (sin pasarela real) + resumen
// de total y confirmación final.
export function CheckoutPayment({ paymentMethod, onChangeMethod, formattedTotal, onFinish, onBack }: CheckoutPaymentProps) {
  return (
    <div>
      <div className={styles.methods}>
        {METHODS.map((method) => {
          const isActive = method.value === paymentMethod;
          return (
            <button
              key={method.value}
              type="button"
              className={`${styles.method} ${isActive ? styles.methodActive : ''}`}
              onClick={() => onChangeMethod(method.value)}
            >
              <span className={`${styles.radio} ${isActive ? styles.radioActive : ''}`} />
              <span className={styles.methodIcon}>
                <GiftIcon name={method.icon} size={20} color="var(--olffy-morado)" />
              </span>
              <span className={styles.methodInfo}>
                <span className={styles.methodTitle}>{method.title}</span>
                <span className={styles.methodDesc}>{method.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Total a pagar</span>
        <span className={styles.summaryValue}>{formattedTotal}</span>
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onBack}>
          ← Volver al envío
        </Button>
        <Button variant="primary" className={styles.finishBtn} onClick={onFinish}>
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}
