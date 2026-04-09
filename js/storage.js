/* ============================================================
   storage.js — Capa de Persistencia (localStorage)
   FinanceTrack · Proyecto de Portafolio
   ============================================================ */

import { STORAGE_KEY, THEME_KEY } from './data.js';

/* ── Transactions ─────────────────────────────────────────── */

/**
 * Carga las transacciones guardadas desde localStorage.
 * @returns {Array} Lista de transacciones o array vacío.
 */
export function loadTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('[Storage] Error cargando transacciones:', err);
    return [];
  }
}

/**
 * Guarda la lista de transacciones en localStorage.
 * @param {Array} transactions
 */
export function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (err) {
    console.error('[Storage] Error guardando transacciones:', err);
  }
}

/**
 * Elimina todas las transacciones de localStorage.
 */
export function clearTransactions() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ── Theme ────────────────────────────────────────────────── */

/**
 * Retorna el tema guardado: 'dark' | 'light'.
 * Por defecto devuelve 'dark'.
 * @returns {'dark'|'light'}
 */
export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

/**
 * Guarda la preferencia de tema.
 * @param {'dark'|'light'} theme
 */
export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
