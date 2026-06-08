/**
 * reliefWebService — Controllus
 *
 * Consome a API pública da ReliefWeb (OCHA/ONU) para obter surtos epidêmicos ativos.
 * Docs: https://apidoc.reliefweb.int/
 *
 * Sem autenticação necessária.
 * Executado APENAS em API Routes (servidor).
 */

import { logError } from '@/utils/errors';

const BASE_URL    = 'https://api.reliefweb.int/v2';
// Requer appname aprovado — cadastro gratuito em https://apidoc.reliefweb.int/parameters#appname
// Definir RELIEFWEB_APP_NAME no .env.local após cadastro
const APP_NAME    = process.env.RELIEFWEB_APP_NAME ?? '';
const TIMEOUT_MS  = 6000;

/* ─── Corpo da query POST ────────────────────────────────────────────────── */
const EPIDEMIC_QUERY = {
  filter: {
    operator: 'AND',
    conditions: [
      { field: 'type.name', value: 'Epidemic' },
    ],
  },
  fields: {
    include: [
      'name', 'status', 'alert_level',
      'date.created',
      'primary_country.name', 'primary_country.iso3', 'primary_country.location',
      'country.name', 'country.iso3', 'country.location',
      'description',
    ],
  },
  sort:  ['date.created:desc'],
  limit: 50,
};

/* ─── Fetch com timeout ─────────────────────────────────────────────────── */
async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/* ─── API pública ───────────────────────────────────────────────────────── */

/**
 * Retorna os surtos epidêmicos ativos da ReliefWeb.
 * @returns {Promise<object[]>}  Array de itens raw da API (campo `data`)
 * @throws {Error}              Em caso de falha de rede ou resposta não-OK
 */
export async function fetchActiveEpidemics() {
  if (!APP_NAME) {
    throw new Error('RELIEFWEB_APP_NAME não configurado — usando fallback local.');
  }
  const url = `${BASE_URL}/disasters?appname=${APP_NAME}`;
  const res = await fetchWithTimeout(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(EPIDEMIC_QUERY),
  });

  if (!res.ok) {
    throw new Error(`ReliefWeb respondeu ${res.status}`);
  }

  const json = await res.json();
  return json?.data ?? [];
}

/**
 * Verifica disponibilidade da ReliefWeb e retorna latência.
 * @returns {Promise<{ status: string, latency: number|null }>}
 */
export async function checkHealth() {
  if (!APP_NAME) return { status: 'sem_chave', latency: null };
  const start = Date.now();
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/disasters?appname=${APP_NAME}&limit=1`,
      { method: 'GET' },
    );
    const latency = Date.now() - start;
    return { status: res.ok ? 'online' : 'degraded', latency };
  } catch (err) {
    logError('reliefWebService.checkHealth', err);
    return { status: 'offline', latency: null };
  }
}
