'use client';

/**
 * useOutbreakData — Controllus
 *
 * Busca surtos epidêmicos do endpoint /api/outbreaks.
 *
 * Estratégia de loading:
 *  - Estado inicial: MOCK_OUTBREAKS (globo renderiza imediatamente, sem tela em branco)
 *  - Após fetch bem-sucedido: substitui pelos dados reais da API
 *  - Em caso de erro: mantém MOCK_OUTBREAKS e seta `error`
 */

import { useState, useEffect } from 'react';
import { MOCK_OUTBREAKS }       from '@/lib/constants';

/**
 * @returns {{
 *   outbreaks:  object[],   Lista de OutbreakPoint
 *   isLive:     boolean,    true quando usando dados reais da API
 *   error:      string|null Mensagem de erro (não-fatal)
 * }}
 */
export function useOutbreakData() {
  const [outbreaks, setOutbreaks] = useState(MOCK_OUTBREAKS);
  const [isLive,    setIsLive]    = useState(false);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/outbreaks', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(({ outbreaks: data, source }) => {
        if (data?.length) {
          setOutbreaks(data);
          setIsLive(source !== 'mock');
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('[useOutbreakData]', err);
        setError('Usando dados locais — API indisponível.');
        // Mantém MOCK_OUTBREAKS do estado inicial
      });

    return () => controller.abort();
  }, []);

  return { outbreaks, isLive, error };
}
