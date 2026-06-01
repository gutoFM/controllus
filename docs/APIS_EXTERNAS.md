# APIs Externas — Controllus

> Todas as chamadas às APIs externas são feitas pelas **API Routes do Next.js** (servidor).
> O browser nunca acessa essas APIs diretamente — apenas consome `/api/*` do próprio Next.js.

---

## Fluxo Geral

```
Browser (React)
      ↓  fetch('/api/outbreaks')
API Route Next.js  (src/app/api/outbreaks/route.js)
      ↓  fetch('https://api.reliefweb.int/...')
ReliefWeb API
      ↓  resposta bruta
API Route  →  mapeia para OutbreakPoint  →  retorna JSON
      ↓
Browser exibe no globo
```

---

## Modelo de Dados — OutbreakPoint

Todas as APIs são normalizadas para este formato pelo `src/utils/mappers.js`:

```js
// Exemplo de objeto OutbreakPoint
{
  id: 'rw-12345',
  title: 'Dengue Outbreak — Brazil',
  country: 'Brazil',
  countryCode: 'BR',
  lat: -15.77,
  lng: -47.92,
  severity: 'high',         // 'low' | 'medium' | 'high' | 'critical'
  disease: 'Dengue',
  date: '2026-05-10',
  description: 'Aumento de casos na região Centro-Oeste...',
  source: 'reliefweb',      // 'reliefweb' | 'who' | 'nasa'
  url: 'https://...',       // link para a fonte original
}
```

---

## ReliefWeb API

**URL base:** `https://api.reliefweb.int/v1`
**Autenticação:** sem chave
**Uso:** Surtos Ativos e Alertas
**API Route interna:** `GET /api/outbreaks`

### Endpoint

```
POST https://api.reliefweb.int/v1/reports?appname=controllus
```

### Service

```js
// src/services/reliefWebService.js
const BASE_URL = 'https://api.reliefweb.int/v1';

export async function getActiveOutbreaks() { ... }
export async function getAlerts() { ... }
```

---

## WHO GHO API

**URL base:** `https://ghoapi.azureedge.net/api`
**Autenticação:** sem chave
**Uso:** Histórico de doenças por país
**API Route interna:** `GET /api/history`

### Endpoints

```
GET /MALARIA_CASES          → casos de malária por país/ano
GET /DENGUE_CASES           → casos de dengue por país/ano
```

### Service

```js
// src/services/whoService.js
const BASE_URL = 'https://ghoapi.azureedge.net/api';

export async function getDiseaseHistory(indicator, countryCode) { ... }
export async function getCountryStats(countryCode) { ... }
```

---

## NASA FIRMS API

**URL base:** `https://firms.modaps.eosdis.nasa.gov/api`
**Autenticação:** chave gratuita — cadastro em firms.modaps.eosdis.nasa.gov
**Variável de ambiente:** `NASA_API_KEY` (server-side, sem `NEXT_PUBLIC_`)
**Uso:** Monitoramento ambiental
**API Route interna:** `GET /api/monitoring`

### Config

```js
// src/config/nasaApi.config.js
const nasaApiConfig = {
  apiKey:  process.env.NASA_API_KEY ?? '',
  baseUrl: 'https://firms.modaps.eosdis.nasa.gov/api',
};

export default nasaApiConfig;
```

### Service

```js
// src/services/nasaFirmsService.js
import nasaApiConfig from '@/config/nasaApi.config';

export async function getHotspots(area, days) {
  const url = `${nasaApiConfig.baseUrl}/area/csv/${nasaApiConfig.apiKey}/VIIRS_SNPP_NRT/${area}/${days}`;
  // ...
}
```

---

## API Route — Exemplo Completo

```js
// src/app/api/outbreaks/route.js
import { getActiveOutbreaks } from '@/services/reliefWebService';
import { mapToOutbreakPoints } from '@/utils/mappers';

export async function GET() {
  try {
    const raw = await getActiveOutbreaks();
    const data = raw.map(mapToOutbreakPoints).filter(Boolean);
    return Response.json({ data });
  } catch (error) {
    console.error('[GET /api/outbreaks]', error);
    return Response.json(
      { error: 'Não foi possível carregar os surtos.' },
      { status: 500 }
    );
  }
}
```
