import { useState } from 'react';
import { ContactForm } from '../components/storefront';
import { Accordion } from '../components/ui';
import { FAQ } from '../data/faq.mock';
import styles from './ContactoPage.module.css';

const INFO_CARDS = [
  { icon: '📍', bg: 'var(--olffy-crema)', iconBg: 'var(--olffy-amarillo)', title: 'Ubicación', text: 'Viña del Mar, Chile' },
  { icon: '🕐', bg: 'var(--olffy-morado-suave)', iconBg: 'var(--olffy-morado)', title: 'Horario', text: 'Lun a Vie, 10:00–19:00' },
  { icon: '📸', bg: 'var(--olffy-naranjo-suave)', iconBg: 'var(--olffy-naranjo)', title: 'Redes', text: '@olffy en Instagram' },
  { icon: '✉️', bg: 'var(--olffy-amarillo-suave)', iconBg: '#c8901a', title: 'Email', text: 'hola@olffy.cl' },
];

const FAQ_ITEMS = FAQ.map((item) => ({ id: item.id, question: item.q, answer: item.a }));

// Página de Contacto — formulario mock (ContactForm) + info de contacto
// estática + FAQ accordion (reutiliza el Accordion base y faq.mock.ts).
export function ContactoPage() {
  const [cfName, setCfName] = useState('');
  const [cfEmail, setCfEmail] = useState('');
  const [cfMsg, setCfMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleSubmit = () => {
    setContactSent(true);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>CONTACTO</div>
        <h1 className={styles.title}>Hablemos</h1>
        <p className={styles.subtitle}>
          ¿Tienes dudas sobre tu pedido, un producto o quieres coordinar algo especial?
          Escríbenos, te respondemos con cariño.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <ContactForm
            name={cfName}
            email={cfEmail}
            message={cfMsg}
            onChangeName={setCfName}
            onChangeEmail={setCfEmail}
            onChangeMessage={setCfMsg}
            sent={contactSent}
            onSubmit={handleSubmit}
          />
        </div>

        <div className={styles.infoCol}>
          {INFO_CARDS.map((info) => (
            <div key={info.title} className={styles.infoCard} style={{ background: info.bg }}>
              <div className={styles.infoIcon} style={{ background: info.iconBg }}>
                {info.icon}
              </div>
              <div>
                <div className={styles.infoTitle}>{info.title}</div>
                <div className={styles.infoText}>{info.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Preguntas frecuentes</h2>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </div>
  );
}
