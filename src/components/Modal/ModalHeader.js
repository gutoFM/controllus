'use client';

import { X } from 'lucide-react';
import { colors, typography, spacing } from '@/lib/tokens';
import SeverityBadge from '@/components/ui/SeverityBadge';

export default function ModalHeader({ outbreak, onClose }) {
  return (
    <div
      style={{
        padding:      spacing.lg,
        borderBottom: `1px solid ${colors.border.default}`,
        flexShrink:   0,
      }}
    >
      {/* Linha topo: país + fechar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
        <span style={{ fontFamily: typography.family.body, fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.text.primary }}>
          {outbreak.flag} {outbreak.country}
        </span>
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            background:   'none',
            border:       'none',
            cursor:       'pointer',
            color:        colors.text.muted,
            display:      'flex',
            alignItems:   'center',
            padding:      '4px',
            borderRadius: '4px',
            transition:   'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.muted)}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nome da doença */}
      <p style={{ fontFamily: typography.family.body, fontSize: typography.size['2xl'], fontWeight: typography.weight.bold, color: colors.text.primary, marginBottom: spacing.xs }}>
        {outbreak.disease}
      </p>

      {/* Data + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
        <span style={{ fontFamily: typography.family.mono, fontSize: typography.size.xs, color: colors.text.muted }}>
          {outbreak.date}
        </span>
        <SeverityBadge severity={outbreak.severity} size="lg" />
      </div>
    </div>
  );
}
