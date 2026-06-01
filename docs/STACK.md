# Stack Tecnológica — Controllus

---

## Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 14.x (App Router) | Framework full-stack |
| React | 18.x | UI |
| JavaScript | ES2022+ | Linguagem — sem TypeScript |
| Tailwind CSS | 3.x | Estilização |
| globe.gl | latest | Globo 3D interativo (WebGL / Three.js) |
| Framer Motion | 10.x | Animações (modal, transições) |
| Lucide React | latest | Ícones |

---

## Backend (API Routes — Next.js)

| Tecnologia | Uso |
|---|---|
| Next.js API Routes | Endpoints do servidor — proxy para APIs externas |
| Azure Key Vault | Secrets das APIs ficam server-side (nunca expostos ao browser) |

---

## Infraestrutura

| Tecnologia | Uso |
|---|---|
| Azure App Service | Hospedagem (Node.js 20, Linux) |
| Azure Key Vault | Armazenamento seguro de secrets |
| Azure Application Insights | Telemetria e monitoramento |
| GitHub Actions | CI/CD — deploy automático na `main` |

---

## APIs Externas

| API | Dados | Autenticação | Camada |
|---|---|---|---|
| ReliefWeb API | Surtos ativos e alertas globais | Sem chave | API Route |
| WHO GHO API | Histórico de doenças por país | Sem chave | API Route |
| NASA FIRMS API | Focos de calor e monitoramento ambiental | Chave gratuita (Key Vault) | API Route |

> Todas as chamadas às APIs externas passam pelas API Routes do Next.js — o browser nunca chama as APIs diretamente.

---

## Dependências Principais

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "globe.gl": "latest",
    "framer-motion": "10.x",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "tailwindcss": "3.x",
    "postcss": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "eslint-config-next": "14.x"
  }
}
```

---

## Comandos

```bash
npm install          # instalar dependências
npm run dev          # desenvolvimento (localhost:3000)
npm run build        # build de produção
npm run start        # produção local
npm run lint         # verificar código
```

---

## Variáveis de Ambiente

```bash
# .env.local (nunca commitar)
NASA_API_KEY=sua_chave_aqui        # sem NEXT_PUBLIC_ — fica apenas no servidor
```
