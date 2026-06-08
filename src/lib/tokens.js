/**
 * Design System — Controllus
 * Tema: Dark Mode Espacial
 *
 * REGRA CRÍTICA: NUNCA usar valores literais de cor, tamanho ou espaçamento
 * nos componentes. Sempre importar e usar as variáveis deste arquivo.
 */

export const colors = {
  background: {
    primary:   '#050A18',
    secondary: '#0A0F1E',
    tertiary:  '#0F1629',
    overlay:   'rgba(5, 10, 24, 0.85)',
  },

  accent: {
    cyan:    '#00D4FF',
    cyanDim: '#00A3C4',
    glow:    'rgba(0, 212, 255, 0.15)',
  },

  severity: {
    baixa:   '#00FF88',
    media:   '#FFB300',
    alta:    '#FF4444',
    critica: '#FF0066',
  },

  text: {
    primary:   '#E2E8F0',
    secondary: '#94A3B8',
    muted:     '#475569',
    accent:    '#00D4FF',
  },

  border: {
    default: 'rgba(255, 255, 255, 0.08)',
    accent:  'rgba(0, 212, 255, 0.3)',
  },
};

export const typography = {
  family: {
    // Variáveis CSS injetadas pelo next/font/google (auto-hospedado)
    brand: 'var(--font-orbitron), "Orbitron", sans-serif',
    body:  'var(--font-inter), "Inter", sans-serif',
    mono:  'var(--font-mono), "JetBrains Mono", monospace',
  },

  size: {
    xs:   '0.75rem',
    sm:   '0.875rem',
    md:   '1rem',
    lg:   '1.125rem',
    xl:   '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  weight: {
    regular:  '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
    black:    '900',
  },
};

export const spacing = {
  xs:    '0.25rem',
  sm:    '0.5rem',
  md:    '1rem',
  lg:    '1.5rem',
  xl:    '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

export const radius = {
  sm:   '0.375rem',
  md:   '0.5rem',
  lg:   '0.75rem',
  xl:   '1rem',
  full: '9999px',
};

/** Converte hex + alpha em rgba. Ex.: hexA('#00D4FF', 0.15) */
export function hexA(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Metadados de cada nível de severidade */
export const SEVERITY_META = {
  baixa:   { key: 'baixa',   label: 'BAIXO',   color: colors.severity.baixa },
  media:   { key: 'media',   label: 'MÉDIO',   color: colors.severity.media },
  alta:    { key: 'alta',    label: 'ALTO',    color: colors.severity.alta },
  critica: { key: 'critica', label: 'CRÍTICO', color: colors.severity.critica },
};

/** Estilos glassmorphism compartilhados */
export const glass = {
  background:     'rgba(10, 15, 30, 0.7)',
  backdropFilter: 'blur(16px)',
  border:         `1px solid rgba(255, 255, 255, 0.08)`,
  borderRadius:   radius.lg,
};
