'use client';

import { colors, typography, spacing } from '@/lib/tokens';

export default function ModalTimeline({ timeline }) {
  if (!timeline?.length) return null;

  return (
    <div style={{ padding: `0 ${spacing.lg} ${spacing.lg}` }}>
      <p style={{ fontFamily: typography.family.body, fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.accent.cyan, marginBottom: spacing.md }}>
        Linha do Tempo
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {timeline.map((entry, i) => (
          <div
            key={i}
            style={{
              display:    'flex',
              gap:        spacing.md,
              paddingLeft: spacing.sm,
              borderLeft: `2px solid ${colors.accent.cyan}`,
              position:   'relative',
            }}
          >
            {/* Ponto na linha */}
            <span
              style={{
                position:     'absolute',
                left:         '-5px',
                top:          '4px',
                width:        '8px',
                height:       '8px',
                borderRadius: '50%',
                background:   colors.accent.cyan,
                boxShadow:    `0 0 6px ${colors.accent.cyan}`,
                flexShrink:   0,
              }}
            />

            <div style={{ paddingLeft: spacing.xs }}>
              <p style={{ fontFamily: typography.family.mono, fontSize: '11px', color: colors.text.muted, marginBottom: '2px' }}>
                {entry.date}
              </p>
              <p style={{ fontFamily: typography.family.body, fontSize: typography.size.sm, color: colors.text.secondary, lineHeight: '1.5' }}>
                {entry.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
