'use client';

import { colors } from '@/lib/tokens';

/** SVG de satélite em órbita — ícone do logo Controllus */
export default function LogoMark({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="6.5" stroke={colors.accent.cyan} strokeWidth="1.5" />
      <ellipse
        cx="12" cy="12" rx="11" ry="4.4"
        stroke={colors.accent.cyan} strokeWidth="1.2"
        opacity="0.55"
        transform="rotate(-28 12 12)"
      />
      <circle cx="12" cy="12" r="2.1" fill={colors.accent.cyan} />
      <circle cx="20.4" cy="7.9" r="1.5" fill={colors.accent.cyan} />
    </svg>
  );
}
