/* ============================================================
   transactions.js — Lógica de Negocio (CRUD)
   FinanceTrack · Proyecto de Portafolio
   ============================================================ */

import { loadTransactions, saveTransactions, clearTransactions } from './storage.js';
import { renderStats, renderList, renderCategorySummary, showToast, formatCurrency } from './ui.js';

/* ── State ────────────────────────────────────────────────── */

/** @type {Array} Lista principal de transacciones en memoria */
let transactions = loadTransactions();

/** @type {'income'|'expense'} Tipo seleccionado en el formulario */
let selectedType = 'income';

/** @type {'all'|'income'|'expense'} Filtro activo en la lista */
let activeFilter = 'all';

/* ── Getters ──────────────────────────────────────────────── */

export const getTransactions = () => transactions;
export const getSelectedType = () => selectedType;
export const getActiveFilter = () => activeFilter;

/* ── Setters ──────────────────────────────────────────────── */

/**
 * Cambia el tipo de transacción seleccionado en el formulario.
 * @param {'income'|'expense'} type
 */
export function setSelectedType(type) {
  selectedType = type;
}

/**
 * Cambia el filtro activo y re-renderiza la lista.
 * @param {'all'|'income'|'expense'} filter
 */
export function setActiveFilter(filter) {
  activeFilter = filter;
  renderList(transactions, activeFilter);
}

/* ── CRUD Operations ──────────────────────────────────────── */

/**
 * Valida los campos del formulario y agrega una nueva transacción.
 * Actualiza localStorage y re-renderiza toda la UI.
 */
export function addTransaction() {
  const desc     = document.getElementById('tx-desc')?.value.trim();
  const amount   = parseFloat(document.getElementById('tx-amount')?.value);
  const category = document.getElementById('tx-category')?.value;
  const date     = document.getElementById('tx-date')?.value;

  /* ── Validaciones ── */
  if (!desc)               return showToast('Agrega una descripción',  '#E07070');
  if (!amount || amount <= 0) return showToast('Ingresa un monto válido', '#E07070');
  if (!category)           return showToast('Selecciona una categoría', '#E07070');
  if (!date)               return showToast('Selecciona una fecha',     '#E07070');

  /** @type {Transaction} */
  const tx = {
    id:       Date.now(),
    type:     selectedType,
    desc,
    amount,
    category,
    date,
  };

  transactions.unshift(tx);
  saveTransactions(transactions);
  refreshUI();
  resetForm();

  const verb = selectedType === 'income' ? 'Ingreso' : 'Gasto';
  const color = selectedType === 'income' ? '#4ECBA9' : '#E07070';
  showToast(`${verb} de ${formatCurrency(amount)} agregado`, color);
}

/**
 * Elimina una transacción por ID.
 * @param {number} id
 */
export function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions(transactions);
  refreshUI();
  showToast('Transacción eliminada', '#94A3B8');
}

/**
 * Elimina todas las transacciones después de confirmación del usuario.
 */
export function clearAllTransactions() {
  if (!transactions.length) {
    return showToast('No hay datos para borrar', '#888');
  }

  const confirmed = confirm(
    '¿Eliminar TODAS las transacciones?\nEsta acción no se puede deshacer.'
  );

  if (confirmed) {
    transactions = [];
    clearTransactions();
    refreshUI();
    showToast('Todos los datos eliminados', '#94A3B8');
  }
}

/* ── Helpers ──────────────────────────────────────────────── */

/**
 * Re-renderiza stats, lista y resumen de categorías.
 */
function refreshUI() {
  renderStats(transactions);
  renderList(transactions, activeFilter);
  renderCategorySummary(transactions);
}

/**
 * Limpia los campos del formulario después de agregar.
 */
function resetForm() {
  const fields = ['tx-desc', 'tx-amount', 'tx-category'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}
