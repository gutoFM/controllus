'use client';

import { colors, typography, spacing, glass, radius } from '@/lib/tokens';

const SOURCES = ['ReliefWeb', 'WHO GHO', 'NASA FIRMS'];

export default function StatusBar({ isLive = false, outbreakCount = 0 }) {
  const now = new Date().toLocaleString('pt-BR', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <footer
      style={{
        position:        'fixed',
        bottom:          0,
        left:            0,
        right:           0,
        zIndex:          10,
        height:          '38px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        padding:         `0 ${spacing.xl}`,
        background:      glass.background,
        backdropFilter:  glass.backdropFilter,
        WebkitBackdropFilter: glass.backdropFilter,
        borderTop:       `1px solid ${colors.border.default}`,
      }}
    >
      {/* Última atualização */}
      <span style={{ fontFamily: typography.family.mono, fontSize: typography.size.xs, color: colors.text.muted }}>
        Última atualização: {now}
      </span>

      {/* Pílulas de fonte */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        {SOURCES.map((source) => (
          <span
            key={source}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '5px',
              fontFamily:   typography.family.mono,
              fontSize:     '11px',
              color:        colors.text.secondary,
              background:   'rgba(0,255,136,0.08)',
              border:       '1px solid rgba(0,255,136,0.2)',
              borderRadius: radius.full,
              padding:      '2px 10px',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 5px #00FF88' }} />
            {source}
          </span>
        ))}
      </div>

      {/* Total de eventos + badge LIVE/DEMO */}
      <span style={{ fontFamily: typography.family.mono, fontSize: typography.size.xs, color: colors.accent.cyan, display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        {outbreakCount} eventos monitorados
        <span style={{
          fontSize:     '10px',
          padding:      '1px 6px',
          borderRadius: radius.full,
          border:       `1px solid ${isLive ? 'rgba(0,255,136,0.4)' : 'rgba(148,163,184,0.3)'}`,
          color:        isLive ? '#00FF88' : colors.text.muted,
          letterSpacing: '0.06em',
        }}>
          {isLive ? 'LIVE' : 'DEMO'}
        </span>
      </span>
    </footer>
  );
}
