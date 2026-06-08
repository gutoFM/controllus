/**
 * Utilitário centralizado de erros — Controllus
 *
 * - Log técnico para debugging: `console.error` com contexto
 * - Mensagem genérica para o cliente: nunca expõe stack trace ou error.message
 */

/**
 * Loga o erro com contexto. Usar internamente nas camadas de service e route.
 * @param {string} context  Ex: 'reliefWebService.fetchActiveEpidemics'
 * @param {unknown} error
 */
export function logError(context, error) {
  console.error(`[${context}]`, error);
}

/**
 * Retorna uma Response JSON de erro 500 padronizada.
 * Loga o erro técnico e devolve mensagem genérica ao cliente.
 *
 * @param {string}  route    Label do endpoint. Ex: 'GET /api/outbreaks'
 * @param {unknown} error    O erro original (para logging)
 * @param {string}  [msg]    Mensagem amigável (opcional)
 */
export function errorResponse(route, error, msg = 'Não foi possível carregar os dados.') {
  logError(route, error);
  return Response.json({ error: msg }, { status: 500 });
}
