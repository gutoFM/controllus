'use client';

import { useEffect, useRef } from 'react';
import { SEVERITY_META, colors } from '@/lib/tokens';
import { GLOBE_CONFIG, SEV_RANK } from '@/lib/constants';

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function hexToRgbStr(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ].join(',');
}

function buildAmbientPoints(count) {
  const pts = [];
  let seed = 1337;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < count; i++) {
    pts.push({ type: 'ambient', lat: rnd() * 150 - 75, lng: rnd() * 360 - 180,
               color: 'rgba(0,212,255,0.28)', alt: 0.004, radius: 0.11 });
  }
  return pts;
}

function calcAlt(outbreak, isSelected) {
  const base = 0.02 + Math.min(0.2, Math.log10(outbreak.cases + 10) / 28) + SEV_RANK[outbreak.severity] * 0.012;
  return isSelected ? base + 0.04 : base;
}

const AMBIENT_PTS = buildAmbientPoints(GLOBE_CONFIG.ambientPoints);

/* ─── Singleton do script UMD ────────────────────────────────────────────── */
// Mantemos uma única Promise para o carregamento do script, evitando carregamentos duplicados
// mesmo com o double-invocation do StrictMode do React 18.
let globeScriptPromise = null;

function loadGlobeScript() {
  if (globeScriptPromise) return globeScriptPromise;

  globeScriptPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') { reject(new Error('SSR')); return; }
    if (window.Globe) { resolve(window.Globe); return; }

    const script = document.createElement('script');
    script.src = '/lib/globe.gl.min.js';
    script.onload  = () => resolve(window.Globe);
    script.onerror = () => {
      globeScriptPromise = null; // permite retry em caso de falha
      reject(new Error('[GlobeView] Falha ao carregar globe.gl'));
    };
    document.head.appendChild(script);
  });

  return globeScriptPromise;
}

/* ─── Componente ────────────────────────────────────────────────────────── */

export default function GlobeView({ outbreaks, selectedId, onSelect }) {
  const elRef      = useRef(null);
  const globeRef   = useRef(null);
  const selectRef  = useRef(onSelect);
  selectRef.current = onSelect;

  /* ── Inicializa o globo uma única vez ───────────────────────────────── */
  useEffect(() => {
    // Evita re-inicialização (StrictMode monta/desmonta em dev)
    if (globeRef.current) return;

    loadGlobeScript().then((Globe) => {
      // Checagem pós-async: elemento pode ter sido desmontado
      if (!elRef.current || globeRef.current) return;

      const globe = Globe()(elRef.current)
        .globeImageUrl(GLOBE_CONFIG.globeImageUrl)
        .bumpImageUrl(GLOBE_CONFIG.bumpImageUrl)
        .backgroundImageUrl(GLOBE_CONFIG.backgroundImageUrl)
        .backgroundColor(GLOBE_CONFIG.backgroundColor)
        .atmosphereColor(GLOBE_CONFIG.atmosphereColor)
        .atmosphereAltitude(GLOBE_CONFIG.atmosphereAltitude)
        .showGraticules(true)
        .pointLat('lat').pointLng('lng')
        .pointColor('color').pointAltitude('alt')
        .pointRadius('radius').pointResolution(10)
        .pointsMerge(false)
        .onPointClick((pt) => { if (pt?.type === 'outbreak') selectRef.current(pt.id); })
        .ringLat('lat').ringLng('lng')
        .ringColor((d) => (t) => `rgba(${d.rgb},${(1 - t).toFixed(3)})`)
        .ringMaxRadius('maxR').ringPropagationSpeed(2.2).ringRepeatPeriod(750)
        .width(window.innerWidth).height(window.innerHeight);

      const controls = globe.controls();
      controls.enableZoom = false;
      controls.enablePan  = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = GLOBE_CONFIG.autoRotateSpeed;

      globe.pointOfView(
        { lat: GLOBE_CONFIG.initialLat, lng: GLOBE_CONFIG.initialLng, altitude: GLOBE_CONFIG.initialAltitude },
        0,
      );

      globeRef.current = globe;
    }).catch(console.error);

    const onResize = () => { globeRef.current?.width(window.innerWidth).height(window.innerHeight); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Pontos (surtos + ambientais) ────────────────────────────────────── */
  useEffect(() => {
    if (!globeRef.current) return;
    const pts = outbreaks.map((o) => {
      const col = SEVERITY_META[o.severity]?.color ?? colors.accent.cyan;
      const sel = o.id === selectedId;
      return { type: 'outbreak', id: o.id, lat: o.lat, lng: o.lng,
               color: col, rgb: hexToRgbStr(col),
               alt: calcAlt(o, sel), radius: sel ? 0.78 : 0.42 };
    });
    globeRef.current.pointsData([...AMBIENT_PTS, ...pts]);
  }, [outbreaks, selectedId]);

  /* ── Anel pulsante + câmera ──────────────────────────────────────────── */
  useEffect(() => {
    if (!globeRef.current) return;
    const sel = outbreaks.find((o) => o.id === selectedId);
    if (!sel) {
      globeRef.current.ringsData([]);
      // Volta à posição inicial quando nenhum surto está selecionado
      globeRef.current.pointOfView(
        { lat: GLOBE_CONFIG.initialLat, lng: GLOBE_CONFIG.initialLng, altitude: GLOBE_CONFIG.initialAltitude },
        GLOBE_CONFIG.flyDuration,
      );
      return;
    }
    const col = SEVERITY_META[sel.severity]?.color ?? colors.accent.cyan;
    globeRef.current.ringsData([{ lat: sel.lat, lng: sel.lng, rgb: hexToRgbStr(col), maxR: 5 }]);
    globeRef.current.pointOfView({ lat: sel.lat, lng: sel.lng, altitude: GLOBE_CONFIG.selectedAltitude }, GLOBE_CONFIG.flyDuration);
  }, [selectedId, outbreaks]);

  /* ── Rotação ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!globeRef.current) return;
    const c = globeRef.current.controls();
    c.autoRotate      = !selectedId;
    c.autoRotateSpeed = selectedId ? 0 : GLOBE_CONFIG.autoRotateSpeed;
  }, [selectedId]);

  return <div ref={elRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} aria-hidden="true" />;
}
