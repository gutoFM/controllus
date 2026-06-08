/**
 * GET /api/history
 *
 * Retorna o histórico de doenças epidêmicas por país.
 * Fonte primária: WHO GHO API (indicadores de cólera como proxy de histórico).
 * Fallback: MOCK_OUTBREAKS com dados de 2025–2026.
 */

import { fetchDiseaseHistory } from '@/services/whoService';
import { logError }            from '@/utils/errors';
import { MOCK_OUTBREAKS }      from '@/lib/constants';

/**
 * Mapeia um registro GHO para um formato simples de histórico.
 * O WHO GHO não tem todos os campos do OutbreakPoint; retornamos
 * os campos disponíveis e zeramos o restante.
 */
function mapGHORecord(record) {
  return {
    id:          `who-${record.Id ?? Math.random().toString(36).slice(2)}`,
    country:     record.SpatialDim ?? 'Desconhecido',
    flag:        '🌍',
    code:        record.SpatialDim ?? 'XX',
    disease:     'Cólera',
    severity:    record.NumericValue > 10000 ? 'alta' : record.NumericValue > 1000 ? 'media' : 'baixa',
    date:        String(record.TimeDim ?? '—'),
    lat:         0,
    lng:         0,
    cases:       Math.round(record.NumericValue ?? 0),
    deaths:      0,
    regions:     1,
    description: `Casos de cólera registrados pela OMS em ${record.TimeDim ?? '—'}.`,
    source:      'WHO GHO',
    timeline:    [],
  };
}

export async function GET() {
  try {
    const records = await fetchDiseaseHistory();

    if (!records.length) {
      return Response.json({ outbreaks: MOCK_OUTBREAKS, source: 'mock' });
    }

    const outbreaks = records
      .filter((r) => r.NumericValue > 0)
      .map(mapGHORecord);

    if (!outbreaks.length) {
      return Response.json({ outbreaks: MOCK_OUTBREAKS, source: 'mock' });
    }

    return Response.json({
      outbreaks,
      source:    'who_gho',
      fetchedAt: new Date().toISOString(),
      total:     outbreaks.length,
    });
  } catch (err) {
    logError('GET /api/history', err);
    return Response.json({ outbreaks: MOCK_OUTBREAKS, source: 'mock' });
  }
}
