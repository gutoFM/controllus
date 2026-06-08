'use client';

import { colors, typography, spacing, glass } from '@/lib/tokens';
import LogoMark from '@/components/ui/LogoMark';
import MenuSection from '@/components/Menu/MenuSection';
import { MENU_ITEMS } from '@/lib/constants';

/**
 * Navbar — barra superior glassmorphism com logo, menu e status do sistema.
 *
 * @param {string|null} activeNav   - Seção ativa do menu
 * @param {Function}    onNav       - Callback ao clicar num item (toggle)
 */
export default function Navbar({ activeNav, onNav }) {
  return (
    <header
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        zIndex:          10,
        height:          '60px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        padding:         `0 ${spacing.xl}`,
        background:           'rgba(5, 10, 24, 0.15)',
        backdropFilter:       'blur(28px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
        borderBottom:         `1px solid rgba(255,255,255,0.05)`,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        <LogoMark size={22} />
        <span
          style={{
            fontFamily:    typography.family.brand,
            fontSize:      '19px',
            fontWeight:    typography.weight.black,
            color:         colors.accent.cyan,
            letterSpacing: '2px',
            textShadow:    `0 0 18px rgba(0,212,255,0.45)`,
            userSelect:    'none',
          }}
        >
          CONTROLLUS
        </span>
      </div>

      {/* Menu central */}
      <nav
        style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}
        aria-label="Navegação principal"
      >
        {MENU_ITEMS.map((item) => (
          <MenuSection
            key={item}
            label={item}
            isActive={activeNav === item}
            onClick={() => onNav(item)}
          />
        ))}
      </nav>

      {/* Status do sistema */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        <span
          className="status-dot"
          style={{
            width:        8,
            height:       8,
            borderRadius: '50%',
            background:   '#00FF88',
            boxShadow:    '0 0 8px #00FF88',
            flexShrink:   0,
          }}
        />
        <span
          style={{
            fontFamily:    typography.family.mono,
            fontSize:      typography.size.xs,
            color:         colors.text.muted,
            letterSpacing: '0.05em',
          }}
        >
          Sistema Operacional
        </span>
      </div>
    </header>
  );
}
