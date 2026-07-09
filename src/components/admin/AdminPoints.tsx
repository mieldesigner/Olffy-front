import { AdminPointsSummary } from './AdminPointsSummary';
import { AdminPointsMovements, type PointMovement } from './AdminPointsMovements';
import { AdminPointsAdjustmentMock } from './AdminPointsAdjustmentMock';
import { AdminPointsRules } from './AdminPointsRules';
import type { AdminMetricCardData } from './AdminMetricCard';
import { ADMIN_DATA } from '../../data/adminData.mock';
import styles from './AdminPoints.module.css';

// Sección Puntos del panel admin.
// AdminPoints MOCK: en producción debe operar con transacciones auditables en
// Supabase y permisos internos. Nada aquí modifica datos (solo UI/estado local).

const METRICS: AdminMetricCardData[] = [
  { label: 'Puntos en circulación', value: '48.620', tone: 'morado' },
  { label: 'Clientes con puntos', value: ADMIN_DATA.clientes.length, tone: 'morado' },
  { label: 'Canjes pendientes', value: ADMIN_DATA.canjesPendientes.length, tone: 'naranjo' },
  { label: 'Recompensas activas', value: 3, tone: 'amarillo' },
  { label: 'Ajustes del mes', value: 2, tone: 'verde' },
  { label: 'Reversas del mes', value: 1, tone: 'naranjo' },
];

const MOVEMENTS: PointMovement[] = [
  { id: 1, tipo: 'Compra online', cliente: 'Valentina García', fecha: '28 jun 2026', puntos: 80, origen: 'Shopify', estado: 'Aprobado' },
  { id: 2, tipo: 'Compra tienda física TUU', cliente: 'Camila Torres', fecha: '27 jun 2026', puntos: 100, origen: 'TUU', estado: 'Aprobado' },
  { id: 3, tipo: 'Canje recompensa', cliente: 'Milenka Burgos', fecha: '27 jun 2026', puntos: -300, origen: 'Canje', estado: 'Pendiente' },
  { id: 4, tipo: 'Ajuste manual', cliente: 'Milenka Burgos', fecha: '25 jun 2026', puntos: 2000, origen: 'Admin', estado: 'Aprobado' },
  { id: 5, tipo: 'Reversa devolución', cliente: 'Valentina García', fecha: '22 jun 2026', puntos: -40, origen: 'Admin', estado: 'Reversado' },
];

const CLIENTES = ADMIN_DATA.clientes.map((c) => c.nombre);

// Orquesta la vista de Puntos: header + métricas + (movimientos | ajuste) + reglas.
export function AdminPoints() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.eyebrow}>OLFFY ADMIN</div>
        <h1 className={styles.title}>Sistema de puntos</h1>
        <p className={styles.subtitle}>
          Revisa puntos en circulación, movimientos recientes, reglas del programa y acciones
          pendientes de fidelización.
        </p>
      </div>

      <AdminPointsSummary metrics={METRICS} />

      <div className={styles.columns}>
        <AdminPointsMovements movements={MOVEMENTS} />
        <AdminPointsAdjustmentMock clientes={CLIENTES} />
      </div>

      <AdminPointsRules />
    </div>
  );
}
