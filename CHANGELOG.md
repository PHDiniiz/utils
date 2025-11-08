# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-11-07

### Adicionado

#### Validações
- `isCPF` - Validação de CPF com dígitos verificadores
- `formatCPF` - Formatação de CPF (XXX.XXX.XXX-XX)
- `normalizeCPF` - Normalização de CPF (apenas dígitos)
- `isCNPJ` - Validação de CNPJ com dígitos verificadores
- `formatCNPJ` - Formatação de CNPJ (XX.XXX.XXX/XXXX-XX)
- `normalizeCNPJ` - Normalização de CNPJ (apenas dígitos)
- `isEmail` - Validação de e-mail compatível com padrões brasileiros
- `isCEP` - Validação de CEP
- `normalizeCEP` - Normalização de CEP
- `isPhoneBR` - Validação de telefone brasileiro (fixo e celular)
- `isPlate` - Validação de placa de veículo (padrão antigo e Mercosul)
- `isOldPlate` - Verifica se placa está no padrão antigo
- `isMercosulPlate` - Verifica se placa está no padrão Mercosul
- `isPIS` - Validação de PIS/PASEP
- `isDateBR` - Validação de data brasileira (dd/mm/yyyy)
- `isRG` - Validação de RG brasileiro
- `hasRGDVerifier` - Verifica se RG tem dígito verificador

#### Formatações
- `formatBRL` - Formatação de moeda brasileira (R$)
- `parseBRL` - Conversão de string BRL para número
- `numberToBRL` - Conversão de número para string BRL
- `brlToNumber` - Conversão de string BRL para número
- `formatDateBR` - Formatação de data brasileira (dd/mm/yyyy)
- `formatDateTimeBR` - Formatação de data e hora brasileira
- `formatISO` - Formatação de data ISO (yyyy-mm-dd)
- `applyMask` - Aplicação de máscara genérica
- `formatCPF` - Formatação de CPF
- `formatCNPJ` - Formatação de CNPJ
- `formatCEP` - Formatação de CEP (XXXXX-XXX)
- `formatPhone` - Formatação de telefone brasileiro
- `removePunctuation` - Remoção de pontuação
- `onlyDigits` - Extração de apenas dígitos

#### Brasil
- `getStates` - Lista completa de estados brasileiros
- `getStateByCode` - Busca estado por código (sigla)
- `getStateByName` - Busca estado por nome
- `isValidStateCode` - Valida código de estado
- `getCitiesByState` - Lista de cidades principais por estado
- `cityExistsInState` - Verifica se cidade existe no estado
- `getAllMainCities` - Lista todas as cidades principais
- `lookupCEP` - Busca informações de CEP (ViaCEP + fallback BrasilAPI)

#### Conversores
- `numberToWords` - Conversão de número para extenso em português
- `dateToTimestamp` - Conversão de data para timestamp (milissegundos)
- `dateToTimestampSeconds` - Conversão de data para timestamp (segundos)
- `dateToUTC` - Conversão de data para string UTC ISO
- `timestampToDate` - Conversão de timestamp para Date
- `numberToBRL` - Conversão de número para BRL
- `brlToNumber` - Conversão de BRL para número

#### Utilitários
- `slugify` - Geração de slug amigável
- `removeEmojis` - Remoção de emojis
- `isValidJSON` - Validação de JSON válido
- `capitalize` - Capitalização de primeira letra
- `capitalizeWords` - Capitalização de cada palavra
- `generateUUID` - Geração de UUID v4
- `generateNanoId` - Geração de nanoid
- `hashSHA256` - Hash SHA-256 assíncrono
- `hashSHA256Sync` - Hash SHA-256 síncrono (Node.js)

#### Datas e Tempo
- `getBrazilTime` - Obtém data/hora atual no fuso do Brasil
- `formatBrazilDateTime` - Formata data/hora no padrão brasileiro
- `dateDiff` - Calcula diferença entre datas
- `addTime` - Adiciona tempo a uma data
- `subtractTime` - Subtrai tempo de uma data

#### Segurança
- `sanitizeHTML` - Sanitização de HTML (remove tags e atributos perigosos)
- `escapeHTML` - Escape de caracteres HTML
- `isXssSafeInput` - Detecção heurística de XSS
- `sanitizeForSQL` - Sanitização para queries SQL manuais
- `sanitizeForNoSQL` - Sanitização para NoSQL (remove operadores $)
- `deepCleanMongoObject` - Limpeza profunda de objetos MongoDB
- `normalizeString` - Normalização de string (unicode, diacríticos, controle)
- `normalizeText` - Normalização completa de texto
- `normalizeCPF` - Normalização de CPF
- `normalizeCNPJ` - Normalização de CNPJ
- `sanitizeInput` - Sanitização geral (XSS + SQL + NoSQL)
- `validateSchema` - Validação de schema com Zod
- `safeJsonStringify` - Serialização JSON segura
- `cspHeader` - Geração de header Content-Security-Policy
- `rateLimitKey` - Geração de chave para rate limiting
- `expressSanitizeMiddleware` - Middleware de sanitização para Express
- `nestJSSanitizePipe` - Pipe de sanitização para NestJS

### Características Técnicas
- Zero dependências de runtime
- TypeScript com tipagem completa
- Suporte ESM + CJS
- Tree-shakeable
- Cobertura de testes 95%+
- ESLint + Prettier configurados
- GitHub Actions para CI/CD

[1.0.0]: https://github.com/phdiniiz/utils/releases/tag/v1.0.0

