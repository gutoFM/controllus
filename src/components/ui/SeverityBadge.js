'use client';

import { SEVERITY_META, hexA, typography, radius } from '@/lib/tokens';

/**
 * SeverityBadge — pílula colorida por nível de severidade com glow.
 *
 * @param {'baixa'|'media'|'alta'|'critica'} severity
 * @param {'sm'|'lg'} size
 */
export default function SeverityBadge({ severity, size = 'sm' }) {
  const meta = SEVERITY_META[severity] ?? SEVERITY_META.baixa;
  const isLg = size === 'lg';

  return (
    <span
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '6px',
        borderRadius:  radius.full,
        padding:       isLg ? '6px 14px' : '3px 10px',
        fontFamily:    typography.family.mono,
        fontSize:      isLg ? '13px' : '11px',
        fontWeight:    typography.weight.medium,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color:         meta.color,
        background:    hexA(meta.color, 0.15),
        border:        `1px solid ${hexA(meta.color, 0.6)}`,
        boxShadow:     `0 0 12px ${hexA(meta.color, 0.4)}`,
        whiteSpace:    'nowrap',
      }}
    >
      <span
        style={{
          width:        isLg ? 7 : 6,
          height:       isLg ? 7 : 6,
          borderRadius: radius.full,
          background:   meta.color,
          boxShadow:    `0 0 6px ${meta.color}`,
          flexShrink:   0,
        }}
      />
      {meta.label}
    </span>
  );
}
