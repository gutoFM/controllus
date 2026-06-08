'use client';

import { colors, typography, spacing } from '@/lib/tokens';

/**
 * MenuSection — item individual da navbar.
 * Ativo: texto ciano + sublinhado com glow.
 */
export default function MenuSection({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background:     'none',
        border:         'none',
        cursor:         'pointer',
        padding:        `${spacing.xs} ${spacing.sm}`,
        fontFamily:     typography.family.body,
        fontSize:       typography.size.sm,
        fontWeight:     typography.weight.medium,
        color:          isActive ? colors.accent.cyan : colors.text.secondary,
        position:       'relative',
        transition:     'color 0.2s ease',
        whiteSpace:     'nowrap',
      }}
    >
      {label}

      {/* Sublinhado ativo com glow */}
      {isActive && (
        <span
          style={{
            position:   'absolute',
            bottom:     '-2px',
            left:       0,
            right:      0,
            height:     '2px',
            background: colors.accent.cyan,
            boxShadow:  `0 0 8px ${colors.accent.cyan}`,
            borderRadius: '1px',
          }}
        />
      )}
    </button>
  );
}
