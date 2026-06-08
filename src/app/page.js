'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

import GlobeLoader           from '@/components/Globe/GlobeLoader';
import Navbar                from '@/components/Menu/Navbar';
import StatusBar             from '@/components/Menu/StatusBar';
import OutbreakModal         from '@/components/Modal/OutbreakModal';
import ActiveOutbreaksPanel  from '@/components/panels/ActiveOutbreaksPanel';
import RegionsPanel          from '@/components/panels/RegionsPanel';
import MonitoringPanel       from '@/components/panels/MonitoringPanel';
import { useOutbreakData }   from '@/hooks/useOutbreakData';

const GlobeView = dynamic(
  () => import('@/components/Globe/GlobeView'),
  { ssr: false, loading: () => <GlobeLoader /> },
);

export default function Home() {
  const [selectedId, setSelectedId] = useState(null);
  const [activeNav,  setActiveNav]  = useState(null);

  const { outbreaks, isLive } = useOutbreakData();

  const selectedOutbreak = outbreaks.find((o) => o.id === selectedId) ?? null;

  const handleSelectOutbreak = (id) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  const handleNav = (item) => {
    setActiveNav((current) => (current === item ? null : item));
  };

  const handleClosePanel = () => setActiveNav(null);

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* Globo 3D — camada de fundo */}
      <GlobeView
        outbreaks={outbreaks}
        selectedId={selectedId}
        onSelect={handleSelectOutbreak}
      />

      {/* Vinheta de profundidade sobre o globo */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        1,
          pointerEvents: 'none',
          background:    'radial-gradient(ellipse at center, transparent 55%, rgba(5,10,24,0.55) 100%)',
        }}
      />

      {/* Navbar */}
      <Navbar activeNav={activeNav} onNav={handleNav} />

      {/* Painéis laterais */}
      <AnimatePresence>
        {activeNav === 'Surtos Ativos' && (
          <ActiveOutbreaksPanel
            key="active"
            title="Surtos Ativos"
            outbreaks={outbreaks}
            selectedId={selectedId}
            onSelect={handleSelectOutbreak}
            onClose={handleClosePanel}
          />
        )}

        {activeNav === 'Histórico' && (
          <ActiveOutbreaksPanel
            key="history"
            title="Histórico"
            outbreaks={outbreaks}
            selectedId={selectedId}
            onSelect={handleSelectOutbreak}
            onClose={handleClosePanel}
          />
        )}

        {activeNav === 'Regiões' && (
          <RegionsPanel
            key="regions"
            outbreaks={outbreaks}
            onSelect={handleSelectOutbreak}
            onClose={handleClosePanel}
          />
        )}

        {activeNav === 'Monitoramento' && (
          <MonitoringPanel
            key="monitoring"
            onClose={handleClosePanel}
          />
        )}
      </AnimatePresence>

      {/* Modal de detalhe do surto selecionado */}
      <OutbreakModal outbreak={selectedOutbreak} onClose={() => setSelectedId(null)} />

      <StatusBar isLive={isLive} outbreakCount={outbreaks.length} />

    </main>
  );
}
