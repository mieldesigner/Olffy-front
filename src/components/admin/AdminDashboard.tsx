import { useState } from 'react';
import { AdminMetricCard, type AdminMetricCardData } from './AdminMetricCard';
import { AdminActivityList, type AdminActivityItem } from './AdminActivityList';
import { AdminOperationalStatusFloating } from './AdminOperationalStatusFloating';
import { AdminAbandonedCarts } from './AdminAbandonedCarts';
import { AdminRecentCustomers } from './AdminRecentCustomers';
import { AdminSalesDayDetail } from './AdminSalesDayDetail';
import { AdminActiveCustomersDetail } from './AdminActiveCustomersDetail';
import type { AdminNavigate } from './adminNav';
import { ADMIN_DATA } from '../../data/adminData.mock';
import styles from './AdminDashboard.module.css';

interface AdminDashboardProps {
  onNavigate: AdminNavigate;
}

// Métricas del dashboard (mock). Algunas cuentas se derivan de ADMIN_DATA
// para que rimen con el resto del panel; el resto son valores mock estáticos.
const METRICS: AdminMetricCardData[] = [
  { label: 'Ventas del día', value: '$384.780', secondary: '18 ventas hoy', tone: 'morado' },
  { label: 'Clientes activos', value: ADMIN_DATA.clientes.length, footnote: 'registrados', tone: 'morado' },
  { label: 'Puntos entregados', value: '48.620', footnote: 'en circulación', tone: 'amarillo' },
  { label: 'Canjes pendientes', value: ADMIN_DATA.canjesPendientes.length, footnote: 'por revisar', tone: 'naranjo' },
  { label: 'Productos activos', value: 20, footnote: 'publicados', tone: 'verde' },
  { label: 'Stock bajo', value: 3, footnote: 'requieren reposición', tone: 'naranjo' },
];

const ACTIVITY: AdminActivityItem[] = [
  { id: 1, tipo: 'Venta física registrada', texto: 'Boleta TUU #1042 · $12.990', tiempo: 'hace 5 min', tone: 'venta' },
  { id: 2, tipo: 'Puntos sumados', texto: 'Valentina García · +80 pts', tiempo: 'hace 22 min', tone: 'puntos' },
  { id: 3, tipo: 'Canje solicitado', texto: 'Milenka Burgos · $3.000 de descuento', tiempo: 'hace 1 h', tone: 'canje' },
  { id: 4, tipo: 'Producto actualizado', texto: 'Cuaderno Ilustrado A5 · stock 18', tiempo: 'hace 2 h', tone: 'producto', refId: 1 },
];

type DashView = 'main' | 'ventas-dia' | 'clientes-activos';

// Dashboard del panel admin — KPIs accionables, actividad, abandono de carrito
// y clientes recientes. Todo mock (sin backend).
export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [view, setView] = useState<DashView>('main');

  // Acción por métrica: subvista interna o navegación a otra sección con contexto.
  const metricAction = (label: string): (() => void) | undefined => {
    switch (label) {
      case 'Ventas del día':
        return () => setView('ventas-dia');
      case 'Clientes activos':
        return () => setView('clientes-activos');
      case 'Puntos entregados':
        return () => onNavigate('puntos', { pointsView: 'historial' });
      case 'Canjes pendientes':
        return () => onNavigate('recompensas', { rewardsFilter: 'pendientes' });
      case 'Productos activos':
        return () => onNavigate('productos', { productFilter: 'active' });
      case 'Stock bajo':
        return () => onNavigate('productos', { productFilter: 'lowStock' });
      default:
        return undefined;
    }
  };

  const handleActivity = (item: AdminActivityItem) => {
    switch (item.tone) {
      case 'venta':
        onNavigate('ventas');
        break;
      case 'puntos':
        onNavigate('puntos', { pointsView: 'historial' });
        break;
      case 'canje':
        onNavigate('recompensas', { rewardsFilter: 'pendientes' });
        break;
      case 'producto':
        onNavigate('productos', item.refId ? { productId: item.refId } : { productFilter: 'active' });
        break;
    }
  };

  if (view === 'ventas-dia') {
    return <AdminSalesDayDetail onBack={() => setView('main')} />;
  }
  if (view === 'clientes-activos') {
    return <AdminActiveCustomersDetail onBack={() => setView('main')} />;
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.eyebrow}>OLFFY ADMIN</div>
        <h1 className={styles.title}>Resumen operativo</h1>
      </div>

      <div className={styles.metricsGrid}>
        {METRICS.map((metric) => (
          <AdminMetricCard key={metric.label} metric={metric} size="dashboard" onClick={metricAction(metric.label)} />
        ))}
      </div>

      <div className={styles.columns}>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Actividad reciente</h2>
          <AdminActivityList items={ACTIVITY} onSelect={handleActivity} />
        </div>

        <AdminAbandonedCarts />
      </div>

      <div className={styles.fullWidth}>
        <AdminRecentCustomers />
      </div>

      <AdminOperationalStatusFloating />
    </div>
  );
}
