import { useState } from 'react';
import { AdminMetricCard, type AdminMetricCardData } from './AdminMetricCard';
import { AdminRewardCard, type AdminReward } from './AdminRewardCard';
import { AdminRewardFormMock } from './AdminRewardFormMock';
import { AdminRewardRequests } from './AdminRewardRequests';
import { ADMIN_DATA } from '../../data/adminData.mock';
import styles from './AdminRewards.module.css';

// Sección Recompensas del panel admin.
// AdminRewards MOCK: en producción debe operar con Supabase, permisos internos
// y auditoría. Nada aquí modifica datos (acciones y formulario son simulados).

const METRICS: AdminMetricCardData[] = [
  { label: 'Recompensas activas', value: 3, tone: 'morado' },
  { label: 'Canjes pendientes', value: ADMIN_DATA.canjesPendientes.length, tone: 'naranjo' },
  { label: 'Canjes aprobados', value: 2, tone: 'verde' },
  { label: 'Canjes usados', value: 8, tone: 'morado' },
  { label: 'Puntos promedio', value: 600, tone: 'amarillo' },
];

const REWARDS: AdminReward[] = [
  { id: 1, nombre: '$3.000 de descuento', puntos: 300, estado: 'Activa', descripcion: 'Descuento directo aplicable en tienda o web.' },
  { id: 2, nombre: '$5.000 de descuento', puntos: 500, estado: 'Activa', descripcion: 'Beneficio de nivel medio para compras más grandes.' },
  { id: 3, nombre: '$10.000 de descuento', puntos: 1000, estado: 'Activa', descripcion: 'La recompensa mayor del programa de puntos.' },
  { id: 4, nombre: 'Envío gratis', puntos: 800, estado: 'Pausada', descripcion: 'Despacho sin costo a todo Chile en el próximo pedido.' },
  { id: 5, nombre: 'Sticker pack exclusivo', puntos: 1000, estado: 'Pausada', descripcion: 'Set de stickers ilustrados solo para el club OLFFY.' },
];

const MOCK_MESSAGE = 'Acción disponible en próxima fase.';

// Orquesta la vista de Recompensas: header + métricas + (recompensas |
// formulario) + solicitudes de canje. Un aviso compartido responde a las
// acciones mock, que no modifican ningún dato.
export function AdminRewards() {
  const [notice, setNotice] = useState<string | null>(null);
  const showMockNotice = () => setNotice(MOCK_MESSAGE);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.eyebrow}>OLFFY ADMIN</div>
        <h1 className={styles.title}>Recompensas</h1>
        <p className={styles.subtitle}>
          Gestiona beneficios canjeables, revisa solicitudes pendientes y prepara nuevas
          recompensas para el programa de puntos.
        </p>
      </div>

      <div className={styles.metrics}>
        {METRICS.map((m) => (
          <AdminMetricCard key={m.label} metric={m} />
        ))}
      </div>

      {notice && (
        <div className={styles.notice}>
          <svg className={styles.noticeIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M12 8v5M12 16.5h.01" />
          </svg>
          <span className={styles.noticeText}>{notice}</span>
          <button type="button" className={styles.noticeClose} onClick={() => setNotice(null)} aria-label="Cerrar aviso">
            ✕
          </button>
        </div>
      )}

      <div className={styles.columns}>
        <div className={styles.rewardsPanel}>
          <h2 className={styles.panelTitle}>Recompensas disponibles</h2>
          <div className={styles.rewardsGrid}>
            {REWARDS.map((reward) => (
              <AdminRewardCard key={reward.id} reward={reward} onMockAction={showMockNotice} />
            ))}
          </div>
        </div>

        <AdminRewardFormMock />
      </div>

      <AdminRewardRequests requests={ADMIN_DATA.canjesPendientes} onMockAction={showMockNotice} />
    </div>
  );
}
