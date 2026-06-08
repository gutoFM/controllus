'use client';

import { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { colors, typography, spacing, radius, glass, SEVERITY_META } from '@/lib/tokens';
import { API_SOURCES, ENV_INDICATORS } from '@/lib/constants';

/* ─── Ícone de tendência ────────────────────────────────────────────────── */
function TrendIcon({ trend }) {
  const props = { size: 14, strokeWidth: 2 };
  if (trend === 'up')   return <TrendingUp   {...props} color={colors.severity.alta}  />;
  if (trend === 'down') return <TrendingDown {...props} color={colors.severity.baixa} />;
  return                       <Minus        {...props} color={colors.severity.media} />;
}

/* ─── Status → cor ──────────────────────────────────────────────────────── */
function statusColor(status) {
  if (status === 'online')   return colors.severity.baixa;   // verde
  if (status === 'degraded') return colors.severity.media;   // âmbar
  return colors.severity.alta;                                // vermelho
}

/* ─── Card de fonte de API ──────────────────────────────────────────────── */
function ApiCard({ source }) {
  const col = statusColor(source.status);
  return (
    <div style={{
      padding:      spacing.md,
      borderRadius: radius.md,
      border:       `1px solid ${colors.border.default}`,
      borderLeft:   `3px solid ${col}`,
      background:   'rgba(10,15,30,0.4)',
      marginBottom: spacing.sm,
    }}>
      {/* Nome + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
        <span style={{ fontSize: typography.size.sm, fontFamily: typography.family.body, fontWeight: typography.weight.semibold, color: colors.text.primary }}>
          {source.name}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: typography.size.xs, fontFamily: typography.family.mono, color: col }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background:  col,
            boxShadow:   `0 0 6px ${col}`,
            animation:   source.status === 'online' ? 'status-pulse 2s ease-in-out infinite' : 'none',
          }} />
          {source.status.toUpperCase().replace('_', ' ')}
        </span>
      </div>

      {/* Descrição */}
      <p style={{ margin: `0 0 ${spacing.sm}`, fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.body, lineHeight: 1.5 }}>
        {source.description}
      </p>

      {/* Latência + última sync */}
      <div style={{ display: 'flex', gap: spacing.md }}>
        <div>
          <span style={{ fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, display: 'block' }}>Latência</span>
          <span style={{ fontSize: typography.size.sm, color: colors.accent.cyan, fontFamily: typography.family.mono, fontWeight: typography.weight.medium }}>
            {source.latency != null ? `${source.latency}ms` : '—'}
          </span>
        </div>
        <div>
          <span style={{ fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, display: 'block' }}>Última sync</span>
          <span style={{ fontSize: typography.size.sm, color: colors.text.secondary, fontFamily: typography.family.mono }}>
            {source.lastSync ?? '—'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Card de indicador ambiental ───────────────────────────────────────── */
function EnvCard({ indicator }) {
  const col = SEVERITY_META[indicator.severity]?.color ?? colors.accent.cyan;
  return (
    <div style={{
      padding:      spacing.md,
      borderRadius: radius.md,
      border:       `1px solid ${colors.border.default}`,
      background:   'rgba(10,15,30,0.4)',
      marginBottom: spacing.sm,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {indicator.label}
          </span>
          <span style={{ fontSize: typography.size['2xl'], fontFamily: typography.family.mono, fontWeight: typography.weight.bold, color: col }}>
            {indicator.value}
          </span>
        </div>
        <TrendIcon trend={indicator.trend} />
      </div>
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────────────────────── */
export default function MonitoringPanel({ onClose }) {
  const [data, setData] = useState({
    apiSources:    API_SOURCES,
    envIndicators: ENV_INDICATORS,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/monitoring', { signal: controller.signal })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then(({ apiSources, envIndicators }) => {
        setData({ apiSources, envIndicators });
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          console.error('[MonitoringPanel]', err);
          // Mantém dados mock do estado inicial
        }
      });

    return () => controller.abort();
  }, []);

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
              Monitoramento
            </h2>
            <p style={{ margin: 0, fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, marginTop: '2px' }}>
              {data.apiSources.length} fontes · todos operacionais
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

      {/* Conteúdo com scroll */}
      <div style={{
        flex:       1,
        overflowY:  'auto',
        padding:    spacing.md,
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.accent.cyanDim} transparent`,
      }}>
        <p style={{ margin: `0 0 ${spacing.sm}`, fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Fontes de Dados
        </p>
        {data.apiSources.map((s) => <ApiCard key={s.name} source={s} />)}

        <p style={{ margin: `${spacing.md} 0 ${spacing.sm}`, fontSize: typography.size.xs, color: colors.text.muted, fontFamily: typography.family.mono, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Indicadores Ambientais — NASA FIRMS
        </p>
        {data.envIndicators.map((ind) => <EnvCard key={ind.label} indicator={ind} />)}
      </div>
    </motion.aside>
  );
}
