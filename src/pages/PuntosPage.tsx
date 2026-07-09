import { useState } from 'react';
import {
  PuntosHero,
  PuntosTabs,
  PointsSpotlight,
  PointsSummaryCard,
  NumberBadge,
  TransactionsPanel,
  RewardsPanel,
  RedemptionsPanel,
} from '../components/puntos';
import type {
  PuntosTab,
  PointsSummary,
  Transaction,
  RewardTier,
  Redemption,
} from '../components/puntos';
import styles from './PuntosPage.module.css';

// ── Datos mock del cliente (sin backend). Coherentes entre sí:
// saldo 420 = acumulados 720 − usados 300; próxima recompensa 500 → faltan 80.
const CLIENTE = { nombre: 'Valentina', email: 'valentina@olffy.cl' };

const SUMMARY: PointsSummary = {
  saldo: 420,
  acumulados: 720,
  usados: 300,
  nextRewardPoints: 500,
  nextRewardLabel: '$5.000 off',
  tiers: [
    { puntos: 300, label: '$3.000 off' },
    { puntos: 500, label: '$5.000 off' },
    { puntos: 1000, label: '$10.000 off' },
  ],
};

const TRANSACTIONS: Transaction[] = [
  { id: 1, tipo: 'Compra tienda física TUU', fecha: '28 jun 2026', descripcion: 'Boleta #TUU-1042', puntos: 100, estado: 'Aprobado' },
  { id: 2, tipo: 'Compra online', fecha: '20 jun 2026', descripcion: 'Pedido #1234', puntos: 80, estado: 'Aprobado' },
  { id: 3, tipo: 'Canje recompensa', fecha: '12 jun 2026', descripcion: '$3.000 off', puntos: -300, estado: 'Usado' },
  { id: 4, tipo: 'Bono de bienvenida', fecha: '05 jun 2026', descripcion: 'Ajuste inicial', puntos: 200, estado: 'Aprobado' },
  { id: 5, tipo: 'Reversa por devolución', fecha: '01 jun 2026', descripcion: 'Devolución pedido #1188', puntos: -40, estado: 'Aprobado' },
];

const REWARDS: RewardTier[] = [
  { id: 1, puntos: 300, label: '$3.000 de descuento', desc: 'Aplícalo en tu próxima compra online o en tienda.' },
  { id: 2, puntos: 500, label: '$5.000 de descuento', desc: 'Un empujón para llevarte ese kit que tienes en la mira.' },
  { id: 3, puntos: 1000, label: '$10.000 de descuento', desc: 'La recompensa grande para tu pedido más especial.' },
];

const REDEMPTIONS: Redemption[] = [
  { id: 1, recompensa: '$3.000 de descuento', fecha: '30 jun 2026', estado: 'Solicitado' },
  { id: 2, recompensa: '$3.000 de descuento', fecha: '28 jun 2026', estado: 'Aprobado', codigo: 'OLFFY-3K-1207' },
  { id: 3, recompensa: '$3.000 de descuento', fecha: '12 jun 2026', estado: 'Usado', codigo: 'OLFFY-3K-8842' },
  { id: 4, recompensa: 'Envío gratis', fecha: '10 may 2026', estado: 'Cancelado' },
];

const RULES = [
  '$1.000 gastados equivalen a 10 puntos.',
  'Los puntos se calculan sobre el total efectivamente pagado.',
  'Si usas un descuento, acumulas puntos sobre el monto restante.',
  'Los canjes descuentan puntos de tu saldo disponible.',
  'Las devoluciones reversan los puntos acumulados en esa compra.',
  'Los puntos y cupones tienen vigencia según la regla vigente de la tienda.',
];

const HELP_STEPS = [
  { title: 'Compra', text: 'Cada compra en tienda o web suma puntos automáticamente.' },
  { title: 'Acumula', text: 'Tu saldo crece y avanzas hacia la siguiente recompensa.' },
  { title: 'Canjea', text: 'Solicita tu recompensa y úsala en tu próximo pedido.' },
];

// OLFFY Puntos (cliente) — landing con login mock y, tras entrar (demo),
// dashboard de fidelización con tabs. Todo mock: no ajusta puntos ni aprueba
// canjes (eso es del admin). Sin backend, magic link ni auth real.
export function PuntosPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<PuntosTab>('resumen');

  if (!loggedIn) {
    return (
      <div className={styles.wrap}>
        <PuntosHero onEnterDemo={() => setLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.greeting}>
        <div>
          <div className={styles.greetingEyebrow}>OLFFY PUNTOS</div>
          <h1 className={styles.greetingTitle}>Hola, {CLIENTE.nombre}</h1>
          <p className={styles.greetingEmail}>{CLIENTE.email}</p>
        </div>
        <div className={styles.greetingRight}>
          <button type="button" className={styles.logoutLink} onClick={() => setLoggedIn(false)}>
            Salir
          </button>
        </div>
      </div>

      <PuntosTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Banner de saldo persistente: visible en todas las tabs. */}
      <PointsSpotlight
        saldo={SUMMARY.saldo}
        nextRewardPoints={SUMMARY.nextRewardPoints}
        nextRewardLabel={SUMMARY.nextRewardLabel}
      />

      {activeTab === 'resumen' && (
        <div className={styles.tabContent}>
          <PointsSummaryCard summary={SUMMARY} />

          <div className={styles.resumenGrid}>
            <div className={styles.panelBlock}>
              <h2 className={styles.blockTitle}>Últimos movimientos</h2>
              <TransactionsPanel transactions={TRANSACTIONS} limit={3} />
            </div>

            <div className={styles.helpCard}>
              <h2 className={styles.blockTitle}>Cómo funciona</h2>
              <ul className={styles.helpList}>
                {HELP_STEPS.map((step, idx) => (
                  <li key={step.title} className={styles.helpItem}>
                    <NumberBadge n={idx + 1} size={38} />
                    <div>
                      <div className={styles.helpItemTitle}>{step.title}</div>
                      <div className={styles.helpItemText}>{step.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'historial' && (
        <div className={styles.tabContent}>
          <h2 className={styles.blockTitle}>Historial de movimientos</h2>
          <TransactionsPanel transactions={TRANSACTIONS} />
        </div>
      )}

      {activeTab === 'recompensas' && (
        <div className={styles.tabContent}>
          <h2 className={styles.blockTitle}>Recompensas disponibles</h2>
          <RewardsPanel rewards={REWARDS} saldo={SUMMARY.saldo} />
        </div>
      )}

      {activeTab === 'canjes' && (
        <div className={styles.tabContent}>
          <h2 className={styles.blockTitle}>Mis canjes</h2>
          <RedemptionsPanel redemptions={REDEMPTIONS} />
        </div>
      )}

      {activeTab === 'reglas' && (
        <div className={styles.tabContent}>
          <h2 className={styles.blockTitle}>Reglas del programa</h2>
          <ul className={styles.rulesList}>
            {RULES.map((rule, idx) => (
              <li key={rule} className={styles.ruleItem}>
                <NumberBadge n={idx + 1} size={40} />
                <span className={styles.ruleText}>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
