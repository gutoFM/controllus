/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options',        value: 'DENY' },
  { key: 'X-XSS-Protection',       value: '1; mode=block' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Texturas do globo: Three.js usa fetch (connect-src) e WebGL usa blob:
      "img-src 'self' data: blob: https://unpkg.com",
      "worker-src 'self' blob:",
      "connect-src 'self' https://unpkg.com ws: wss:",
    ].join('; '),
  },
];

const nextConfig = {
  // Standalone: gera build mínima para deploy no Azure App Service.
  // O servidor é iniciado com: node server.js (sem npm start completo).
  output: 'standalone',

  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
