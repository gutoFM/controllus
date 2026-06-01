# Estrutura do Projeto — Controllus

```
controllus/
├── docs/                              # Documentação do projeto
│   ├── ARQUITETURA.md                 # Diagrama de camadas e decisões
│   ├── ROADMAP.md                     # Fases de desenvolvimento
│   ├── STACK.md                       # Tecnologias e dependências
│   ├── ESTRUTURA.md                   # Este arquivo
│   ├── DESIGN_SYSTEM.md               # Cores, tipografia, espaçamento
│   ├── PADROES.md                     # Convenções e boas práticas
│   ├── APIS_EXTERNAS.md               # ReliefWeb, WHO GHO, NASA FIRMS
│   └── FUNCIONALIDADES.md             # Implementadas e pendentes
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.jsx                 # Root layout — fontes, providers, metadata
│   │   ├── page.jsx                   # Página principal (globo + menu)
│   │   ├── globals.css                # Reset CSS + variáveis globais
│   │   └── api/                       # API Routes (servidor — proxy para APIs externas)
│   │       ├── outbreaks/
│   │       │   └── route.js           # GET /api/outbreaks — ReliefWeb
│   │       ├── history/
│   │       │   └── route.js           # GET /api/history — WHO GHO
│   │       ├── monitoring/
│   │       │   └── route.js           # GET /api/monitoring — NASA FIRMS
│   │       └── health/
│   │           └── route.js           # GET /api/health — status da aplicação
│   │
│   ├── components/
│   │   ├── Globe/
│   │   │   ├── GlobeView.jsx          # Globo 3D (globe.gl) — importado dinamicamente
│   │   │   └── GlobeLoader.jsx        # Skeleton enquanto o globo carrega
│   │   │
│   │   ├── Menu/
│   │   │   ├── Navbar.jsx             # Barra superior com logo e menu
│   │   │   └── MenuSection.jsx        # Item individual do menu
│   │   │
│   │   ├── Modal/
│   │   │   ├── OutbreakModal.jsx      # Modal flutuante do ponto clicado
│   │   │   ├── ModalHeader.jsx        # Cabeçalho do modal
│   │   │   ├── ModalStats.jsx         # Estatísticas e dados do surto
│   │   │   └── ModalTimeline.jsx      # Linha do tempo do evento
│   │   │
│   │   └── ui/
│   │       ├── SeverityBadge.jsx      # Badge colorida por nível de risco
│   │       └── LoadingSpinner.jsx     # Spinner de carregamento
│   │
│   ├── config/                        # Configs — leem do .env (server-side)
│   │   └── nasaApi.config.js          # Chave e baseUrl da NASA FIRMS
│   │
│   ├── hooks/
│   │   └── useOutbreakData.js         # Busca dados das API Routes internas
│   │
│   ├── lib/
│   │   ├── tokens.js                  # Design system: colors, typography, spacing
│   │   └── constants.js               # Constantes globais da aplicação
│   │
│   ├── services/                      # Chamadas às APIs externas (usadas nas API Routes)
│   │   ├── reliefWebService.js        # ReliefWeb API
│   │   ├── whoService.js              # WHO GHO API
│   │   └── nasaFirmsService.js        # NASA FIRMS API
│   │
│   └── utils/
│       ├── mappers.js                 # Normaliza respostas das APIs → OutbreakPoint
│       └── errors.js                  # Tratamento centralizado de erros
│
├── .env.local                         # Variáveis locais (não commitar)
├── .env.example                       # Template de variáveis (commitar)
├── .gitignore
├── CLAUDE.md                          # Contexto do projeto para o agente
├── jsconfig.json                      # Alias @/ para src/
├── next.config.js
├── tailwind.config.js
└── package.json
```
