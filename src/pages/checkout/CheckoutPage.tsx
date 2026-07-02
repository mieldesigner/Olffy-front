import { useState } from 'react';
import {
  CheckoutStepper,
  CheckoutReview,
  CheckoutShipping,
  CheckoutPayment,
  CheckoutSuccess,
} from '../../components/checkout';
import type { CheckoutStep, ShippingForm, PaymentMethod } from '../../components/checkout';
import { useCart } from '../../context/CartContext';
import styles from './CheckoutPage.module.css';

interface CheckoutPageProps {
  onGoToTienda: () => void;
  onGoHome: () => void;
}

const VALID_PROMO_CODES = ['OLFFY10', 'PAPELERIA', 'BIENVENIDA'];

const EMPTY_SHIPPING_FORM: ShippingForm = {
  nombre: '',
  apellido: '',
  email: '',
  direccion: '',
  region: '',
  comuna: '',
};

const STEP_TITLES: Record<Exclude<CheckoutStep, 'success'>, string> = {
  review: 'Revisa tu pedido',
  shipping: 'Datos de envío',
  payment: 'Método de pago',
};

function formatClp(n: number): string {
  return '$' + n.toLocaleString('es-CL');
}

interface OrderSnapshot {
  orderNumber: string;
  itemCount: number;
  formattedTotal: string;
}

// Checkout mock de 4 pasos (review → shipping → payment → success). Sin
// pasarela real ni backend — solo valida el flujo completo de compra sobre
// el CartContext ya construido.
export function CheckoutPage({ onGoToTienda, onGoHome }: CheckoutPageProps) {
  const { cartCount, cartSubtotal, clearCart } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('review');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [shippingForm, setShippingForm] = useState<ShippingForm>(EMPTY_SHIPPING_FORM);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('webpay');
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);

  const handleApplyPromo = () => {
    const isValid = VALID_PROMO_CODES.includes(promoInput.trim().toUpperCase());
    setPromoApplied(isValid);
    setPromoError(!isValid);
  };

  const handleShippingChange = (field: keyof ShippingForm, value: string) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
  };

  const finalTotal = promoApplied ? Math.round(cartSubtotal * 0.9) : cartSubtotal;

  const handleFinish = () => {
    // Snapshot del pedido antes de vaciar el carrito — Success ya no puede
    // leer cartItems/cartSubtotal porque clearCart() los deja en 0.
    setOrderSnapshot({
      orderNumber: `#OLFFY-${Math.floor(1000 + Math.random() * 9000)}`,
      itemCount: cartCount,
      formattedTotal: formatClp(finalTotal),
    });
    clearCart();
    setCheckoutStep('success');
  };

  const handleGoHome = () => {
    setCheckoutStep('review');
    setPromoInput('');
    setPromoApplied(false);
    setPromoError(false);
    setShippingForm(EMPTY_SHIPPING_FORM);
    setPaymentMethod('webpay');
    setOrderSnapshot(null);
    onGoHome();
  };

  if (checkoutStep === 'success' && orderSnapshot) {
    return (
      <div className={styles.wrap}>
        <CheckoutSuccess
          orderNumber={orderSnapshot.orderNumber}
          itemCount={orderSnapshot.itemCount}
          formattedTotal={orderSnapshot.formattedTotal}
          onGoHome={handleGoHome}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.backLink} onClick={onGoToTienda}>
        ← Volver a la tienda
      </button>

      <CheckoutStepper currentStep={checkoutStep} />

      <h1 className={styles.title}>{STEP_TITLES[checkoutStep as Exclude<CheckoutStep, 'success'>]}</h1>

      {checkoutStep === 'review' && (
        <CheckoutReview
          promoInput={promoInput}
          onPromoInputChange={setPromoInput}
          promoApplied={promoApplied}
          promoError={promoError}
          onApplyPromo={handleApplyPromo}
          onContinue={() => setCheckoutStep('shipping')}
          onGoToTienda={onGoToTienda}
        />
      )}

      {checkoutStep === 'shipping' && (
        <CheckoutShipping
          form={shippingForm}
          onChange={handleShippingChange}
          onContinue={() => setCheckoutStep('payment')}
          onBack={() => setCheckoutStep('review')}
        />
      )}

      {checkoutStep === 'payment' && (
        <CheckoutPayment
          paymentMethod={paymentMethod}
          onChangeMethod={setPaymentMethod}
          formattedTotal={formatClp(finalTotal)}
          onFinish={handleFinish}
          onBack={() => setCheckoutStep('shipping')}
        />
      )}
    </div>
  );
}
