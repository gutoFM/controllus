/**
 * Constantes globais — Controllus
 * Configurações do globo, menu e dados mock para a Fase 2.
 * Os dados mock serão substituídos pelas APIs reais na Fase 4.
 */

/* ─── Configuração visual do globo 3D ─────────────────────────────────── */
export const GLOBE_CONFIG = {
  // Texturas servidas localmente (public/textures/) — sem CORS, sem CSP externo
  globeImageUrl:      '/textures/earth-blue-marble.jpg',
  bumpImageUrl:       '/textures/earth-topology.png',
  backgroundImageUrl: '/textures/night-sky.png',
  backgroundColor:    '#050A18',
  atmosphereColor:    '#00D4FF',
  atmosphereAltitude: 0.28,
  autoRotateSpeed:    0.18,
  initialLat:         8,
  initialLng:         14,
  initialAltitude:    2.5,
  selectedAltitude:   1.9,
  flyDuration:        1100,   // ms da animação de câmera
  ambientPoints:      160,    // sensores ambientais (pontos ciano discretos)
};

/* ─── Itens do menu de navegação ────────────────────────────────────────── */
export const MENU_ITEMS = ['Surtos Ativos', 'Histórico', 'Regiões', 'Monitoramento'];

/* ─── Ranking numérico de severidade (para cálculos e ordenação) ────────── */
export const SEV_RANK = { baixa: 1, media: 2, alta: 3, critica: 4 };

/* ─── Mapa país → continente (usado no painel Regiões) ──────────────────── */
export const CONTINENT_MAP = {
  BR: 'América do Sul', PE: 'América do Sul', CL: 'América do Sul',
  US: 'América do Norte',
  CD: 'África', UG: 'África', RW: 'África', SD: 'África', NG: 'África', ET: 'África',
  IN: 'Ásia', BD: 'Ásia', PK: 'Ásia', PH: 'Ásia', ID: 'Ásia',
  SA: 'Oriente Médio', YE: 'Oriente Médio',
  FR: 'Europa',
};

/* ─── Dataset mock — substituir pelas APIs reais na Fase 4 ──────────────── */
/* Dados ilustrativos baseados em surtos reais documentados (2025–2026).     */
/* Fontes: ReliefWeb, WHO GHO, NASA FIRMS.                                  */
export const MOCK_OUTBREAKS = [
  {
    id: 'bra-dengue',
    country: 'Brasil', flag: '🇧🇷', code: 'BR',
    disease: 'Dengue', severity: 'alta',
    date: '12 Mai 2026', lat: -15.78, lng: -47.93,
    cases: 6182943, deaths: 4271, regions: 26,
    description:
      'Epidemia recorde com circulação simultânea dos quatro sorotipos; sobrecarga em unidades de saúde do Centro-Oeste e Sudeste.',
    source: 'ReliefWeb',
    timeline: [
      { date: '02 Jan 2026', text: 'Início do verão eleva índices de infestação por Aedes aegypti.' },
      { date: '18 Fev 2026', text: 'Ministério da Saúde declara emergência em saúde pública.' },
      { date: '24 Abr 2026', text: 'DENV-3 volta a circular após 15 anos, ampliando suscetibilidade.' },
      { date: '12 Mai 2026', text: 'Mutirões de vacinação Qdenga ampliados para 521 municípios.' },
    ],
  },
  {
    id: 'cod-mpox',
    country: 'Rep. Dem. do Congo', flag: '🇨🇩', code: 'CD',
    disease: 'Mpox (clado Ib)', severity: 'critica',
    date: '08 Mai 2026', lat: -4.32, lng: 15.31,
    cases: 71840, deaths: 1392, regions: 19,
    description:
      'Transmissão sustentada do clado Ib com disseminação transfronteiriça; classificada como emergência de saúde pública de importância internacional.',
    source: 'WHO GHO',
    timeline: [
      { date: '14 Ago 2025', text: 'OMS redeclara mpox como emergência internacional (PHEIC).' },
      { date: '03 Nov 2025', text: 'Surto atinge nove províncias; novos casos em zonas urbanas.' },
      { date: '21 Mar 2026', text: 'Campanha de vacinação atinge 250 mil doses distribuídas.' },
      { date: '08 Mai 2026', text: 'Casos confirmados em quatro países vizinhos.' },
    ],
  },
  {
    id: 'uga-ebola',
    country: 'Uganda', flag: '🇺🇬', code: 'UG',
    disease: 'Ebola (vírus Sudão)', severity: 'critica',
    date: '29 Abr 2026', lat: 0.35, lng: 32.58,
    cases: 214, deaths: 89, regions: 5,
    description:
      'Surto do ebolavírus Sudão em Kampala e distritos vizinhos; rastreamento ativo de contatos sem vacina licenciada disponível.',
    source: 'WHO GHO',
    timeline: [
      { date: '30 Jan 2026', text: 'Caso índice confirmado em enfermeiro em Kampala.' },
      { date: '12 Fev 2026', text: 'Ensaio de vacina em anel iniciado com contatos rastreados.' },
      { date: '20 Mar 2026', text: 'Transmissão hospitalar contida em três unidades.' },
      { date: '29 Abr 2026', text: 'Curva de casos em declínio; 42 dias para fim do surto.' },
    ],
  },
  {
    id: 'rwa-marburg',
    country: 'Ruanda', flag: '🇷🇼', code: 'RW',
    disease: 'Vírus de Marburg', severity: 'critica',
    date: '03 Mai 2026', lat: -1.94, lng: 30.06,
    cases: 66, deaths: 15, regions: 7,
    description:
      'Febre hemorrágica de Marburg com alta letalidade entre profissionais de saúde; vacinas experimentais em uso emergencial.',
    source: 'WHO GHO',
    timeline: [
      { date: '27 Mar 2026', text: 'Confirmados primeiros casos em dois distritos de Kigali.' },
      { date: '09 Abr 2026', text: 'Vacina experimental Sabin administrada a profissionais de linha de frente.' },
      { date: '03 Mai 2026', text: 'Nenhum novo caso há 11 dias; vigilância mantida.' },
    ],
  },
  {
    id: 'ind-nipah',
    country: 'Índia', flag: '🇮🇳', code: 'IN',
    disease: 'Vírus Nipah', severity: 'alta',
    date: '06 Mai 2026', lat: 11.25, lng: 75.78,
    cases: 23, deaths: 17, regions: 3,
    description:
      'Surto de Nipah em Kerala associado a morcegos frugívoros; letalidade elevada e isolamento estrito de contatos.',
    source: 'WHO GHO',
    timeline: [
      { date: '21 Abr 2026', text: 'Óbito por encefalite aguda dispara investigação em Kozhikode.' },
      { date: '28 Abr 2026', text: 'Confirmação laboratorial de Nipah; zona de contenção criada.' },
      { date: '06 Mai 2026', text: 'Anticorpo monoclonal m102.4 importado para tratamento.' },
    ],
  },
  {
    id: 'yem-cholera',
    country: 'Iêmen', flag: '🇾🇪', code: 'YE',
    disease: 'Cólera', severity: 'alta',
    date: '30 Abr 2026', lat: 15.37, lng: 44.19,
    cases: 248611, deaths: 812, regions: 22,
    description:
      'Epidemia agravada por colapso de saneamento e deslocamento; alta incidência entre crianças menores de cinco anos.',
    source: 'ReliefWeb',
    timeline: [
      { date: '15 Out 2025', text: 'Estação chuvosa amplia contaminação de fontes de água.' },
      { date: '11 Jan 2026', text: 'Campanha oral de vacina contra cólera atinge 1,2 milhão.' },
      { date: '30 Abr 2026', text: 'Casos suspeitos semanais começam a estabilizar.' },
    ],
  },
  {
    id: 'sdn-cholera',
    country: 'Sudão', flag: '🇸🇩', code: 'SD',
    disease: 'Cólera', severity: 'alta',
    date: '02 Mai 2026', lat: 15.50, lng: 32.56,
    cases: 91277, deaths: 2354, regions: 13,
    description:
      'Surto de cólera em meio ao conflito armado; acesso humanitário limitado e sistema de saúde fragmentado.',
    source: 'ReliefWeb',
    timeline: [
      { date: '12 Ago 2025', text: 'Surto declarado no estado de Cartum.' },
      { date: '03 Dez 2025', text: 'Disseminação para 11 dos 18 estados.' },
      { date: '02 Mai 2026', text: 'ONGs ampliam pontos de reidratação oral.' },
    ],
  },
  {
    id: 'nga-lassa',
    country: 'Nigéria', flag: '🇳🇬', code: 'NG',
    disease: 'Febre de Lassa', severity: 'alta',
    date: '27 Abr 2026', lat: 9.08, lng: 8.68,
    cases: 4123, deaths: 174, regions: 28,
    description:
      'Temporada de Lassa com transmissão por roedores Mastomys; picos sazonais em Ondo, Edo e Bauchi.',
    source: 'WHO GHO',
    timeline: [
      { date: '06 Jan 2026', text: 'Início da temporada de transmissão sazonal.' },
      { date: '19 Fev 2026', text: 'Centro de Controle de Doenças ativa resposta nacional.' },
      { date: '27 Abr 2026', text: 'Letalidade reduz para 16% com ribavirina precoce.' },
    ],
  },
  {
    id: 'bgd-dengue',
    country: 'Bangladesh', flag: '🇧🇩', code: 'BD',
    disease: 'Dengue', severity: 'alta',
    date: '09 Mai 2026', lat: 23.81, lng: 90.41,
    cases: 158402, deaths: 743, regions: 17,
    description:
      'Temporada de monções antecipada eleva casos de dengue em Daca; hospitais reforçam leitos.',
    source: 'ReliefWeb',
    timeline: [
      { date: '20 Mar 2026', text: 'Chuvas precoces ampliam criadouros urbanos.' },
      { date: '15 Abr 2026', text: 'Casos diários superam pico de 2024.' },
      { date: '09 Mai 2026', text: 'Operações de nebulização ampliadas em 11 zonas.' },
    ],
  },
  {
    id: 'pak-polio',
    country: 'Paquistão', flag: '🇵🇰', code: 'PK',
    disease: 'Poliovírus selvagem', severity: 'media',
    date: '21 Abr 2026', lat: 30.38, lng: 69.35,
    cases: 38, deaths: 0, regions: 6,
    description:
      'Detecção de poliovírus selvagem tipo 1 em amostras ambientais e casos paralíticos no sul do país.',
    source: 'WHO GHO',
    timeline: [
      { date: '11 Fev 2026', text: 'Poliovírus detectado em esgoto de Karachi e Peshawar.' },
      { date: '18 Mar 2026', text: 'Nova rodada de vacinação porta a porta iniciada.' },
      { date: '21 Abr 2026', text: '11 milhões de crianças imunizadas na campanha.' },
    ],
  },
  {
    id: 'sau-mers',
    country: 'Arábia Saudita', flag: '🇸🇦', code: 'SA',
    disease: 'MERS-CoV', severity: 'media',
    date: '17 Abr 2026', lat: 24.71, lng: 46.68,
    cases: 41, deaths: 13, regions: 4,
    description:
      'Casos esporádicos de coronavírus respiratório do Oriente Médio com exposição a dromedários; vigilância intensificada.',
    source: 'WHO GHO',
    timeline: [
      { date: '02 Mar 2026', text: 'Cluster hospitalar identificado em Riade.' },
      { date: '17 Abr 2026', text: 'Rastreamento confirma origem zoonótica.' },
    ],
  },
  {
    id: 'usa-h5n1',
    country: 'Estados Unidos', flag: '🇺🇸', code: 'US',
    disease: 'Influenza Aviária H5N1', severity: 'media',
    date: '05 Mai 2026', lat: 39.83, lng: -98.58,
    cases: 71, deaths: 2, regions: 14,
    description:
      'Casos humanos de H5N1 ligados a rebanhos leiteiros e avícolas; sem transmissão sustentada entre humanos.',
    source: 'WHO GHO',
    timeline: [
      { date: '14 Jan 2026', text: 'Novo genótipo detectado em gado leiteiro.' },
      { date: '22 Mar 2026', text: 'Trabalhadores rurais infectados em três estados.' },
      { date: '05 Mai 2026', text: 'Estoque de vacina pandêmica ampliado preventivamente.' },
    ],
  },
  {
    id: 'per-dengue',
    country: 'Peru', flag: '🇵🇪', code: 'PE',
    disease: 'Dengue', severity: 'media',
    date: '28 Abr 2026', lat: -12.05, lng: -77.04,
    cases: 187350, deaths: 218, regions: 20,
    description:
      'Surto de dengue impulsionado por El Niño costeiro; maior incidência em Piura e Loreto.',
    source: 'ReliefWeb',
    timeline: [
      { date: '08 Fev 2026', text: 'Calor anômalo eleva transmissão na costa norte.' },
      { date: '28 Abr 2026', text: 'Emergência sanitária prorrogada em 12 regiões.' },
    ],
  },
  {
    id: 'phl-dengue',
    country: 'Filipinas', flag: '🇵🇭', code: 'PH',
    disease: 'Dengue', severity: 'media',
    date: '01 Mai 2026', lat: 14.60, lng: 120.98,
    cases: 142908, deaths: 389, regions: 17,
    description:
      'Casos acima da média histórica em Luzon; campanhas de eliminação de criadouros intensificadas.',
    source: 'ReliefWeb',
    timeline: [
      { date: '19 Mar 2026', text: 'Região da Capital ultrapassa limiar epidêmico.' },
      { date: '01 Mai 2026', text: 'Programa "4 da tarde" de limpeza retomado nas escolas.' },
    ],
  },
  {
    id: 'eth-measles',
    country: 'Etiópia', flag: '🇪🇹', code: 'ET',
    disease: 'Sarampo', severity: 'media',
    date: '24 Abr 2026', lat: 9.03, lng: 38.74,
    cases: 29744, deaths: 196, regions: 11,
    description:
      'Surto em áreas com baixa cobertura vacinal e deslocamento populacional; foco em crianças não vacinadas.',
    source: 'WHO GHO',
    timeline: [
      { date: '06 Jan 2026', text: 'Surtos simultâneos em Oromia e Amhara.' },
      { date: '24 Abr 2026', text: 'Campanha de vacinação alcança 4,3 milhões de crianças.' },
    ],
  },
  {
    id: 'idn-h5',
    country: 'Indonésia', flag: '🇮🇩', code: 'ID',
    disease: 'Influenza Aviária H5N1', severity: 'baixa',
    date: '11 Abr 2026', lat: -6.21, lng: 106.85,
    cases: 4, deaths: 1, regions: 2,
    description:
      'Casos isolados de H5N1 com exposição a aves domésticas; vigilância em mercados de animais vivos.',
    source: 'WHO GHO',
    timeline: [
      { date: '20 Mar 2026', text: 'Caso humano confirmado em Java Ocidental.' },
      { date: '11 Abr 2026', text: 'Abate sanitário em granjas afetadas concluído.' },
    ],
  },
  {
    id: 'fra-wnv',
    country: 'França', flag: '🇫🇷', code: 'FR',
    disease: 'Vírus do Nilo Ocidental', severity: 'baixa',
    date: '19 Abr 2026', lat: 43.70, lng: 7.27,
    cases: 37, deaths: 2, regions: 5,
    description:
      'Casos autóctones de West Nile no sul da França associados a mosquitos Culex; vigilância entomológica reforçada.',
    source: 'WHO GHO',
    timeline: [
      { date: '02 Abr 2026', text: 'Primeiros casos humanos da temporada em Provença.' },
      { date: '19 Abr 2026', text: 'Controle vetorial ampliado em zonas costeiras.' },
    ],
  },
  {
    id: 'chl-hanta',
    country: 'Chile', flag: '🇨🇱', code: 'CL',
    disease: 'Hantavírus', severity: 'baixa',
    date: '14 Abr 2026', lat: -38.74, lng: -72.59,
    cases: 19, deaths: 6, regions: 4,
    description:
      'Casos de síndrome cardiopulmonar por hantavírus no sul do Chile ligados a roedores silvestres.',
    source: 'WHO GHO',
    timeline: [
      { date: '01 Mar 2026', text: 'Aumento sazonal de casos na Araucanía.' },
      { date: '14 Abr 2026', text: 'Alerta a turistas em áreas rurais e camping.' },
    ],
  },
];

/* ─── Status das fontes de dados (painel Monitoramento) ─────────────────── */
export const API_SOURCES = [
  {
    name: 'ReliefWeb', status: 'online', latency: 124,
    lastSync: '14:31:58 UTC',
    description: 'Relatórios humanitários e boletins de surtos da OCHA/ONU em tempo quase real.',
  },
  {
    name: 'WHO GHO', status: 'online', latency: 208,
    lastSync: '14:30:12 UTC',
    description: 'Observatório Global de Saúde da OMS — indicadores e eventos de saúde pública.',
  },
  {
    name: 'NASA FIRMS', status: 'online', latency: 96,
    lastSync: '14:32:04 UTC',
    description: 'Sistema de detecção de focos de calor e queimadas por satélite (VIIRS/MODIS).',
  },
];

/* ─── Indicadores ambientais — NASA FIRMS (painel Monitoramento) ─────────── */
export const ENV_INDICATORS = [
  { label: 'Focos de Calor Ativos', value: '18.426', trend: 'up',   severity: 'alta'  },
  { label: 'Área Monitorada',        value: '511 Mkm²', trend: 'flat', severity: 'media' },
  { label: 'Alertas 24h',            value: '1.203',   trend: 'down', severity: 'baixa' },
];
