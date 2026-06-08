'use client';

import { useMemo } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import SeverityBadge from '@/components/ui/SeverityBadge';
import { colors, typography, spacing, radius, glass, SEVERITY_META } from '@/lib/tokens';
import { SEV_RANK, CONTINENT_MAP } from '@/lib/constants';

/* ─── Agrupa surtos por continente ──────────────────────────────────────── */
function groupByContinent(outbreaks) {
  const map = {};
  for (const o of outbreaks) {
    const continent = CONTINENT_MAP[o.code] ?? 'Outros';
    if (!map[continent]) map[continent] = [];
    map[continent].push(o);
  }
  return Object.entries(map)
    .map(([name, items]) => ({
      name,
      items,
      totalCases:  items.reduce((sum, o) => sum + o.cases, 0),
      maxSeverity: items.reduce((max, o) => SEV_RANK[o.severity] > SEV_RANK[max] ? o.severity : max, 'baixa'),
    }))
    .sort((a, b) => SEV_RANK[b.maxSeverity] - SEV_RANK[a.maxSeverity] || b.totalCases - a.totalCases);
}

function formatCases(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

/* ─── Card de região ────────────────────────────────────────────────────── */
function RegionCard({ region, onSelect }) {
  const col = SEVERITY_META[region.maxSeverity]?.color ?? colors.accent.cyan;
  return (
    <div style={{
      padding:      spacing.md,
      borderRadius: radius.md,
      border:       `1px solid ${colors.border.default}`,
      borderLeft:   `3px solid ${col}`,
      background:   'rgba(10,15,30,0.4)',
      marginBottom: spacing.sm,
    }}>
      {/* Cabeçalho da região */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
        <span style={{ fontSize: typography.size.sm, fontFamily: typography.family.body, fontWeight: typography.weight.semibold, color: colors.text.primary }}>
          {region.name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span style={{ fontSize: typography.size.xs, fontFamily: typography.family.mono, color: colors.accent.cyan }}>
            {formatCases(region.totalCases)} casos
          </span>
          <SeverityBadge severity={region.maxSeverity} size="sm" />
        </div>
      </div>

      {/* Chips dos surtos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.xs }}>
        {region.items.map((o) => {
          const c = SEVERITY_META[o.severity]?.color ?? colors.accent.cyan;
          return (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              title={`${o.disease} — ${o.country}`}
              style={{
                padding:       `2px ${spacing.sm}`,
                borderRadius:  radius.full,
                border:        `1px solid ${c}55`,
                background:    `${c}15`,
                color:         c,
                fontSize:      typography.size.xs,
                fontFamily:    typography.family.mono,
                cursor:        'pointer',
                whiteSpace:    'nowrap',
                transition:    'all 0.15s',
              }}
            >
              {o.flag} {o.disease}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────────────────────── */
export default function RegionsPanel({ outbreaks, onSelect, onClose }) {
  const regions = useMemo(() => groupByContinent(outbreaks), [outbreaks]);

  return (
    <motion.aside
      initial={{ x: -340, opacity: 0 }}
      animate={{ x: 0,    opacity: 1 }}
      exit={{   x: -340, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      style={{
        position:      'fixed',
        top:           '68px',
        left:          spacing.md,
        bottom:        '46px',
        width:         '340px',
        zIndex:        20,
        display:       'flex',
        flexDirection: 'column',
        ...glass,
        borderRadius:  radius.xl,
        overflow:      'hidden',
      }}
    >
      {/* Cabeçalho */}
      <div style={{
        padding:      `${spacing.md} ${spacing.md} ${spacing.sm}`,
        borderBottom: `1px solid ${colors.border.default}`,
        flexShrink:   0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: typography.size.sm, fontFamily: typography.family.brand, color: colors.accent.cyan, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Regiões
            </h2>
            <p style={{ margin: 0, fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, marginTop: '2px' }}>
              {regions.length} continente{regions.length !== 1 ? 's' : ''} · {outbreaks.length} surtos
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.muted, padding: spacing.xs, borderRadius: radius.sm, display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Lista com scroll */}
      <div style={{
        flex:       1,
        overflowY:  'auto',
        padding:    spacing.md,
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.accent.cyanDim} transparent`,
      }}>
        {regions.map((r) => (
          <RegionCard key={r.name} region={r} onSelect={onSelect} />
        ))}
      </div>
    </motion.aside>
  );
}
