/* ============================================================
   main.js — Punto de Entrada · Inicialización
   FinanceTrack · Proyecto de Portafolio
   ============================================================ */

import {
  addTransaction,
  setSelectedType,
  setActiveFilter,
  clearAllTransactions,
  getTransactions,
  getSelectedType,
} from './transactions.js';

import {
  renderStats,
  renderList,
  renderCategorySummary,
} from './ui.js';

import { loadTheme, saveTheme } from './storage.js';

/* ════════════════════════════════════════════════════════════
   THEME
════════════════════════════════════════════════════════════ */

/**
 * Alterna entre modo oscuro y claro.
 * Guarda la preferencia en localStorage.
 */
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light');
  saveTheme(isLight ? 'light' : 'dark');
}

/* ════════════════════════════════════════════════════════════
   TYPE TOGGLE (Ingreso / Gasto)
════════════════════════════════════════════════════════════ */

/**
 * Actualiza el botón activo del toggle de tipo.
 * @param {'income'|'expense'} type
 * @param {HTMLElement} clickedBtn
 */
function handleTypeChange(type, clickedBtn) {
  setSelectedType(type);
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  clickedBtn.classList.add('active');
}

/* ════════════════════════════════════════════════════════════
   FILTER TABS
════════════════════════════════════════════════════════════ */

/**
 * Actualiza el tab activo y filtra la lista.
 * @param {'all'|'income'|'expense'} filter
 * @param {HTMLElement} clickedTab
 */
function handleFilterChange(filter, clickedTab) {
  setActiveFilter(filter);
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  clickedTab.classList.add('active');
}

/* ════════════════════════════════════════════════════════════
   EVENT BINDING
════════════════════════════════════════════════════════════ */

function bindEvents() {
  /* ── Theme toggle ── */
  document.getElementById('theme-toggle-btn')
    ?.addEventListener('click', toggleTheme);

  /* ── Type buttons ── */
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleTypeChange(btn.dataset.type, btn);
    });
  });

  /* ── Filter tabs ── */
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      handleFilterChange(tab.dataset.filter, tab);
    });
  });

  /* ── Submit button ── */
  document.getElementById('submit-btn')
    ?.addEventListener('click', addTransaction);

  /* ── Enter key on form fields ── */
  ['tx-desc', 'tx-amount', 'tx-category', 'tx-date'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') addTransaction();
    });
  });

  /* ── Clear all (nav link) ── */
  document.getElementById('clear-btn')
    ?.addEventListener('click', e => {
      e.preventDefault();
      clearAllTransactions();
    });

  /* ── Scroll to transactions (nav link) ── */
  document.getElementById('scroll-to-list')
    ?.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('transactions-section')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
}

/* ════════════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════════ */

function init() {
  /* Restore theme */
  if (loadTheme() === 'light') {
    document.documentElement.classList.add('light');
  }

  /* Set today as default date */
  const dateInput = document.getElementById('tx-date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  /* Date display in header */
  const dateDisplay = document.getElementById('date-display');
  if (dateDisplay) {
    dateDisplay.textContent = new Date().toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /* Sidebar month label */
  const monthDisplay = document.getElementById('sidebar-month');
  if (monthDisplay) {
    const raw = new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
    monthDisplay.textContent = raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  /* Initial render */
  const txs = getTransactions();
  renderStats(txs);
  renderList(txs);
  renderCategorySummary(txs);

  /* Bind all events */
  bindEvents();
}

/* Run when DOM is ready */
document.addEventListener('DOMContentLoaded', init);
