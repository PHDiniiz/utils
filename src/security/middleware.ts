import { sanitizeInput } from './sanitize';

/**
 * Tipo para requisição Express
 */
export interface ExpressRequest {
  body?: unknown;
  query?: unknown;
  params?: unknown;
}

/**
 * Tipo para resposta Express
 */
export interface ExpressResponse {
  status: (code: number) => ExpressResponse;
  json: (data: unknown) => ExpressResponse;
  send: (data: unknown) => ExpressResponse;
}

/**
 * Tipo para next do Express
 */
export type ExpressNext = () => void;

/**
 * Middleware de sanitização para Express
 * Sanitiza body, query e params da requisição
 */
export function expressSanitizeMiddleware(
  req: ExpressRequest,
  _res: ExpressResponse,
  next: ExpressNext
): void {
  if (req.body) {
    req.body = sanitizeInput(req.body, {
      removeXSS: true,
      removeSQLInjection: true,
      removeNoSQLInjection: true,
    });
  }

  if (req.query) {
    req.query = sanitizeInput(req.query, {
      removeXSS: true,
      removeSQLInjection: true,
      removeNoSQLInjection: true,
    });
  }

  if (req.params) {
    req.params = sanitizeInput(req.params, {
      removeXSS: true,
      removeSQLInjection: true,
      removeNoSQLInjection: true,
    });
  }

  next();
}

/**
 * Tipo para requisição NestJS
 */
export interface NestJSRequest {
  body?: unknown;
  query?: unknown;
  params?: unknown;
}

/**
 * Função de sanitização para uso em pipes do NestJS
 * @param value - Valor a ser sanitizado
 * @returns Valor sanitizado
 */
export function nestJSSanitizePipe(value: unknown): unknown {
  return sanitizeInput(value, {
    removeXSS: true,
    removeSQLInjection: true,
    removeNoSQLInjection: true,
  });
}

