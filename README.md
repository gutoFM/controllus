# Controllus — Dashboard Epidemiológico Global

> Dashboard web full-stack de monitoramento de surtos epidemiológicos em tempo real,  
> exibidos sobre um globo terrestre 3D interativo com dados de APIs públicas globais.

**Produção:** https://controllus.azurewebsites.net

---

## Equipe

| Nome | RM |
|---|---|
| Augusto Fisco Milreu | RM 98245 |
| David Guilherme B. Denunci | RM 98603 |
| Fernando Popolili Lameira Pires | RM 99919 |
| Lucas P. de Toledo | RM 97913 |
| Matheus Bastazini Zanardi | RM 98832 |

**Curso:** Engenharia de Software — 4º Semestre  
**Instituição:** FIAP  
**Disciplinas:** SDTCC · IOT · IA · Disruptive Architectures · Mobile · DevOps  
**Entrega:** Global Solution 2026 — Junho/2026

---

## Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Stack](#stack)
- [APIs Integradas](#apis-integradas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Routes](#api-routes)
- [Segurança](#segurança)
- [Rodando Localmente](#rodando-localmente)
- [Deploy — Azure App Service](#deploy--azure-app-service)
- [Infraestrutura Azure](#infraestrutura-azure)
- [Pipeline CI/CD](#pipeline-cicd)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Visão Geral

O Controllus centraliza dados de múltiplas fontes públicas de saúde global em uma interface única e interativa. O usuário pode visualizar surtos ativos no globo 3D, filtrar por severidade e região, acessar detalhes clínicos e acompanhar indicadores ambientais correlacionados — incluindo focos de calor detectados por satélites da NASA.

**Conexão com a Indústria Espacial:** a aplicação integra a [NASA FIRMS API](https://firms.modaps.eosdis.nasa.gov/), sistema de monitoramento via satélite (MODIS/VIIRS) que detecta focos de calor globais. Esses dados são correlacionados com surtos de doenças transmitidas por vetores cujos habitats são afetados por queimadas e desmatamento monitorados do espaço.

---

## Arquitetura

```
Browser
  │
  ├── GlobeView (WebGL / globe.gl)          ← renderização 3D client-side
  ├── Panels (AnimatePresence / Framer Motion)
  └── useOutbreakData (hook)
        │
        └── /api/* (Next.js API Routes)     ← BFF server-side
              │
              ├── GET /api/outbreaks  ──→  ReliefWeb v2 API
              ├── GET /api/history    ──→  WHO GHO API
              ├── GET /api/monitoring ──→  NASA FIRMS API
              └── GET /api/health     ──→  status das integrações
```

O padrão **BFF (Backend for Frontend)** é aplicado via API Routes do Next.js: todo acesso a APIs externas ocorre no servidor, evitando exposição de chaves e contornando restrições de CORS. O cliente nunca acessa APIs externas diretamente.

O build `output: 'standalone'` gera um servidor Node.js mínimo e autossuficiente (`server.js`) para deploy em contêiner ou App Service sem dependência do toolchain Next.js em produção.

---

## Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js — App Router | 14.2.x |
| Linguagem | JavaScript (ES2022+) | — |
| Estilização | Tailwind CSS + design system customizado | 3.4.x |
| Globo 3D | globe.gl via UMD (WebGL / Three.js) | 2.x |
| Animações | Framer Motion | 12.x |
| Ícones | Lucide React | 1.x |
| Runtime | Node.js | 22 LTS |
| Deploy | Azure App Service (Linux, B1) | — |
| CI/CD | GitHub Actions | — |
| Segredos | Azure Key Vault (RBAC) | — |
| Monitoramento | Azure Application Insights | — |

> **Por que globe.gl via UMD e não npm?**  
> O pacote npm é pure-ESM e conflita com o bundler do Next.js em import dinâmico com `ssr: false`.  
> A solução é carregar o script UMD de `public/lib/globe.gl.min.js` via um singleton `globeScriptPromise`, garantindo que o script seja injetado uma única vez no DOM.

---

## APIs Integradas

### ReliefWeb v2
- **Endpoint:** `https://api.reliefweb.int/v2/`
- **Dados:** alertas e surtos epidemiológicos ativos globalmente
- **Autenticação:** `appname` aprovado (parâmetro de query — sem chave secreta)
- **Requisito:** cadastro em https://apidoc.reliefweb.int/parameters#appname
- **Fallback:** dados mock locais quando `RELIEFWEB_APP_NAME` não está configurado (badge `DEMO`)

### WHO GHO (Global Health Observatory)
- **Endpoint:** `https://ghoapi.azureedge.net/api/`
- **Dados:** indicadores históricos de saúde pública por país
- **Autenticação:** sem chave (API pública)

### NASA FIRMS (Fire Information for Resource Management System)
- **Endpoint:** `https://firms.modaps.eosdis.nasa.gov/api/`
- **Dados:** focos de calor detectados pelos satélites MODIS e VIIRS em tempo quase real
- **Autenticação:** `NASA_API_KEY` (chave gratuita — cadastro em https://firms.modaps.eosdis.nasa.gov/api/area/)
- **Fallback:** indicadores ambientais estáticos quando a chave não está configurada

---

## Estrutura do Projeto

```
controllus/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline CI/CD — GitHub Actions
├── public/
│   ├── lib/
│   │   └── globe.gl.min.js         # globe.gl UMD — evita conflito ESM/bundler
│   └── textures/                   # Texturas do globo (sem dependência de CDN)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.js               # Root layout — metadados, fontes
│   │   ├── page.js                 # Página principal — orquestra hook + componentes
│   │   ├── globals.css
│   │   └── api/                    # API Routes (BFF server-side)
│   │       ├── outbreaks/route.js  # GET — surtos ativos (ReliefWeb)
│   │       ├── history/route.js    # GET — histórico (WHO GHO)
│   │       ├── monitoring/route.js # GET — focos NASA + indicadores
│   │       └── health/route.js     # GET — status das integrações
│   ├── components/
│   │   ├── Globe/
│   │   │   ├── GlobeView.js        # Globo 3D — WebGL, singleton script, câmera
│   │   │   └── GlobeLoader.js      # Skeleton enquanto o globo não hidrata
│   │   ├── Menu/
│   │   │   ├── Navbar.js           # Barra superior glassmorphism
│   │   │   └── MenuSection.js      # Botões do menu lateral
│   │   ├── Modal/
│   │   │   ├── OutbreakModal.js    # Modal de detalhes do surto
│   │   │   ├── ModalHeader.js
│   │   │   ├── ModalStats.js
│   │   │   └── ModalTimeline.js
│   │   ├── panels/
│   │   │   ├── ActiveOutbreaksPanel.js  # Lista filtrada de surtos
│   │   │   ├── RegionsPanel.js          # Agrupamento por continente
│   │   │   └── MonitoringPanel.js       # Dados NASA + indicadores ambientais
│   │   └── ui/
│   │       ├── SeverityBadge.js
│   │       └── LoadingSpinner.js
│   ├── config/
│   │   └── nasaApi.config.js       # Lê NASA_API_KEY de process.env (camada de config)
│   ├── hooks/
│   │   └── useOutbreakData.js      # Busca /api/outbreaks, gerencia loading/erro/seleção
│   ├── lib/
│   │   ├── tokens.js               # Design system — cores, espaçamentos, tipografia
│   │   └── constants.js            # GLOBE_CONFIG, CONTINENT_MAP, SEVERITY_MAP
│   ├── services/
│   │   ├── reliefWebService.js     # Encapsula chamadas à ReliefWeb v2
│   │   ├── whoService.js           # Encapsula chamadas à WHO GHO
│   │   └── nasaFirmsService.js     # Encapsula chamadas à NASA FIRMS
│   └── utils/
│       ├── mappers.js              # Normaliza respostas das APIs para o modelo interno
│       └── errors.js               # Mapeamento centralizado de erros
├── .env.example                    # Template de variáveis — copiar para .env.local
├── next.config.mjs                 # output: standalone + Security Headers HTTP
└── docs/
    ├── ARQUITETURA.md
    ├── APIS_EXTERNAS.md
    ├── DESIGN_SYSTEM.md
    ├── ROTEIRO_DEPLOY.md
    └── EVIDENCIAS_SDTCC_CONTROLLUS.docx
```

---

## API Routes

Todas as rotas são `GET` sem autenticação de cliente (dados públicos). Erros retornam `{ error: string }` com o status HTTP apropriado — nunca expõem stack traces ou mensagens internas.

| Rota | Fonte | Resposta |
|---|---|---|
| `GET /api/outbreaks` | ReliefWeb v2 | Array normalizado de surtos ativos com severidade, coordenadas, casos |
| `GET /api/history` | WHO GHO | Histórico de indicadores de saúde por país e doença |
| `GET /api/monitoring` | NASA FIRMS | Focos de calor + indicadores ambientais + status das fontes |
| `GET /api/health` | — | `{ status, services: { reliefweb, who, nasa } }` com latências |

---

## Segurança

### Chaves e segredos
- Nenhuma chave de API está no código-fonte ou em variáveis `NEXT_PUBLIC_*`
- Em produção, `NASA_API_KEY` e `RELIEFWEB_APP_NAME` são lidos pelo App Service via **Azure Key Vault References** (`@Microsoft.KeyVault(SecretUri=…)`) — o valor nunca passa pelo código
- A Managed Identity do App Service tem apenas a role `Key Vault Secrets User` no Key Vault (princípio de menor privilégio)

### Security Headers HTTP
Configurados em `next.config.mjs` e aplicados em todas as rotas:

| Header | Valor | Proteção |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | MIME sniffing |
| `X-Frame-Options` | `DENY` | Clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS reflection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Vazamento de URL |
| `Content-Security-Policy` | `default-src 'self'; …` | Injeção de recursos |

### HTTPS
O Azure App Service provisiona automaticamente certificado TLS gerenciado para `*.azurewebsites.net` (TLS 1.2+).

---

## Rodando Localmente

### Pré-requisitos
- Node.js 20+ instalado
- Chaves de API (opcionais — app funciona em modo DEMO sem elas)

### Instalação

```bash
git clone https://github.com/<seu-usuario>/controllus.git
cd controllus
npm install
```

### Configurar variáveis de ambiente

```bash
cp .env.example .env.local
# edite .env.local e preencha os valores (veja comentários no arquivo)
```

```env
# .env.local
RELIEFWEB_APP_NAME=seu_appname_aqui   # opcional — sem ela: badge DEMO
NASA_API_KEY=sua_chave_aqui           # opcional — sem ela: dados estáticos
```

### Iniciar

```bash
npm run dev
# http://localhost:3000
```

### Outros comandos

```bash
npm run build    # build de produção (output: standalone)
npm run start    # inicia o servidor de produção local
npm run lint     # ESLint
```

---

## Deploy — Azure App Service

O deploy é automático via GitHub Actions a cada push em `main`/`master`.  
Para setup manual completo, consulte [`docs/ROTEIRO_DEPLOY.md`](docs/ROTEIRO_DEPLOY.md).

### Como o deploy funciona

1. GitHub Actions faz o build Next.js com `output: 'standalone'`
2. Copia `public/` e `.next/static/` para dentro de `.next/standalone/`
3. Publica o diretório `.next/standalone/` diretamente no Azure (sem `actions/upload-artifact` — que excluiria o diretório oculto `.next/`)
4. O App Service inicia com `node server.js`

> **`SCM_DO_BUILD_DURING_DEPLOYMENT=false`** é obrigatório para desabilitar o Oryx (sistema de build do Azure), que interfere com o standalone já compilado.

---

## Infraestrutura Azure

| Recurso | Nome | Configuração |
|---|---|---|
| Resource Group | `rg-controllus` | Brazil South |
| App Service Plan | `plan-controllus` | B1, Linux |
| Web App | `controllus` | Node.js 22 LTS |
| Key Vault | `kv-controllus` | RBAC mode |
| Application Insights | `ai-controllus` | Node.JS |
| Alert Rule | `alert-controllus-failures` | `requests/failed > 5` em 5 min |

**URL:** https://controllus.azurewebsites.net

---

## Pipeline CI/CD

Arquivo: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

```
push → main/master
        │
        └── build-and-deploy (ubuntu-latest)
              ├── checkout
              ├── setup-node 20 (cache: npm)
              ├── npm ci
              ├── npm run lint
              ├── npm run build  (env: NASA_API_KEY, RELIEFWEB_APP_NAME)
              ├── cp public/ e .next/static/ → .next/standalone/
              ├── azure/login@v2  (AZURE_CREDENTIALS secret)
              ├── azure/webapps-deploy@v3  (package: .next/standalone)
              └── az logout
```

**GitHub Secrets necessários:**

| Secret | Descrição |
|---|---|
| `AZURE_CREDENTIALS` | JSON do Service Principal (`az ad sp create-for-rbac --sdk-auth`) |
| `NASA_API_KEY` | Chave NASA FIRMS — injetada no build |
| `RELIEFWEB_APP_NAME` | App name ReliefWeb v2 — injetado no build |

---

## Variáveis de Ambiente

| Variável | Onde usar | Obrigatória | Descrição |
|---|---|---|---|
| `RELIEFWEB_APP_NAME` | `.env.local` / GitHub Secret | Não | App name aprovado pela ReliefWeb v2. Sem ela: dados mock (badge DEMO) |
| `NASA_API_KEY` | `.env.local` / GitHub Secret | Não | Chave da NASA FIRMS API. Sem ela: indicadores estáticos no painel de monitoramento |

Nenhuma variável usa o prefixo `NEXT_PUBLIC_` — todas são exclusivamente server-side.
