/**
 * Config da NASA FIRMS API
 * Lida de process.env — usada APENAS em API Routes (servidor).
 * NUNCA importar em componentes client-side.
 */
export const nasaApiConfig = {
  apiKey:  process.env.NASA_API_KEY ?? '',
  baseUrl: 'https://firms.modaps.eosdis.nasa.gov/api',
};
