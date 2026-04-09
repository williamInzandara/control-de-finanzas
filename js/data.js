/* ============================================================
   data.js — Constantes y Configuración de Categorías
   FinanceTrack · Proyecto de Portafolio
   ============================================================ */

/**
 * Colores asociados a cada categoría.
 * Se usan para los íconos de transacción y el resumen del sidebar.
 * @type {Object.<string, string>}
 */
export const CATEGORY_COLORS = {
  'Salario':         '#4ECBA9',
  'Freelance':       '#64B5F6',
  'Inversiones':     '#D4AF64',
  'Ventas':          '#A78BFA',
  'Otro ingreso':    '#67E8F9',
  'Vivienda':        '#E07070',
  'Alimentación':    '#F59E0B',
  'Transporte':      '#FB923C',
  'Entretenimiento': '#E879F9',
  'Salud':           '#34D399',
  'Educación':       '#60A5FA',
  'Ropa':            '#F472B6',
  'Tecnología':      '#818CF8',
  'Otro gasto':      '#94A3B8',
};

/**
 * Emojis asociados a cada categoría.
 * @type {Object.<string, string>}
 */
export const CATEGORY_ICONS = {
  'Salario':         '💼',
  'Freelance':       '💻',
  'Inversiones':     '📈',
  'Ventas':          '🛒',
  'Otro ingreso':    '✨',
  'Vivienda':        '🏠',
  'Alimentación':    '🍔',
  'Transporte':      '🚌',
  'Entretenimiento': '🎬',
  'Salud':           '🏥',
  'Educación':       '📚',
  'Ropa':            '👕',
  'Tecnología':      '📱',
  'Otro gasto':      '📦',
};

/**
 * Nombre abreviado de los meses en español.
 * @type {string[]}
 */
export const MONTH_NAMES = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

/**
 * Clave usada para persistir datos en localStorage.
 * @type {string}
 */
export const STORAGE_KEY = 'financetrack_v1';

/**
 * Clave usada para guardar la preferencia de tema.
 * @type {string}
 */
export const THEME_KEY = 'financetrack_theme';
