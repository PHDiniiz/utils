/**
 * Converte número para extenso em português brasileiro
 * @param num - Número a ser convertido (0 a 999.999.999.999)
 * @returns Número por extenso
 */
export function numberToWords(num: number): string {
  if (num === 0) return 'zero';

  if (num < 0 || num > 999999999999) {
    throw new Error('Número fora do intervalo suportado (0 a 999.999.999.999)');
  }

  const units = [
    '',
    'um',
    'dois',
    'três',
    'quatro',
    'cinco',
    'seis',
    'sete',
    'oito',
    'nove',
    'dez',
    'onze',
    'doze',
    'treze',
    'quatorze',
    'quinze',
    'dezesseis',
    'dezessete',
    'dezoito',
    'dezenove',
  ];

  const tens = [
    '',
    '',
    'vinte',
    'trinta',
    'quarenta',
    'cinquenta',
    'sessenta',
    'setenta',
    'oitenta',
    'noventa',
  ];

  const hundreds = [
    '',
    'cento',
    'duzentos',
    'trezentos',
    'quatrocentos',
    'quinhentos',
    'seiscentos',
    'setecentos',
    'oitocentos',
    'novecentos',
  ];

  function convertHundreds(n: number): string {
    if (n === 0) return '';
    if (n === 100) return 'cem';

    const parts: string[] = [];
    const h = Math.floor(n / 100);
    const remainder = n % 100;

    if (h > 0) {
      parts.push(hundreds[h]);
    }

    if (remainder > 0) {
      if (remainder < 20) {
        parts.push(units[remainder]);
      } else {
        const t = Math.floor(remainder / 10);
        const u = remainder % 10;
        parts.push(tens[t]);
        if (u > 0) {
          parts.push(units[u]);
        }
      }
    }

    return parts.join(' e ');
  }

  function convertGroup(n: number, singular: string, plural: string): string {
    if (n === 0) return '';
    const words = convertHundreds(n);
    return n === 1 ? `${words} ${singular}` : `${words} ${plural}`;
  }

  const parts: string[] = [];

  // Bilhões
  const billions = Math.floor(num / 1000000000);
  if (billions > 0) {
    parts.push(convertGroup(billions, 'bilhão', 'bilhões'));
  }

  // Milhões
  const millions = Math.floor((num % 1000000000) / 1000000);
  if (millions > 0) {
    parts.push(convertGroup(millions, 'milhão', 'milhões'));
  }

  // Milhares
  const thousands = Math.floor((num % 1000000) / 1000);
  if (thousands > 0) {
    if (thousands === 1) {
      parts.push('mil');
    } else {
      parts.push(convertGroup(thousands, 'mil', 'mil'));
    }
  }

  // Unidades
  const unitsValue = num % 1000;
  if (unitsValue > 0 || parts.length === 0) {
    parts.push(convertHundreds(unitsValue));
  }

  return parts.join(' e ');
}

