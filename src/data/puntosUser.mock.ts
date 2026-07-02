import type { Customer } from '../types';

// 1:1 con this.PUNTOS_USER del original — cliente logueado en /puntos.
export const PUNTOS_USER: Customer = {
  nombre: 'Valentina',
  email: 'valentina@example.com',
  puntos: 1240,
  nivel: 'Artista',
  puntosNextNivel: 2000,
  historial: [
    { fecha: '15 jun 2026', descripcion: 'Compra #1234', puntos: '+120', color: '#1a8040' },
    { fecha: '02 jun 2026', descripcion: 'Canje descuento 10%', puntos: '−500', color: '#E94300' },
    { fecha: '18 may 2026', descripcion: 'Compra #1198', puntos: '+89', color: '#1a8040' },
    { fecha: '01 may 2026', descripcion: 'Bono bienvenida', puntos: '+200', color: '#5957B0' },
    { fecha: '15 abr 2026', descripcion: 'Compra #1087', puntos: '+231', color: '#1a8040' },
  ],
  recompensas: [
    { id: 1, nombre: '10% de descuento', emoji: '🏷️', puntos: 500, disponible: true },
    { id: 2, nombre: 'Envío gratis', emoji: '📦', puntos: 800, disponible: true },
    { id: 3, nombre: 'Sticker pack exclusivo', emoji: '⭐', puntos: 1000, disponible: true },
    { id: 4, nombre: '20% de descuento', emoji: '🎉', puntos: 1500, disponible: false },
    { id: 5, nombre: 'Producto sorpresa', emoji: '🎁', puntos: 2000, disponible: false },
  ],
};
