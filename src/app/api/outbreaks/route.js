/**
 * GET /api/outbreaks
 *
 * Retorna os surtos epidêmicos ativos.
 * Fonte primária: ReliefWeb API (dados reais).
 * Fallback: MOCK_OUTBREAKS (dados locais).
 */

import { fetchActiveEpidemics } from '@/services/reliefWebService';
import { mapReliefWebToOutbreak } from '@/utils/mappers';
import { errorResponse, logError } from '@/utils/errors';
import { MOCK_OUTBREAKS } from '@/lib/constants';

export async function GET() {
  try {
    const rawItems = await fetchActiveEpidemics();

    if (!rawItems.length) {
      return Response.json({ outbreaks: MOCK_OUTBREAKS, source: 'mock' });
    }

    const outbreaks = rawItems
      .map(mapReliefWebToOutbreak)
      // Filtra itens sem coordenadas válidas
      .filter((o) => o.lat !== 0 || o.lng !== 0);

    // Se o mapeamento não produziu resultados úteis, usa mock
    if (!outbreaks.length) {
      return Response.json({ outbreaks: MOCK_OUTBREAKS, source: 'mock' });
    }

    return Response.json({
      outbreaks,
      source:      'reliefweb',
      fetchedAt:   new Date().toISOString(),
      total:       outbreaks.length,
    });
  } catch (err) {
    logError('GET /api/outbreaks', err);
    // Fallback transparente ao cliente — retorna mock sem erro 500
    return Response.json({ outbreaks: MOCK_OUTBREAKS, source: 'mock' });
  }
}
