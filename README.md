# @phdiniiz/utils

Utilitários comuns para desenvolvimento no Brasil com foco em validações, formatações e segurança.

## Características

- ✅ **Zero dependências** - Mínimo de dependências possível
- ✅ **TypeScript** - Totalmente tipado
- ✅ **ESM + CJS** - Suporte para ambos os formatos
- ✅ **Tree-shakeable** - Importe apenas o que precisa
- ✅ **95%+ de cobertura** - Testes abrangentes
- ✅ **Focado no Brasil** - Validações e formatações brasileiras

## Instalação

```bash
pnpm add @phdiniiz/utils
# ou
npm install @phdiniiz/utils
# ou
yarn add @phdiniiz/utils
```

## Uso

### Validações

```typescript
import { isCPF, formatCPF, normalizeCPF, isCNPJ, formatCNPJ, normalizeCNPJ, isEmail, isCEP, normalizeCEP, isPhoneBR, isPlate, isOldPlate, isMercosulPlate, isPIS, isDateBR, isRG, hasRGDVerifier } from '@phdiniiz/utils/validation';

// CPF
isCPF('111.444.777-35'); // true
isCPF('11144477735'); // true
formatCPF('11144477735'); // "111.444.777-35"
normalizeCPF('111.444.777-35'); // "11144477735"

// CNPJ
isCNPJ('11.222.333/0001-81'); // true
formatCNPJ('11222333000181'); // "11.222.333/0001-81"
normalizeCNPJ('11.222.333/0001-81'); // "11222333000181"

// CEP
isCEP('01310-100'); // true
normalizeCEP('01310-100'); // "01310100"

// E-mail
isEmail('usuario@exemplo.com.br'); // true

// Telefone brasileiro
isPhoneBR('(11) 98765-4321'); // true (celular)
isPhoneBR('(11) 3333-4444'); // true (fixo)

// Placa de veículo
isPlate('ABC1234'); // true (padrão antigo)
isPlate('ABC1D23'); // true (Mercosul)
isOldPlate('ABC1234'); // true
isMercosulPlate('ABC1D23'); // true

// PIS/PASEP
isPIS('120.5643.164-7'); // true

// Data brasileira
isDateBR('25/12/2023'); // true

// RG
isRG('123456789'); // true
hasRGDVerifier('123456789X'); // true (verifica se tem dígito verificador)
```

### Formatações

```typescript
import { formatBRL, parseBRL, numberToBRL, brlToNumber, formatDateBR, formatDateTimeBR, formatISO } from '@phdiniiz/utils/format';
import { formatCPF, formatCNPJ, formatCEP, formatPhone, applyMask, removePunctuation, onlyDigits } from '@phdiniiz/utils/format';

// Moeda
formatBRL(1234.56); // "R$ 1.234,56"
formatBRL(1234.56, { showSymbol: false }); // "1.234,56"

// Datas
formatDateBR(new Date()); // "25/12/2023"
formatDateTimeBR(new Date()); // "25/12/2023 10:30:00"
formatISO(new Date()); // "2023-12-25"

// Máscaras
formatCPF('11144477735'); // "111.444.777-35"
formatCNPJ('11222333000181'); // "11.222.333/0001-81"
formatCEP('01310100'); // "01310-100"
formatPhone('11987654321'); // "(11) 98765-4321"
applyMask('12345678901', '###.###.###-##'); // "123.456.789-01"
removePunctuation('Olá, mundo!'); // "Olá mundo"
onlyDigits('abc123def456'); // "123456"
```

### Brasil

```typescript
import { getStates, getStateByCode, getStateByName, isValidStateCode, getCitiesByState, cityExistsInState, getAllMainCities, lookupCEP } from '@phdiniiz/utils/brazil';

// Estados
const states = getStates(); // Array completo de estados
const sp = getStateByCode('SP'); // { code: 'SP', name: 'São Paulo' }
const spByName = getStateByName('São Paulo'); // { code: 'SP', name: 'São Paulo' }
isValidStateCode('SP'); // true

// Cidades
const cities = getCitiesByState('SP'); // ['São Paulo', 'Guarulhos', ...]
cityExistsInState('São Paulo', 'SP'); // true
const allCities = getAllMainCities(); // Array com todas as cidades principais

// Busca CEP
const cepData = await lookupCEP('01310-100');
// {
//   cep: '01310100',
//   logradouro: 'Avenida Paulista',
//   bairro: 'Bela Vista',
//   localidade: 'São Paulo',
//   uf: 'SP'
// }
```

### Conversores

```typescript
import { numberToWords, dateToTimestamp, dateToTimestampSeconds, dateToUTC, timestampToDate, brlToNumber, numberToBRL } from '@phdiniiz/utils/converter';

// Número por extenso
numberToWords(123); // "cento e vinte e três"

// Datas
dateToTimestamp(new Date()); // 1703510400000 (milissegundos)
dateToTimestampSeconds(new Date()); // 1703510400 (segundos)
dateToUTC(new Date()); // "2023-12-25T10:30:00.000Z"
timestampToDate(1703510400000); // Date object

// Moeda
brlToNumber('R$ 1.234,56'); // 1234.56
numberToBRL(1234.56); // "1.234,56"
```

### Utilitários

```typescript
import { slugify, removeEmojis, isValidJSON, capitalize, capitalizeWords, generateUUID, generateNanoId, hashSHA256, hashSHA256Sync } from '@phdiniiz/utils/utils';

// Strings
slugify('Olá Mundo'); // "ola-mundo"
removeEmojis('Olá 😀'); // "Olá "
isValidJSON('{"key": "value"}'); // true
capitalize('hello'); // "Hello"
capitalizeWords('hello world'); // "Hello World"

// IDs
generateUUID(); // "550e8400-e29b-41d4-a716-446655440000"
generateNanoId(); // "V1StGXR8_Z5jdHi6B-myT"
generateNanoId(10); // Gera nanoid com tamanho customizado

// Hash
const hash = await hashSHA256('texto'); // "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
const hashSync = hashSHA256Sync('texto'); // Hash síncrono (apenas Node.js)
```

### Datas e Tempo

```typescript
import { getBrazilTime, formatBrazilDateTime, dateDiff, addTime, subtractTime } from '@phdiniiz/utils/date';

// Fuso horário
const now = getBrazilTime();
formatBrazilDateTime(now); // "25/12/2023 10:30:00"

// Diferença entre datas
const date1 = new Date('2023-01-01');
const date2 = new Date('2023-01-02');
dateDiff(date1, date2, 'days'); // 1

// Manipulação
addTime(new Date(), 1, 'days'); // Adiciona 1 dia
subtractTime(new Date(), 1, 'hours'); // Subtrai 1 hora
```

### Segurança

```typescript
import {
  sanitizeHTML,
  escapeHTML,
  sanitizeForSQL,
  sanitizeForNoSQL,
  normalizeString,
  normalizeText,
  sanitizeInput,
  validateSchema,
  safeJsonStringify,
  cspHeader,
  rateLimitKey,
} from '@phdiniiz/utils/security';

// HTML
sanitizeHTML('<script>alert("xss")</script>'); // Remove tags perigosas
escapeHTML('<script>'); // "&lt;script&gt;"

// SQL
sanitizeForSQL("O'Reilly"); // "O''Reilly" (escapa aspas)

// NoSQL
sanitizeForNoSQL({ $ne: 'value', name: 'test' }); // { name: 'test' } (remove operadores $ perigosos)
deepCleanMongoObject({ $where: 'evil', nested: { $ne: 'value' } }); // Limpeza profunda de objetos MongoDB

// Normalização
normalizeString('José', { removeDiacritics: true, trim: true }); // "Jose"
normalizeText('  Olá Mundo  '); // "ola mundo" (remove acentos, espaços e normaliza)
normalizeCPF('111.444.777-35'); // "11144477735"
normalizeCNPJ('11.222.333/0001-81'); // "11222333000181"

// Sanitização geral
sanitizeInput('<script>alert(1)</script>'); // Remove XSS
sanitizeInput({ $ne: 'value' }); // Remove NoSQL injection

// Validação de schema (requer zod)
import { z } from 'zod';
const schema = z.object({ name: z.string() });
const result = validateSchema({ name: 'test' }, schema);
if (result.success) {
  console.log(result.data); // { name: 'test' }
}

// JSON seguro
safeJsonStringify({ key: 'value' }); // Serializa com proteção contra referências circulares e limite de profundidade
safeJsonStringify(circularObj, undefined, undefined, 10); // Limite de profundidade configurável

// Headers de segurança
cspHeader(); // Gera header Content-Security-Policy com sane defaults
rateLimitKey('192.168.1.1', '/api/users'); // "ratelimit:192_168_1_1:api:users"
```

### Middleware (Express/NestJS)

```typescript
// Express
import { expressSanitizeMiddleware } from '@phdiniiz/utils/security';
app.use(expressSanitizeMiddleware);

// NestJS
import { nestJSSanitizePipe } from '@phdiniiz/utils/security';
// Use como pipe de validação
```

## Subpath Exports

O pacote suporta subpath exports para tree-shaking:

```typescript
// Importação completa
import { isCPF } from '@phdiniiz/utils';

// Importação por módulo (recomendado)
import { isCPF } from '@phdiniiz/utils/validation';
import { formatBRL } from '@phdiniiz/utils/format';
import { lookupCEP } from '@phdiniiz/utils/brazil';
import { sanitizeHTML } from '@phdiniiz/utils/security';
```

## Requisitos

- Node.js 18+ ou navegador moderno
- TypeScript 5.0+ (recomendado)

## Peer Dependencies

- `zod` (opcional) - Necessário apenas para `validateSchema`

## Licença

MIT

## Contribuindo

Contribuições são bem-vindas! Por favor, leia [SECURITY.md](./SECURITY.md) antes de contribuir.

## Changelog

Veja [CHANGELOG.md](./CHANGELOG.md) para histórico de versões.

