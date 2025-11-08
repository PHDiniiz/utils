/**
 * Regex para validação de e-mail compatível com padrões brasileiros
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Valida formato de e-mail
 * @param email - E-mail a ser validado
 * @returns true se o e-mail for válido
 */
export function isEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;

  const trimmed = email.trim();
  if (trimmed.length === 0) return false;

  // Verifica tamanho máximo (RFC 5321)
  if (trimmed.length > 254) return false;

  // Verifica formato básico
  if (!EMAIL_REGEX.test(trimmed)) return false;

  // Verifica que não tem pontos consecutivos
  if (trimmed.includes('..')) return false;

  const [localPart, domain] = trimmed.split('@');

  // Valida parte local (antes do @)
  if (!localPart || localPart.length > 64) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;

  // Valida domínio
  if (!domain || domain.length > 253) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;

  return true;
}

