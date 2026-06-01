# Roadmap — Controllus

> Desenvolvimento incremental — cada fase é funcional e entregável.

---

## Fase 1 — Fundação [ ]

Scaffolding e estrutura base do projeto.

- [ ] Criar projeto Next.js 14 com TypeScript
- [ ] Configurar Tailwind CSS com design system (tema espacial)
- [ ] Configurar ESLint + Prettier
- [ ] Criar `.env.local` e `.env.example`
- [ ] Criar estrutura de pastas (`src/components`, `src/services`, `src/types`, `src/config`, `src/lib`, `src/utils`)
- [ ] Criar `CLAUDE.md` do projeto

---

## Fase 2 — Globo 3D [ ]

Renderização do globo interativo sem dados reais ainda.

- [ ] Instalar `globe.gl` e dependências Three.js
- [ ] Criar componente `GlobeView` com import dinâmico (ssr: false)
- [ ] Configurar tema dark espacial no globo (textura, atmosfera, fundo)
- [ ] Plotar pontos mockados no globo para validar interatividade
- [ ] Implementar clique nos pontos → estado selecionado

---

## Fase 3 — Layout e Menu [ ]

Interface visual completa.

- [ ] Criar `Navbar` com logo "Controllus" (fonte distinta) e fundo transparente
- [ ] Criar `MenuSection` com 4 opções: Surtos Ativos, Histórico, Regiões, Monitoramento
- [ ] Implementar estado ativo de menu com filtro no globo
- [ ] Criar `OutbreakModal` flutuante com Framer Motion
- [ ] Responsividade básica

---

## Fase 4 — Integração de APIs [ ]

Substituir dados mockados por dados reais.

- [ ] Criar `reliefWebService.ts` — surtos ativos (ReliefWeb API)
- [ ] Criar `whoService.ts` — histórico de doenças por país (WHO GHO API)
- [ ] Criar `nasaFirmsService.ts` — focos ambientais (NASA FIRMS API)
- [ ] Criar configs tipadas em `src/config/`
- [ ] Mapear resposta das APIs para o modelo interno `OutbreakPoint`
- [ ] Substituir dados mockados no globo pelos dados reais

---

## Fase 5 — Seções do Menu [ ]

Conteúdo de cada seção navegável.

- [ ] **Surtos Ativos** — lista lateral com eventos em curso, filtro no globo
- [ ] **Histórico** — linha do tempo de eventos por país (últimos 12 meses)
- [ ] **Regiões** — painel comparativo entre regiões/continentes
- [ ] **Monitoramento** — status das APIs, última atualização, indicadores ambientais

---

## Fase 6 — Azure + CI/CD [ ]

Deploy e infraestrutura para entrega SDTCC.

- [ ] Criar repositório GitHub público
- [ ] Criar Azure App Service (Node.js 20, Linux)
- [ ] Criar Azure Key Vault com secrets das APIs
- [ ] Configurar GitHub Actions (`deploy.yml`) com deploy automático na `main`
- [ ] Configurar GitHub Secrets (`AZURE_CREDENTIALS`, `NASA_API_KEY`)
- [ ] Ativar Application Insights
- [ ] Criar Alert Rule (requests/failed > 5 em 5 min)
- [ ] Registrar 2+ deploys distintos no Deployment Center
- [ ] Ativar HTTPS

---

## Fase 7 — Polimento [ ]

Qualidade final para entrega.

- [ ] Revisar visual dark mode em todos os componentes
- [ ] Adicionar loading states (skeleton / spinner)
- [ ] Tratar erros de API com fallback visual
- [ ] Testar fluxo completo (globo → clique → modal → menu)
- [ ] Atualizar todas as documentações
- [ ] Gravar evidências para o PDF de entrega SDTCC

---

## Status Geral

| Fase | Status |
|---|---|
| 1 — Fundação | Pendente |
| 2 — Globo 3D | Pendente |
| 3 — Layout e Menu | Pendente |
| 4 — Integração de APIs | Pendente |
| 5 — Seções do Menu | Pendente |
| 6 — Azure + CI/CD | Pendente |
| 7 — Polimento | Pendente |
