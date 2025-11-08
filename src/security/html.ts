/**
 * Sanitiza HTML removendo tags e atributos perigosos
 * Implementação básica sem dependências externas
 * Para uso em produção, recomenda-se usar isomorphic-dompurify ou sanitize-html
 * @param html - HTML a ser sanitizado
 * @param options - Opções de sanitização
 * @returns HTML sanitizado
 */
export function sanitizeHTML(
  html: string,
  options?: {
    allowTags?: string[];
    removeScripts?: boolean;
    removeEventHandlers?: boolean;
  }
): string {
  if (!html || typeof html !== 'string') return '';

  const { removeScripts = true, removeEventHandlers = true, allowTags = [] } = options || {};

  let sanitized = html;

  // Remove tags <script> e conteúdo
  if (removeScripts) {
    sanitized = sanitized.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<script[\s\S]*?>/gi, '');
  }

  // Remove atributos de eventos (onclick, onerror, etc.)
  if (removeEventHandlers) {
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
  }

  // Remove tags perigosas comuns
  const dangerousTags = ['iframe', 'object', 'embed', 'link', 'style', 'meta', 'base'];
  for (const tag of dangerousTags) {
    const regex = new RegExp(`<${tag}[\\s\\S]*?>[\\s\\S]*?<\\/${tag}>`, 'gi');
    sanitized = sanitized.replace(regex, '');
    const selfClosingRegex = new RegExp(`<${tag}[\\s\\S]*?\\/?>`, 'gi');
    sanitized = sanitized.replace(selfClosingRegex, '');
  }

  // Remove javascript: e data: URLs
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  // Se allowTags foi especificado, remove todas as tags exceto as permitidas
  if (allowTags.length > 0) {
    const allowedPattern = allowTags.map((tag) => tag.toLowerCase()).join('|');
    const tagRegex = new RegExp(`<(?!\/?(?:${allowedPattern})(?:\s|>))[^>]+>`, 'gi');
    sanitized = sanitized.replace(tagRegex, '');
  }

  return sanitized;
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param str - String a ser escapada
 * @returns String com caracteres HTML escapados
 */
export function escapeHTML(str: string): string {
  if (!str && str !== '') return '';

  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Verifica se uma string contém padrões suspeitos de XSS
 * @param input - String a ser verificada
 * @param threshold - Limite de padrões suspeitos (padrão: 1)
 * @returns true se parecer seguro
 */
export function isXssSafeInput(input: string, threshold: number = 1): boolean {
  if (!input || typeof input !== 'string') return true;

  const suspiciousPatterns = [
    /<script[\s\S]*?>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:text\/html/i,
    /vbscript:/i,
    /expression\s*\(/i,
    /<style[\s\S]*?>/i,
  ];

  let count = 0;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      count++;
      if (count >= threshold) {
        return false;
      }
    }
  }

  return true;
}

