import { GiftIcon } from '../storefront';
import styles from './RedemptionsPanel.module.css';

export type RedemptionStatus = 'Solicitado' | 'Aprobado' | 'Usado' | 'Cancelado';

export interface Redemption {
  id: number;
  recompensa: string;
  fecha: string;
  estado: RedemptionStatus;
  codigo?: string;
}

interface RedemptionsPanelProps {
  redemptions: Redemption[];
}

const STATUS_CLASS: Record<RedemptionStatus, string> = {
  Solicitado: styles.solicitado,
  Aprobado: styles.aprobado,
  Usado: styles.usado,
  Cancelado: styles.cancelado,
};

// Canjes del cliente (solo lectura, mock). El código aparece cuando el canje
// está aprobado o usado. Sin acciones de aprobar/rechazar — eso es del admin.
export function RedemptionsPanel({ redemptions }: RedemptionsPanelProps) {
  if (redemptions.length === 0) {
    return <div className={styles.empty}>Todavía no tienes canjes registrados.</div>;
  }

  return (
    <div className={styles.list}>
      {redemptions.map((r) => (
        <div key={r.id} className={styles.item}>
          <span className={styles.iconBox}>
            <GiftIcon name="gift" size={20} />
          </span>
          <div className={styles.info}>
            <div className={styles.reward}>{r.recompensa}</div>
            <div className={styles.fecha}>{r.fecha}</div>
            {r.codigo && <div className={styles.codigo}>Código: {r.codigo}</div>}
          </div>
          <span className={`${styles.status} ${STATUS_CLASS[r.estado]}`}>{r.estado}</span>
        </div>
      ))}
    </div>
  );
}
