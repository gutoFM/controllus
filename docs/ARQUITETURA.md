# Arquitetura — Controllus

> Plataforma de inteligência epidemiológica global com visualização 3D via dados satelitais.

---

## Visão Geral

O Controllus é um dashboard web full-stack (Next.js) que consome APIs públicas de saúde e dados ambientais. O backend (API Routes) atua como proxy seguro entre o browser e as APIs externas, mantendo as chaves de acesso no servidor.

---

## Diagrama de Camadas

```
┌──────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │              INTERFACE (React / Next.js)             │   │
│   │                                                      │   │
│   │   ┌───────────────┐   ┌────────────────────────┐    │   │
│   │   │   GlobeView   │   │        Navbar          │    │   │
│   │   │  (globe.gl)   │   │  (4 seções do menu)    │    │   │
│   │   └──────┬────────┘   └────────────────────────┘    │   │
│   │          │                                           │   │
│   │   ┌──────▼──────────────────────────────────────┐   │   │
│   │   │         OutbreakModal (flutuante)            │   │   │
│   │   └─────────────────────────────────────────────┘   │   │
│   └──────────────────────┬───────────────────────────────┘   │
│                          │  fetch('/api/*')                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│              SERVIDOR (Next.js API Routes)                   │
│                                                              │
│   /api/outbreaks  → reliefWebService.js                      │
│   /api/history    → whoService.js                            │
│   /api/monitoring → nasaFirmsService.js                      │
│   /api/health     → status check                             │
└──────────────────────────┬───────────────────────────────────┘
                           │  fetch externo (com chaves seguras)
┌──────────────────────────▼───────────────────────────────────┐
│                     APIs EXTERNAS                            │
│                                                              │
│   ReliefWeb API   →  api.reliefweb.int        (sem chave)    │
│   WHO GHO API     →  ghoapi.azureedge.net     (sem chave)    │
│   NASA FIRMS API  →  firms.modaps.eosdis.nasa.gov            │
└──────────────────────────────────────────────────────────────┘
```

---

## Fluxo de Dados

```
1. Usuário abre o dashboard
        ↓
2. GlobeView renderiza o globo 3D (globe.gl)
        ↓
3. useOutbreakData() faz fetch para /api/outbreaks
        ↓
4. API Route consulta ReliefWeb, mapeia para OutbreakPoint[]
        ↓
5. Pontos são plotados no globo por lat/lng e severidade
        ↓
6. Usuário clica num ponto
        ↓
7. OutbreakModal exibe dados completos do evento
        ↓
8. Usuário navega pelo Menu (Surtos Ativos / Histórico / Regiões / Monitoramento)
        ↓
9. Seção selecionada dispara novo fetch → filtra/reorganiza o globo
```

---

## Decisões de Arquitetura

| Decisão | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack em um projeto, deploy único no Azure |
| Linguagem | JavaScript (sem TypeScript) | Velocidade de desenvolvimento, escopo acadêmico |
| Globo 3D | globe.gl | Abstração sobre Three.js, visual premium, fácil de usar |
| Estilização | Tailwind CSS + tokens.js | Produtividade + design system consistente |
| Animações | Framer Motion | Modal e transições com física natural |
| Ícones | Lucide React | Padrão do projeto Next.js |
| SSR do Globe | `dynamic(..., { ssr: false })` | globe.gl usa WebGL — não roda no servidor |
| APIs | Proxiadas via API Routes | Chaves ficam server-side, browser nunca acessa externas |
| Secrets | Azure Key Vault → GitHub Secrets → `.env` no App Service | Padrão SDTCC + segurança |

---

## Estrutura de Componentes

```
page.jsx
├── Navbar
│   └── MenuSection × 4 (Surtos Ativos / Histórico / Regiões / Monitoramento)
├── GlobeView (dynamic, ssr: false)
│   └── Pontos clicáveis por OutbreakPoint
└── OutbreakModal (condicional, Framer Motion)
    ├── ModalHeader
    ├── ModalStats
    └── ModalTimeline
```

---

## Deploy — Azure App Service

```
GitHub (branch: main)
        ↓  git push
GitHub Actions (.github/workflows/deploy.yml)
        ↓  npm install + npm run build
Azure App Service (Node.js 20, Linux)
        ↓
https://controllus.azurewebsites.net
```

**Segurança:**
- `NASA_API_KEY` no Azure Key Vault → referenciada como App Setting no App Service
- HTTPS ativo por padrão
- Application Insights para telemetria
- Alert Rule: requests/failed > 5 em 5 min
