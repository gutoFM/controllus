'use client';

import { colors, typography, spacing, glass, radius } from '@/lib/tokens';

function fmt(n) {
  return Number(n).toLocaleString('pt-BR');
}

function StatCard({ label, value, valueColor }) {
  return (
    <div
      style={{
        background:      glass.background,
        backdropFilter:  glass.backdropFilter,
        WebkitBackdropFilter: glass.backdropFilter,
        border:          glass.border,
        borderRadius:    radius.md,
        padding:         spacing.md,
        display:         'flex',
        flexDirection:   'column',
        gap:             spacing.xs,
        flex:            1,
      }}
    >
      <span style={{ fontFamily: typography.family.body, fontSize: '11px', color: colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
      <span style={{ fontFamily: typography.family.mono, fontSize: '26px', fontWeight: typography.weight.semibold, color: valueColor }}>
        {value}
      </span>
    </div>
  );
}

export default function ModalStats({ outbreak }) {
  return (
    <div style={{ padding: spacing.lg, flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: spacing.sm }}>
        <StatCard label="Casos Confirmados" value={fmt(outbreak.cases)}   valueColor={colors.accent.cyan} />
        <StatCard label="Óbitos"            value={fmt(outbreak.deaths)}  valueColor={colors.severity.alta} />
        <StatCard label="Regiões Afetadas"  value={outbreak.regions}      valueColor={colors.severity.media} />
      </div>
    </div>
  );
}
