/**
 * nasaFirmsService — Controllus
 *
 * Consome a NASA FIRMS API (Fire Information for Resource Management System).
 * Docs: https://firms.modaps.eosdis.nasa.gov/api/
 *
 * Requer NASA_API_KEY — lida de nasaApiConfig (nunca de process.env direto).
 * Executado APENAS em API Routes (servidor).
 */

import { nasaApiConfig } from '@/config/nasaApi.config';
import { logError }       from '@/utils/errors';

const TIMEOUT_MS = 6000;
const SENSOR     = 'VIIRS_NOAA20_NRT'; // Near Real-Time

/* ─── Fetch com timeout ─────────────────────────────────────────────────── */
async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/* ─── API pública ───────────────────────────────────────────────────────── */

/**
 * Verifica disponibilidade da NASA FIRMS e retorna contagem de focos ativos.
 * Usa o endpoint de país (BRA, 1 dia) como proxy de saúde — payload pequeno.
 *
 * @returns {Promise<{ status: string, latency: number|null, hotspotCount: number }>}
 */
export async function checkHealth() {
  if (!nasaApiConfig.apiKey) {
    return { status: 'sem_chave', latency: null, hotspotCount: 0 };
  }

  const url   = `${nasaApiConfig.baseUrl}/country/csv/${nasaApiConfig.apiKey}/${SENSOR}/BRA/1`;
  const start = Date.now();

  try {
    const res = await fetchWithTimeout(url);
    const latency = Date.now() - start;

    if (!res.ok) {
      return { status: res.status === 400 ? 'chave_inválida' : 'degraded', latency, hotspotCount: 0 };
    }

    const csv  = await res.text();
    // Conta linhas de dados (desconta cabeçalho e linhas vazias)
    const rows = csv.split('\n').filter((l) => l.trim() && !l.startsWith('latitude'));
    return { status: 'online', latency, hotspotCount: rows.length };
  } catch (err) {
    logError('nasaFirmsService.checkHealth', err);
    return { status: 'offline', latency: null, hotspotCount: 0 };
  }
}

/**
 * Retorna dados ambientais agregados (focos de calor + metadados de área).
 * Prioriza dado real da NASA FIRMS; retorna valores mock em caso de falha.
 *
 * @returns {Promise<Array<{ label, value, trend, severity }>>}
 */
export async function fetchEnvData() {
  // Fallback usado caso a API falhe ou não haja chave configurada
  const MOCK_ENV = [
    { label: 'Focos de Calor Ativos', value: '18.426', trend: 'up',   severity: 'alta'  },
    { label: 'Área Monitorada',        value: '511 Mkm²', trend: 'flat', severity: 'media' },
    { label: 'Alertas 24h',            value: '1.203',   trend: 'down', severity: 'baixa' },
  ];

  if (!nasaApiConfig.apiKey) return MOCK_ENV;

  try {
    const health = await checkHealth();
    if (health.status !== 'online') return MOCK_ENV;

    // Usa contagem real de focos do Brasil como proxy para indicador global
    const count = health.hotspotCount;
    return [
      {
        label:    'Focos de Calor Ativos (BRA/24h)',
        value:    count.toLocaleString('pt-BR'),
        trend:    count > 200 ? 'up' : 'down',
        severity: count > 500 ? 'alta' : count > 100 ? 'media' : 'baixa',
      },
      MOCK_ENV[1],
      MOCK_ENV[2],
    ];
  } catch (err) {
    logError('nasaFirmsService.fetchEnvData', err);
    return MOCK_ENV;
  }
}
