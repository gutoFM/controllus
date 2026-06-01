# Funcionalidades — Controllus

---

## Implementadas

*Nenhuma ainda — projeto em fase de documentação.*

---

## Pendentes

### Globo 3D
- [ ] Renderização do globo com tema dark espacial
- [ ] Pontos clicáveis plotados por lat/lng
- [ ] Cor do ponto por nível de severidade (low / medium / high / critical)
- [ ] Animação de rotação suave ao iniciar
- [ ] Clique no ponto abre OutbreakModal

### Interface
- [ ] Navbar com logo "Controllus" (fonte Orbitron)
- [ ] Menu com 4 opções: Surtos Ativos, Histórico, Regiões, Monitoramento
- [ ] Fundo transparente com glassmorphism no menu
- [ ] OutbreakModal flutuante com dados do ponto selecionado
- [ ] SeverityBadge colorida por nível de risco
- [ ] Loading state durante carregamento das APIs

### Seções do Menu
- [ ] **Surtos Ativos** — lista de eventos em curso com filtro no globo
- [ ] **Histórico** — linha do tempo de eventos por país (últimos 12 meses)
- [ ] **Regiões** — painel comparativo entre continentes
- [ ] **Monitoramento** — status das APIs e indicadores ambientais

### Integrações
- [ ] ReliefWeb API — surtos e alertas ativos
- [ ] WHO GHO API — histórico de doenças por país
- [ ] NASA FIRMS API — focos de calor e monitoramento

### Infraestrutura
- [ ] Deploy no Azure App Service
- [ ] Pipeline CI/CD via GitHub Actions
- [ ] Azure Key Vault com secrets
- [ ] Application Insights + Alert Rule
