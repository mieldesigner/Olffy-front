import { useState } from 'react';
import { GiftIcon } from '../storefront';
import styles from './RewardsPanel.module.css';

export interface RewardTier {
  id: number;
  puntos: number;
  label: string;
  desc: string;
}

interface RewardsPanelProps {
  rewards: RewardTier[];
  saldo: number;
}

// Recompensas disponibles (mock). Botón "Solicitar canje" si el saldo alcanza,
// o "Te faltan X pts" si no. El canje es puramente visual: marca la card como
// solicitada localmente, sin backend ni descuento de saldo real.
export function RewardsPanel({ rewards, saldo }: RewardsPanelProps) {
  const [requested, setRequested] = useState<Set<number>>(new Set());

  const handleRequest = (id: number) => {
    setRequested((prev) => new Set(prev).add(id));
  };

  return (
    <div className={styles.grid}>
      {rewards.map((reward) => {
        const available = saldo >= reward.puntos;
        const isRequested = requested.has(reward.id);
        return (
          <div key={reward.id} className={`${styles.card} ${available ? '' : styles.cardLocked}`}>
            <span className={styles.iconBox}>
              <GiftIcon name="tag" size={22} />
            </span>
            <div className={styles.pts}>{reward.puntos} pts</div>
            <div className={styles.label}>{reward.label}</div>
            <div className={styles.desc}>{reward.desc}</div>
            <div className={styles.action}>
              {isRequested ? (
                <div className={styles.requested}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12.5l5 5 11-11" />
                  </svg>
                  Solicitud de canje registrada.
                </div>
              ) : available ? (
                <button type="button" className={styles.requestBtn} onClick={() => handleRequest(reward.id)}>
                  Solicitar canje
                </button>
              ) : (
                <button type="button" className={styles.lockedBtn} disabled>
                  Te faltan {reward.puntos - saldo} pts
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
