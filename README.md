# 💰 FinanceTrack

Rastreador de finanzas personales con soporte para ingresos, gastos, categorías y modo oscuro/claro.

## 🛠 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| HTML5      | Estructura semántica del DOM |
| CSS3       | Custom Properties, Grid, Flexbox, animaciones |
| JavaScript ES6+ | Lógica, módulos, localStorage |

## 📁 Estructura del Proyecto

```
financetrack/
├── index.html              # Punto de entrada principal
├── README.md               # Documentación del proyecto
├── css/
│   ├── variables.css       # Custom Properties (tokens de diseño)
│   ├── reset.css           # Reset y estilos base
│   ├── layout.css          # Sidebar, main, grid
│   ├── components.css      # Tarjetas, botones, formularios
│   └── theme.css           # Modo claro / oscuro
└── js/
    ├── data.js             # Constantes y configuración de categorías
    ├── storage.js          # Capa de persistencia (localStorage)
    ├── ui.js               # Renderizado del DOM
    ├── transactions.js     # Lógica de negocio (CRUD)
    └── main.js             # Punto de entrada, inicialización
```

## 🚀 Cómo correrlo

1. Clona o descomprime el proyecto
2. Abre `index.html` en cualquier navegador moderno
3. No requiere instalación ni servidor

> **Nota:** Usa `localStorage` para persistir datos, por lo que los datos se mantienen entre sesiones en el mismo navegador.

## ✨ Funcionalidades

- ✅ Agregar ingresos y gastos con categoría, monto y fecha
- ✅ Filtrar transacciones por tipo
- ✅ Eliminar transacciones individuales
- ✅ Resumen de categorías en el sidebar
- ✅ Barra de progreso de ratio gastos/ingresos
- ✅ Modo oscuro y claro con persistencia
- ✅ Notificaciones toast
- ✅ Diseño responsivo (tablet y móvil)

## 👤 Autor

Desarrollado como proyecto de portafolio.
