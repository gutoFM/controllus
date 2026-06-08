/**
 * GET /api/health
 *
 * Health check do servidor Next.js.
 * Usado pelo Azure Application Insights e pelo pipeline CI/CD
 * para confirmar que o app está em execução.
 */

export async function GET() {
  return Response.json({
    status:    'ok',
    timestamp: new Date().toISOString(),
    app:       'controllus',
  });
}
