# Padrões de Código e Segurança — Controllus

---

## Nomenclatura

| Tipo | Convenção | Exemplo |
|---|---|---|
| Componentes | PascalCase | `GlobeView.jsx`, `OutbreakModal.jsx` |
| Funções / Variáveis | camelCase | `handlePointClick`, `outbreakData` |
| Constantes | UPPER_SNAKE_CASE | `MAX_POINTS_DISPLAYED` |
| Hooks customizados | `use` + camelCase | `useOutbreakData`, `useGlobeConfig` |
| Services | camelCase + `Service` | `reliefWebService.js` |
| Configs | camelCase + `Config` | `nasaApi.config.js` |
| API Routes | kebab-case (pasta) | `app/api/outbreaks/route.js` |

---

## Estrutura Padrão de Componente

```jsx
// 1. Imports externos
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

// 2. Imports internos — componentes → hooks → services → lib
import { useOutbreakData } from '@/hooks/useOutbreakData';
import { colors, spacing } from '@/lib/tokens';

// 3. Constantes locais
const ANIMATION_DURATION = 0.3;

// 4. Componente
export default function OutbreakModal({ point, onClose }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    loadDetail();
  }, [point.id]);

  const loadDetail = async () => {
    try {
      // ...
    } catch (error) {
      console.error('[OutbreakModal.loadDetail]', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: ANIMATION_DURATION }}
    >
      {/* conteúdo */}
    </motion.div>
  );
}
```

---

## Estrutura Padrão de API Route

```js
// src/app/api/outbreaks/route.js

export async function GET(request) {
  try {
    const data = await reliefWebService.getActiveOutbreaks();
    return Response.json({ data });
  } catch (error) {
    console.error('[GET /api/outbreaks]', error);
    return Response.json(
      { error: 'Não foi possível carregar os dados.' },
      { status: 500 }
    );
  }
}
```

---

## Regras de Hooks

**NUNCA** chamar hooks condicionalmente:

```jsx
// ❌
const data = isActive ? useOutbreakData() : null;

// ✅
const data = useOutbreakData({ enabled: isActive });
```

---

## Imports — Alias

Usar sempre o alias `@/` configurado no `jsconfig.json`:

```js
// ❌  import { colors } from '../../lib/tokens';
// ✅  import { colors } from '@/lib/tokens';
```

---

## globe.gl — SSR

O globe.gl usa WebGL e não funciona no servidor. Import dinâmico obrigatório:

```jsx
import dynamic from 'next/dynamic';

const GlobeView = dynamic(() => import('@/components/Globe/GlobeView'), {
  ssr: false,
  loading: () => <GlobeLoader />,
});
```

---

## Segurança

### Credenciais e Segredos

**NUNCA** expor chaves de API, tokens ou senhas no código-fonte ou em variáveis commitadas.

```js
// ❌ ERRADO — chave hardcoded
const apiKey = 'abc123xyz';

// ❌ ERRADO — variável com NEXT_PUBLIC_ fica exposta no browser
const key = process.env.NEXT_PUBLIC_NASA_API_KEY;

// ✅ CORRETO — sem prefixo, acessada apenas em API Routes (servidor)
const key = process.env.NASA_API_KEY;
```

**Fluxo obrigatório:**
```
.env.local (no .gitignore)
        ↓
src/config/*.config.js (valida e exporta objeto)
        ↓
src/app/api/**/route.js (API Route — servidor)
        ↓
src/services/*.js (consome a API Route via fetch)
        ↓
Componente React (nunca acessa APIs externas diretamente)
```

**Nomenclatura de variáveis de ambiente:**
- `NASA_API_KEY` — sem prefixo, server-side apenas (API Routes)
- `NEXT_PUBLIC_*` — **proibido** para chaves sensíveis (fica exposto no bundle do browser)

---

### XSS — Cross-Site Scripting

**NUNCA** renderizar HTML arbitrário vindo de APIs externas:

```jsx
// ❌ ERRADO
<div dangerouslySetInnerHTML={{ __html: apiResponse.description }} />

// ✅ CORRETO — texto puro
<p>{apiResponse.description}</p>
```

---

### Headers de Segurança (Next.js)

Configurar em `next.config.js`:

```js
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://unpkg.com",
      "connect-src 'self'",
    ].join('; '),
  },
];
```

> `connect-src 'self'` — o browser só fala com o próprio Next.js. As APIs externas são chamadas pelas API Routes no servidor.

---

### Validação de Dados de APIs Externas

Validar defensivamente nas API Routes antes de retornar ao frontend:

```js
// src/app/api/outbreaks/route.js
function mapToOutbreakPoint(raw) {
  if (!raw || typeof raw !== 'object') return null;
  if (!raw.id || !raw.title) return null;

  return {
    id: String(raw.id),
    title: String(raw.title),
    lat: Number(raw.lat) || 0,
    lng: Number(raw.lng) || 0,
    severity: ['low', 'medium', 'high', 'critical'].includes(raw.severity)
      ? raw.severity
      : 'low',
  };
}
```

---

### Erros — O que NUNCA expor ao usuário

```js
// ❌ ERRADO — expõe detalhes internos
catch (error) {
  return Response.json({ error: error.message }, { status: 500 });
}

// ✅ CORRETO — log técnico + mensagem genérica
catch (error) {
  console.error('[GET /api/outbreaks]', error);
  return Response.json(
    { error: 'Não foi possível carregar os dados.' },
    { status: 500 }
  );
}
```

---

### .gitignore — Arquivos que NUNCA devem ser commitados

```gitignore
.env.local
.env.*.local
node_modules/
.next/
out/
.DS_Store
Thumbs.db
```

---

### Tabela — O que NUNCA fazer

| Proibido | Motivo |
|---|---|
| Chave de API hardcoded | Exposição em repositório público |
| `NEXT_PUBLIC_` em chaves sensíveis | Exposta no bundle do browser |
| Componente chamando API externa diretamente | Viola o fluxo servidor → cliente |
| `dangerouslySetInnerHTML` sem sanitização | Vulnerabilidade XSS |
| Commitar `.env.local` | Exposição de credenciais |
| Expor `error.message` ao usuário | Vaza detalhes internos |
