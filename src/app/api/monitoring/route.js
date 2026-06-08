/**
 * GET /api/monitoring
 *
 * Retorna o status de saúde das três fontes de dados e os indicadores ambientais.
 * Executa os health checks em paralelo com timeout individual por serviço.
 */

import { checkHealth as checkReliefWeb }  from '@/services/reliefWebService';
import { checkHealth as checkWHO }        from '@/services/whoService';
import { checkHealth as checkFIRMS, fetchEnvData } from '@/services/nasaFirmsService';
import { errorResponse } from '@/utils/errors';
import { API_SOURCES, ENV_INDICATORS } from '@/lib/constants';

/* ─── Descrições estáticas das fontes ───────────────────────────────────── */
const SOURCE_DESCRIPTIONS = {
  ReliefWeb:   API_SOURCES.find((s) => s.name === 'ReliefWeb')?.description  ?? '',
  'WHO GHO':   API_SOURCES.find((s) => s.name === 'WHO GHO')?.description   ?? '',
  'NASA FIRMS': API_SOURCES.find((s) => s.name === 'NASA FIRMS')?.description ?? '',
};

function nowUtc() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

export async function GET() {
  try {
    // Executa os três health checks em paralelo
    const [rw, who, firms] = await Promise.all([
      checkReliefWeb(),
      checkWHO(),
      checkFIRMS(),
    ]);

    const envIndicators = await fetchEnvData();

    const apiSources = [
      {
        name:        'ReliefWeb',
        status:      rw.status,
        latency:     rw.latency,
        lastSync:    nowUtc(),
        description: SOURCE_DESCRIPTIONS.ReliefWeb,
      },
      {
        name:        'WHO GHO',
        status:      who.status,
        latency:     who.latency,
        lastSync:    nowUtc(),
        description: SOURCE_DESCRIPTIONS['WHO GHO'],
      },
      {
        name:        'NASA FIRMS',
        status:      firms.status,
        latency:     firms.latency,
        lastSync:    nowUtc(),
        description: SOURCE_DESCRIPTIONS['NASA FIRMS'],
      },
    ];

    return Response.json({
      apiSources,
      envIndicators,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    return errorResponse('GET /api/monitoring', err);
  }
}
