# Design System — Controllus

> Tema: Dark Mode Espacial. Todos os componentes devem usar exclusivamente estas variáveis.

---

## Paleta de Cores

```js
// src/lib/tokens.js
export const colors = {
  // Fundos
  background: {
    primary:   '#050A18',              // fundo principal
    secondary: '#0A0F1E',              // cards, modais
    tertiary:  '#0F1629',              // hover, bordas internas
    overlay:   'rgba(5, 10, 24, 0.85)', // fundo do modal com blur
  },

  // Acentos
  accent: {
    cyan:    '#00D4FF',                // destaque principal
    cyanDim: '#00A3C4',                // hover do cyan
    glow:    'rgba(0, 212, 255, 0.15)', // halo/brilho
  },

  // Severidade (surtos)
  severity: {
    low:      '#00FF88',   // risco baixo — verde neon
    medium:   '#FFB300',   // risco médio — âmbar
    high:     '#FF4444',   // risco alto — vermelho
    critical: '#FF0066',   // crítico — rosa/magenta
  },

  // Texto
  text: {
    primary:   '#E2E8F0',  // texto principal
    secondary: '#94A3B8',  // labels, subtítulos
    muted:     '#475569',  // desabilitado
    accent:    '#00D4FF',  // texto com destaque
  },

  // Bordas
  border: {
    default: 'rgba(255, 255, 255, 0.08)',
    accent:  'rgba(0, 212, 255, 0.3)',
  },
};
```

---

## Tipografia

```js
export const typography = {
  family: {
    brand: '"Orbitron", sans-serif',        // exclusivo para o logo "Controllus"
    body:  '"Inter", sans-serif',           // todo o restante
    mono:  '"JetBrains Mono", monospace',   // dados numéricos, coordenadas
  },

  size: {
    xs:   '0.75rem',    // 12px
    sm:   '0.875rem',   // 14px
    md:   '1rem',       // 16px
    lg:   '1.125rem',   // 18px
    xl:   '1.25rem',    // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
  },

  weight: {
    regular:  '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
    black:    '900',
  },
};
```

---

## Espaçamento

```js
export const spacing = {
  xs:   '0.25rem',  // 4px
  sm:   '0.5rem',   // 8px
  md:   '1rem',     // 16px
  lg:   '1.5rem',   // 24px
  xl:   '2rem',     // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};
```

---

## Border Radius

```js
export const radius = {
  sm:   '0.375rem',  // 6px
  md:   '0.5rem',    // 8px
  lg:   '0.75rem',   // 12px
  xl:   '1rem',      // 16px
  full: '9999px',
};
```

---

## Efeitos Visuais

```css
/* Glassmorphism — fundo dos cards e modal */
.glass {
  background: rgba(10, 15, 30, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Glow por severidade */
.glow-low      { box-shadow: 0 0 12px rgba(0, 255, 136, 0.4); }
.glow-medium   { box-shadow: 0 0 12px rgba(255, 179, 0, 0.4); }
.glow-high     { box-shadow: 0 0 12px rgba(255, 68, 68, 0.4); }
.glow-critical { box-shadow: 0 0 12px rgba(255, 0, 102, 0.4); }
```

---

## Globo 3D — Configuração Visual

```js
// src/lib/constants.js
export const GLOBE_CONFIG = {
  globeImageUrl:      '//unpkg.com/three-globe/example/img/earth-dark.jpg',
  backgroundImageUrl: '//unpkg.com/three-globe/example/img/night-sky.png',
  atmosphereColor:    '#00D4FF',
  atmosphereAltitude: 0.15,
  pointAltitude:      0.02,
  pointRadius:        0.4,
  pointResolution:    8,
};
```

---

## Fontes (Google Fonts)

```jsx
{/* src/app/layout.jsx */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

---

## Regra Crítica

**NUNCA** usar valores literais de cor, tamanho ou espaçamento nos componentes:

```jsx
// ❌  style={{ color: '#00D4FF', fontSize: '14px', padding: '16px' }}
// ✅  style={{ color: colors.accent.cyan, fontSize: typography.size.sm, padding: spacing.md }}
```
