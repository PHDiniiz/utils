/**
 * Opções para geração de header CSP
 */
export interface CSPOptions {
  defaultSrc?: string[];
  scriptSrc?: string[];
  styleSrc?: string[];
  imgSrc?: string[];
  connectSrc?: string[];
  fontSrc?: string[];
  objectSrc?: string[];
  mediaSrc?: string[];
  frameSrc?: string[];
  baseUri?: string[];
  formAction?: string[];
  frameAncestors?: string[];
  upgradeInsecureRequests?: boolean;
}

/**
 * Gera header Content-Security-Policy com sane defaults
 * @param options - Opções de CSP
 * @returns String pronta para header Content-Security-Policy
 */
export function cspHeader(options?: CSPOptions): string {
  const {
    defaultSrc = ["'self'"],
    scriptSrc = ["'self'"],
    styleSrc = ["'self'", "'unsafe-inline'"],
    imgSrc = ["'self'", 'data:', 'https:'],
    connectSrc = ["'self'"],
    fontSrc = ["'self'", 'data:'],
    objectSrc = ["'none'"],
    mediaSrc = ["'self'"],
    frameSrc = ["'none'"],
    baseUri = ["'self'"],
    formAction = ["'self'"],
    frameAncestors = ["'none'"],
    upgradeInsecureRequests = false,
  } = options || {};

  const directives: string[] = [];

  if (defaultSrc.length > 0) {
    directives.push(`default-src ${defaultSrc.join(' ')}`);
  }
  if (scriptSrc.length > 0) {
    directives.push(`script-src ${scriptSrc.join(' ')}`);
  }
  if (styleSrc.length > 0) {
    directives.push(`style-src ${styleSrc.join(' ')}`);
  }
  if (imgSrc.length > 0) {
    directives.push(`img-src ${imgSrc.join(' ')}`);
  }
  if (connectSrc.length > 0) {
    directives.push(`connect-src ${connectSrc.join(' ')}`);
  }
  if (fontSrc.length > 0) {
    directives.push(`font-src ${fontSrc.join(' ')}`);
  }
  if (objectSrc.length > 0) {
    directives.push(`object-src ${objectSrc.join(' ')}`);
  }
  if (mediaSrc.length > 0) {
    directives.push(`media-src ${mediaSrc.join(' ')}`);
  }
  if (frameSrc.length > 0) {
    directives.push(`frame-src ${frameSrc.join(' ')}`);
  }
  if (baseUri.length > 0) {
    directives.push(`base-uri ${baseUri.join(' ')}`);
  }
  if (formAction.length > 0) {
    directives.push(`form-action ${formAction.join(' ')}`);
  }
  if (frameAncestors.length > 0) {
    directives.push(`frame-ancestors ${frameAncestors.join(' ')}`);
  }
  if (upgradeInsecureRequests) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
}

/**
 * Gera chave para rate limiting
 * @param ip - Endereço IP
 * @param route - Rota opcional
 * @returns Chave para rate limiting
 */
export function rateLimitKey(ip: string, route?: string): string {
  if (!ip || typeof ip !== 'string') {
    throw new Error('IP é obrigatório');
  }

  const parts = ['ratelimit', ip.replace(/[^a-zA-Z0-9]/g, '_')];

  if (route) {
    // Substitui caracteres não alfanuméricos por underscore, mas mantém a estrutura da rota
    parts.push(route.replace(/[^a-zA-Z0-9/]/g, (match) => (match === '/' ? ':' : '_')));
  }

  return parts.join(':');
}

