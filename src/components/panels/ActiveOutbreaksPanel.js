'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SeverityBadge from '@/components/ui/SeverityBadge';
import { colors, typography, spacing, radius, glass, SEVERITY_META } from '@/lib/tokens';
import { SEV_RANK } from '@/lib/constants';

/* ─── Filtros disponíveis ───────────────────────────────────────────────── */
const FILTERS = [
  { key: 'all',     label: 'Todos' },
  { key: 'critica', label: 'Crítico' },
  { key: 'alta',    label: 'Alto' },
  { key: 'media',   label: 'Médio' },
  { key: 'baixa',   label: 'Baixo' },
];

/* ─── Chip de filtro ────────────────────────────────────────────────────── */
function FilterChip({ filter, active, onClick }) {
  const col = filter.key === 'all' ? colors.accent.cyan : SEVERITY_META[filter.key]?.color;
  return (
    <button
      onClick={onClick}
      style={{
        padding:          `${spacing.xs} ${spacing.sm}`,
        borderRadius:     radius.full,
        border:           `1px solid ${active ? col : colors.border.default}`,
        background:       active ? `${col}22` : 'transparent',
        color:            active ? col : colors.text.secondary,
        fontSize:         typography.size.xs,
        fontFamily:       typography.family.mono,
        fontWeight:       typography.weight.medium,
        cursor:           'pointer',
        whiteSpace:       'nowrap',
        transition:       'all 0.18s ease',
        textTransform:    'uppercase',
        letterSpacing:    '0.05em',
      }}
    >
      {filter.label}
    </button>
  );
}

/* ─── Card de surto ─────────────────────────────────────────────────────── */
function OutbreakCard({ outbreak, selected, onClick }) {
  const col = SEVERITY_META[outbreak.severity]?.color ?? colors.accent.cyan;
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      onClick={onClick}
      style={{
        display:       'block',
        width:         '100%',
        textAlign:     'left',
        padding:       spacing.md,
        borderRadius:  radius.md,
        border:        `1px solid ${selected ? col : colors.border.default}`,
        borderLeft:    `3px solid ${col}`,
        background:    selected ? `${col}11` : 'rgba(10,15,30,0.4)',
        cursor:        'pointer',
        transition:    'all 0.18s ease',
        marginBottom:  spacing.sm,
      }}
    >
      {/* Linha 1: flag + doença + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.sm, marginBottom: spacing.xs }}>
        <span style={{ fontSize: typography.size.md, fontFamily: typography.family.body, color: colors.text.primary, fontWeight: typography.weight.semibold, lineHeight: 1.3 }}>
          {outbreak.flag} {outbreak.disease}
        </span>
        <SeverityBadge severity={outbreak.severity} size="sm" />
      </div>

      {/* Linha 2: país + data */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: typography.size.sm, color: colors.text.secondary, fontFamily: typography.family.body }}>
          {outbreak.country}
        </span>
        <span style={{ fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono }}>
          {outbreak.date}
        </span>
      </div>

      {/* Linha 3: descrição resumida */}
      <p style={{
        marginTop:    spacing.xs,
        fontSize:     typography.size.xs,
        color:        colors.text.muted,
        fontFamily:   typography.family.body,
        lineHeight:   1.5,
        display:      '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow:     'hidden',
      }}>
        {outbreak.description}
      </p>
    </motion.button>
  );
}

/* ─── Componente principal ──────────────────────────────────────────────── */
export default function ActiveOutbreaksPanel({ outbreaks, selectedId, onSelect, onClose, title }) {
  const [filter, setFilter] = useState('all');

  const filtered = outbreaks
    .filter((o) => filter === 'all' || o.severity === filter)
    .sort((a, b) => SEV_RANK[b.severity] - SEV_RANK[a.severity]);

  return (
    <motion.aside
      initial={{ x: -340, opacity: 0 }}
      animate={{ x: 0,    opacity: 1 }}
      exit={{   x: -340, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      style={{
        position:       'fixed',
        top:            '68px',
        left:           spacing.md,
        bottom:         '46px',
        width:          '340px',
        zIndex:         20,
        display:        'flex',
        flexDirection:  'column',
        ...glass,
        borderRadius:   radius.xl,
        overflow:       'hidden',
      }}
    >
      {/* Cabeçalho */}
      <div style={{
        padding:        `${spacing.md} ${spacing.md} ${spacing.sm}`,
        borderBottom:   `1px solid ${colors.border.default}`,
        flexShrink:     0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
          <div>
            <h2 style={{ margin: 0, fontSize: typography.size.sm, fontFamily: typography.family.brand, color: colors.accent.cyan, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {title ?? 'Surtos Ativos'}
            </h2>
            <p style={{ margin: 0, fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, marginTop: '2px' }}>
              {filtered.length} evento{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.muted, padding: spacing.xs, borderRadius: radius.sm, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Chips de filtro */}
        <div style={{ display: 'flex', gap: spacing.xs, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              filter={f}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
            />
          ))}
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
        <AnimatePresence mode="popLayout">
          {filtered.map((o) => (
            <OutbreakCard
              key={o.id}
              outbreak={o}
              selected={o.id === selectedId}
              onClick={() => onSelect(o.id)}
            />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: colors.text.muted, fontFamily: typography.family.mono, fontSize: typography.size.xs, marginTop: spacing.xl }}>
            Nenhum surto encontrado para este filtro.
          </p>
        )}
      </div>
    </motion.aside>
  );
}
