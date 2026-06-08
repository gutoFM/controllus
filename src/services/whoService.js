/**
 * whoService — Controllus
 *
 * Consome a API pública da WHO GHO (Global Health Observatory).
 * Docs: https://www.who.int/data/gho/info/gho-odata-api
 *
 * Sem autenticação necessária.
 * Executado APENAS em API Routes (servidor).
 */

import { logError } from '@/utils/errors';

const BASE_URL   = 'https://ghoapi.azureedge.net/api';
const TIMEOUT_MS = 6000;

/* ─── Indicadores relevantes (doença → código GHO) ──────────────────────── */
const INDICATORS = {
  cholera:  'CHOLERA_0000000001',
  measles:  'WHS4_544',
  dengue:   'DENGUE_CASES',
  polio:    'WHS4_100',
};

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
 * Busca os valores mais recentes (últimos 5 anos) de um indicador GHO por país.
 * @param {string} indicatorCode  Ex: 'CHOLERA_0000000001'
 * @returns {Promise<object[]>}   Array de registros `value` da API GHO
 */
export async function fetchIndicator(indicatorCode) {
  const url = `${BASE_URL}/${indicatorCode}?$filter=TimeDim ge 2020&$orderby=TimeDim desc&$top=100`;
  const res = await fetchWithTimeout(url);

  if (!res.ok) {
    throw new Error(`WHO GHO respondeu ${res.status} para ${indicatorCode}`);
  }

  const json = await res.json();
  return json?.value ?? [];
}

/**
 * Busca histórico de cólera como dado representativo de doenças epidêmicas.
 * @returns {Promise<object[]>}
 */
export async function fetchDiseaseHistory() {
  return fetchIndicator(INDICATORS.cholera);
}

/**
 * Verifica disponibilidade da WHO GHO e retorna latência.
 * @returns {Promise<{ status: string, latency: number|null }>}
 */
export async function checkHealth() {
  const start = Date.now();
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/Indicator?$top=1`);
    const latency = Date.now() - start;
    return { status: res.ok ? 'online' : 'degraded', latency };
  } catch (err) {
    logError('whoService.checkHealth', err);
    return { status: 'offline', latency: null };
  }
}
