import type { QuizQuestion } from '../types';

// 1:1 con this.QUIZ del original — usado por el quiz de regalos.
export const QUIZ: QuizQuestion[] = [
  {
    question: '¿Para quién es el regalo?',
    options: [
      { label: 'Para ella', emoji: '💛', value: 'ella' },
      { label: 'Para él', emoji: '📓', value: 'el' },
      { label: 'Para todes', emoji: '🌟', value: 'todes' },
    ],
  },
  {
    question: '¿Cuál es tu presupuesto?',
    options: [
      { label: 'Menos de $5.000', emoji: '✨', value: 'bajo' },
      { label: '$5.000 – $15.000', emoji: '🌸', value: 'medio' },
      { label: '$15.000 – $30.000', emoji: '🎁', value: 'alto' },
      { label: 'Más de $30.000', emoji: '💝', value: 'premium' },
    ],
  },
  {
    question: '¿Qué le gusta más?',
    options: [
      { label: 'Escribir y planificar', emoji: '📝', value: 'plan' },
      { label: 'Decorar y organizar', emoji: '🌈', value: 'deco' },
      { label: 'Arte y creatividad', emoji: '🎨', value: 'arte' },
      { label: '¡Todo lo anterior!', emoji: '💖', value: 'todo' },
    ],
  },
];
