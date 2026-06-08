'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { colors, typography, spacing, radius } from '@/lib/tokens';
import ModalHeader   from '@/components/Modal/ModalHeader';
import ModalStats    from '@/components/Modal/ModalStats';
import ModalTimeline from '@/components/Modal/ModalTimeline';

const PANEL_WIDTH = '380px';

/**
 * OutbreakModal — painel flutuante exibido ao selecionar um surto no globo.
 * Glassmorphism com borda ciano e glow. Não cobre a tela inteira.
 * Cabeçalho e rodapé fixos; conteúdo central rolável.
 *
 * @param {Object|null} outbreak - Surto selecionado (null = fechado)
 * @param {Function}    onClose  - Callback para fechar
 */
export default function OutbreakModal({ outbreak, onClose }) {
  return (
    <AnimatePresence>
      {outbreak && (
        <motion.aside
          key={outbreak.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position:        'fixed',
            top:             '76px',      // abaixo da navbar (60px + 16px margem)
            right:           spacing.lg,
            bottom:          '54px',      // acima da status bar
            width:           PANEL_WIDTH,
            zIndex:          20,
            display:         'flex',
            flexDirection:   'column',
            background:      'rgba(10, 15, 30, 0.85)',
            backdropFilter:  'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border:          `1px solid ${colors.border.accent}`,
            borderRadius:    radius.xl,
            boxShadow:       `0 12px 48px rgba(0,0,0,0.5), 0 0 28px rgba(0,212,255,0.15)`,
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes: ${outbreak.disease} em ${outbreak.country}`}
        >
          {/* Cabeçalho fixo */}
          <ModalHeader outbreak={outbreak} onClose={onClose} />

          {/* Conteúdo rolável */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <ModalStats    outbreak={outbreak} />
            <ModalTimeline timeline={outbreak.timeline} />
          </div>

          {/* Rodapé fixo */}
          <div
            style={{
              padding:      spacing.lg,
              borderTop:    `1px solid ${colors.border.default}`,
              flexShrink:   0,
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'space-between',
            }}
          >
            <a
              href={outbreak.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:     'inline-flex',
                alignItems:  'center',
                gap:         spacing.xs,
                fontFamily:  typography.family.body,
                fontSize:    typography.size.sm,
                fontWeight:  typography.weight.medium,
                color:       colors.accent.cyan,
                textDecoration: 'none',
              }}
            >
              Ver fonte completa
              <ExternalLink size={13} />
            </a>
            <span style={{ fontFamily: typography.family.mono, fontSize: '11px', color: colors.text.muted }}>
              Fonte: {outbreak.source}
            </span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
