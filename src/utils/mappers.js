/**
 * Mapeadores de dados externos → modelo interno OutbreakPoint
 *
 * OutbreakPoint shape:
 * {
 *   id, country, flag, code (ISO2), disease, severity, date (string),
 *   lat, lng, cases, deaths, regions, description, source,
 *   timeline: [{ date, text }]
 * }
 */

/* ─── Tabela ISO3 → metadados do país ───────────────────────────────────── */
const COUNTRY_META = {
  // África
  AGO: { iso2: 'AO', lat: -11.20, lng:  17.87 },
  BDI: { iso2: 'BI', lat:  -3.38, lng:  29.92 },
  BEN: { iso2: 'BJ', lat:   9.31, lng:   2.31 },
  BFA: { iso2: 'BF', lat:  12.36, lng:  -1.53 },
  CAF: { iso2: 'CF', lat:   6.61, lng:  20.94 },
  CIV: { iso2: 'CI', lat:   7.54, lng:  -5.55 },
  CMR: { iso2: 'CM', lat:   3.85, lng:  11.50 },
  COD: { iso2: 'CD', lat:  -4.32, lng:  15.31 },
  COG: { iso2: 'CG', lat:  -0.23, lng:  15.83 },
  ETH: { iso2: 'ET', lat:   9.03, lng:  38.74 },
  GHA: { iso2: 'GH', lat:   7.95, lng:  -1.02 },
  GIN: { iso2: 'GN', lat:  11.75, lng: -15.61 },
  KEN: { iso2: 'KE', lat:  -0.02, lng:  37.91 },
  LBR: { iso2: 'LR', lat:   6.43, lng:  -9.43 },
  MDG: { iso2: 'MG', lat: -18.77, lng:  46.87 },
  MLI: { iso2: 'ML', lat:  17.57, lng:  -3.99 },
  MOZ: { iso2: 'MZ', lat: -18.67, lng:  35.53 },
  MRT: { iso2: 'MR', lat:  21.01, lng: -10.94 },
  NER: { iso2: 'NE', lat:  17.61, lng:   8.08 },
  NGA: { iso2: 'NG', lat:   9.08, lng:   8.68 },
  RWA: { iso2: 'RW', lat:  -1.94, lng:  30.06 },
  SDN: { iso2: 'SD', lat:  15.50, lng:  32.56 },
  SLE: { iso2: 'SL', lat:   8.46, lng: -11.78 },
  SOM: { iso2: 'SO', lat:   5.15, lng:  46.20 },
  SSD: { iso2: 'SS', lat:   4.85, lng:  31.57 },
  TCD: { iso2: 'TD', lat:  15.45, lng:  18.73 },
  TZA: { iso2: 'TZ', lat:  -6.37, lng:  34.89 },
  UGA: { iso2: 'UG', lat:   0.35, lng:  32.58 },
  ZMB: { iso2: 'ZM', lat: -13.13, lng:  27.85 },
  ZWE: { iso2: 'ZW', lat: -19.02, lng:  29.15 },
  // Américas
  BOL: { iso2: 'BO', lat: -16.29, lng: -63.59 },
  BRA: { iso2: 'BR', lat: -15.78, lng: -47.93 },
  CHL: { iso2: 'CL', lat: -38.74, lng: -72.59 },
  COL: { iso2: 'CO', lat:   4.57, lng: -74.30 },
  CUB: { iso2: 'CU', lat:  21.52, lng: -79.02 },
  ECU: { iso2: 'EC', lat:  -1.83, lng: -78.18 },
  GTM: { iso2: 'GT', lat:  15.78, lng: -90.23 },
  HTI: { iso2: 'HT', lat:  18.97, lng: -72.29 },
  HND: { iso2: 'HN', lat:  15.20, lng: -86.24 },
  MEX: { iso2: 'MX', lat:  23.63, lng:-102.55 },
  NIC: { iso2: 'NI', lat:  12.86, lng: -85.21 },
  PAN: { iso2: 'PA', lat:   8.99, lng: -79.52 },
  PER: { iso2: 'PE', lat: -12.05, lng: -77.04 },
  SLV: { iso2: 'SV', lat:  13.79, lng: -88.90 },
  USA: { iso2: 'US', lat:  39.83, lng: -98.58 },
  VEN: { iso2: 'VE', lat:   6.42, lng: -66.59 },
  // Ásia
  AFG: { iso2: 'AF', lat:  33.93, lng:  67.71 },
  BGD: { iso2: 'BD', lat:  23.81, lng:  90.41 },
  CHN: { iso2: 'CN', lat:  35.86, lng: 104.20 },
  IDN: { iso2: 'ID', lat:  -6.21, lng: 106.85 },
  IND: { iso2: 'IN', lat:  11.25, lng:  75.78 },
  IRN: { iso2: 'IR', lat:  32.43, lng:  53.69 },
  IRQ: { iso2: 'IQ', lat:  33.22, lng:  43.68 },
  KHM: { iso2: 'KH', lat:  12.57, lng: 104.99 },
  LAO: { iso2: 'LA', lat:  19.86, lng: 102.50 },
  LKA: { iso2: 'LK', lat:   7.87, lng:  80.77 },
  MMR: { iso2: 'MM', lat:  21.92, lng:  95.96 },
  MNG: { iso2: 'MN', lat:  46.86, lng: 103.85 },
  NPL: { iso2: 'NP', lat:  28.39, lng:  84.12 },
  PAK: { iso2: 'PK', lat:  30.38, lng:  69.35 },
  PHL: { iso2: 'PH', lat:  14.60, lng: 120.98 },
  THA: { iso2: 'TH', lat:  15.87, lng: 100.99 },
  VNM: { iso2: 'VN', lat:  14.06, lng: 108.28 },
  YEM: { iso2: 'YE', lat:  15.37, lng:  44.19 },
  // Oriente Médio
  JOR: { iso2: 'JO', lat:  30.59, lng:  36.24 },
  SAU: { iso2: 'SA', lat:  24.71, lng:  46.68 },
  SYR: { iso2: 'SY', lat:  34.80, lng:  38.99 },
  // Europa
  DEU: { iso2: 'DE', lat:  51.17, lng:  10.45 },
  FRA: { iso2: 'FR', lat:  43.70, lng:   7.27 },
  GBR: { iso2: 'GB', lat:  55.38, lng:  -3.44 },
  // Oceania
  PNG: { iso2: 'PG', lat:  -6.31, lng: 143.96 },
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/**
 * Gera emoji de bandeira a partir de código ISO2.
 * Ex: "BR" → "🇧🇷"
 */
export function iso2Flag(code) {
  if (!code || code.length !== 2) return '🌍';
  return code.toUpperCase().split('')
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join('');
}

/**
 * Extrai o nome da doença do título de um desastre ReliefWeb.
 * Ex: "Congo DR: Mpox Outbreak - Aug 2025" → "Mpox"
 */
export function extractDiseaseName(title) {
  if (!title) return 'Desconhecido';
  // Remove prefixo "País: "
  let name = title.includes(': ') ? title.split(': ').slice(1).join(': ') : title;
  // Remove sufixo " - Mês/Ano"
  name = name.replace(/\s*[-–]\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{4}).*/i, '');
  // Remove "(sigla)"
  name = name.replace(/\s*\([A-Z]+\)\s*$/, '');
  // Remove sufixo "Outbreak" ou "Disease"
  name = name.replace(/\s+(Outbreak|Disease)\s*$/i, '');
  return name.trim() || title.trim();
}

/**
 * Formata uma data ISO para "DD Mmm YYYY" em português.
 * Ex: "2025-08-14T00:00:00+00:00" → "14 Ago 2025"
 */
export function formatApiDate(isoString) {
  if (!isoString) return '—';
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  try {
    const d = new Date(isoString);
    return `${String(d.getUTCDate()).padStart(2,'0')} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  } catch {
    return isoString.slice(0, 10);
  }
}

/**
 * Mapeia o alert_level / status da ReliefWeb para severidade interna.
 */
function mapAlertToSeverity(alertLevel, status) {
  if (status === 'past')       return 'baixa';
  if (alertLevel === 'red')    return 'critica';
  if (alertLevel === 'orange') return 'alta';
  if (alertLevel === 'yellow') return 'media';
  return 'media';
}

/* ─── Mapper: ReliefWeb disaster → OutbreakPoint ────────────────────────── */

/**
 * @param {object} item  Elemento de `data[]` da resposta da ReliefWeb API
 * @returns {object}     OutbreakPoint
 */
export function mapReliefWebToOutbreak(item) {
  const f = item.fields ?? {};
  const pc = f.primary_country ?? (f.country?.[0] ?? {});
  const meta = COUNTRY_META[pc.iso3] ?? null;

  // lat/lng: preferir coordenadas da API, senão da tabela local
  const lat = pc.location?.lat ?? meta?.lat ?? 0;
  const lng = pc.location?.lon ?? meta?.lng ?? 0;
  const iso2 = meta?.iso2 ?? (pc.iso3 ? pc.iso3.substring(0, 2) : 'XX');

  return {
    id:          `rw-${item.id}`,
    country:     pc.name ?? 'Desconhecido',
    flag:        iso2Flag(iso2),
    code:        iso2,
    disease:     extractDiseaseName(f.name ?? ''),
    severity:    mapAlertToSeverity(f.alert_level, f.status),
    date:        formatApiDate(f.date?.created),
    lat,
    lng,
    cases:       0,
    deaths:      0,
    regions:     1,
    description: f.description ?? 'Surto registrado pela ReliefWeb/OCHA.',
    source:      'ReliefWeb',
    timeline:    [],
  };
}
