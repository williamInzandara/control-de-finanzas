/* ============================================================
   ui.js — Renderizado del DOM
   FinanceTrack · Proyecto de Portafolio
   ============================================================ */

import { CATEGORY_COLORS, CATEGORY_ICONS, MONTH_NAMES } from './data.js';
import { deleteTransaction } from './transactions.js';

/* ── Formatters ───────────────────────────────────────────── */

/**
 * Formatea un número como valor monetario en COP.
 * @param {number} n
 * @returns {string}  Ej: "$1,250.00"
 */
export function formatCurrency(n) {
  return '$' + Math.abs(n).toLocaleString('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Formatea una fecha ISO (YYYY-MM-DD) en formato legible.
 * @param {string} iso
 * @returns {string}  Ej: "5 Abr 2025"
 */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${+d} ${MONTH_NAMES[+m - 1]} ${y}`;
}

/* ── Toast ────────────────────────────────────────────────── */

let toastTimer = null;

/**
 * Muestra una notificación toast temporal.
 * @param {string} msg    Mensaje a mostrar.
 * @param {string} color  Color del indicador (hex o CSS var).
 */
export function showToast(msg, color = '#4ECBA9') {
  const toast   = document.getElementById('toast');
  const dot     = document.getElementById('toast-dot');
  const message = document.getElementById('toast-msg');

  message.textContent  = msg;
  dot.style.background = color;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── Stats Cards ──────────────────────────────────────────── */

/**
 * Actualiza los valores de las tarjetas de resumen y el sidebar.
 * @param {Array} transactions
 */
export function renderStats(transactions) {
  const incomeList  = transactions.filter(t => t.type === 'income');
  const expenseList = transactions.filter(t => t.type === 'expense');

  const totalIncome  = incomeList.reduce((s, t) => s + t.amount, 0);
  const totalExpense = expenseList.reduce((s, t) => s + t.amount, 0);
  const net          = totalIncome - totalExpense;

  /* ── Cards ── */
  setText('total-income',  formatCurrency(totalIncome));
  setText('total-expense', formatCurrency(totalExpense));
  setText('net-balance',   formatCurrency(net));
  setText('sidebar-balance', formatCurrency(net));

  setText('income-count',  pluralize(incomeList.length, 'transacción', 'transacciones'));
  setText('expense-count', pluralize(expenseList.length, 'transacción', 'transacciones'));
  setText('total-count',   `${transactions.length} registros totales`);

  /* Net color */
  const netEl = document.getElementById('net-balance');
  if (netEl) netEl.style.color = net >= 0
    ? 'var(--gold)'
    : 'var(--expense-color)';

  /* ── Progress bar ── */
  const pc = document.getElementById('progress-container');
  if (totalIncome > 0) {
    pc.style.display = 'block';
    const pct = Math.min(100, Math.round((totalExpense / totalIncome) * 100));
    setText('progress-pct', pct + '%');
    setStyle('progress-fill', 'width', pct + '%');
  } else {
    pc.style.display = 'none';
  }
}

/* ── Transaction List ─────────────────────────────────────── */

/**
 * Renderiza la lista de transacciones filtrada.
 * @param {Array}  transactions  Lista completa.
 * @param {string} filter        'all' | 'income' | 'expense'
 */
export function renderList(transactions, filter = 'all') {
  const list = document.getElementById('transaction-list');
  if (!list) return;

  const filtered = filter === 'all'
    ? transactions
    : transactions.filter(t => t.type === filter);

  if (filtered.length === 0) {
    list.innerHTML = buildEmptyState(filter);
    return;
  }

  list.innerHTML = filtered.map(buildTransactionItem).join('');

  /* Attach delete handlers */
  list.querySelectorAll('.tx-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      deleteTransaction(id);
    });
  });
}

/* ── Category Summary (Sidebar) ───────────────────────────── */

/**
 * Renderiza el top-5 de categorías de gasto en el sidebar.
 * @param {Array} transactions
 */
export function renderCategorySummary(transactions) {
  const el = document.getElementById('category-summary-list');
  if (!el) return;

  const expenses = transactions.filter(t => t.type === 'expense');

  if (expenses.length === 0) {
    el.innerHTML = `<p style="font-size:12px;color:var(--text-muted);padding:4px 0;">Sin categorías aún</p>`;
    return;
  }

  /* Agrupar por categoría */
  const catMap = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const top5 = Object.entries(catMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  el.innerHTML = top5.map(([cat, amt]) => `
    <div class="cat-item">
      <span class="cat-name">
        <span class="cat-dot" style="background:${CATEGORY_COLORS[cat] || '#888'}"></span>
        ${CATEGORY_ICONS[cat] || '📦'} ${cat}
      </span>
      <span class="cat-amount">${formatCurrency(amt)}</span>
    </div>
  `).join('');
}

/* ── Helpers ──────────────────────────────────────────────── */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setStyle(id, prop, value) {
  const el = document.getElementById(id);
  if (el) el.style[prop] = value;
}

function pluralize(n, singular, plural) {
  return `${n} ${n === 1 ? singular : plural}`;
}

function buildEmptyState(filter) {
  const icon = filter === 'income' ? '💚' : filter === 'expense' ? '📉' : '📊';
  const title = filter === 'all'
    ? 'Sin transacciones aún'
    : filter === 'income'
      ? 'Sin ingresos registrados'
      : 'Sin gastos registrados';

  return `
    <div class="empty-state">
      <span class="empty-icon">${icon}</span>
      <p class="empty-title">${title}</p>
      <p class="empty-sub">Agrega una transacción usando el formulario</p>
    </div>`;
}

function buildTransactionItem(tx) {
  const color = CATEGORY_COLORS[tx.category] || '#888';
  const icon  = CATEGORY_ICONS[tx.category]  || '📦';
  const sign  = tx.type === 'income' ? '+' : '-';

  return `
    <div class="transaction-item">
      <div class="tx-icon" style="background:${color}22; border:1px solid ${color}33;">
        <span style="font-size:16px;">${icon}</span>
      </div>
      <div class="tx-info">
        <p class="tx-desc">${tx.desc}</p>
        <p class="tx-meta">${tx.category} · ${formatDate(tx.date)}</p>
      </div>
      <p class="tx-amount ${tx.type}">${sign}${formatCurrency(tx.amount)}</p>
      <button class="tx-delete" data-id="${tx.id}" title="Eliminar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
        </svg>
      </button>
    </div>`;
}
