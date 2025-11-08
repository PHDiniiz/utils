# Política de Segurança

## Limitações Importantes

Este pacote fornece utilitários de segurança, mas **NÃO é um WAF (Web Application Firewall)** completo. As funções de segurança são camadas adicionais de proteção e não substituem práticas de segurança fundamentais.

### O que este pacote NÃO faz:

1. **Não substitui prepared statements/ORMs** - `sanitizeForSQL` é uma camada adicional, mas você DEVE usar prepared statements ou ORMs para queries SQL
2. **Não é proteção completa contra XSS** - `sanitizeHTML` tem fallback básico, mas para produção use `isomorphic-dompurify` ou `sanitize-html`
3. **Não implementa rate limiting** - `rateLimitKey` apenas gera chaves; você precisa de uma biblioteca de rate limiting
4. **Não valida todos os tipos de entrada** - Validações são específicas para o contexto brasileiro

## Melhores Práticas

### SQL Injection

✅ **FAÇA:**
```typescript
// Use prepared statements
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

// Use ORMs
const user = await User.findById(userId);
```

❌ **NÃO FAÇA:**
```typescript
// Nunca concatene strings diretamente
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.query(query);
```

### XSS (Cross-Site Scripting)

✅ **FAÇA:**
```typescript
// Use escapeHTML para conteúdo de texto
const safe = escapeHTML(userInput);

// Use sanitizeHTML para HTML confiável
const safe = sanitizeHTML(userInput);

// Para produção, use bibliotecas especializadas
import DOMPurify from 'isomorphic-dompurify';
const safe = DOMPurify.sanitize(userInput);
```

❌ **NÃO FAÇA:**
```typescript
// Nunca renderize HTML não sanitizado
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### NoSQL Injection

✅ **FAÇA:**
```typescript
// Use sanitizeForNoSQL antes de queries
const cleanInput = sanitizeForNoSQL(req.body);
const user = await User.findOne(cleanInput);
```

❌ **NÃO FAÇA:**
```typescript
// Nunca use entrada do usuário diretamente
const user = await User.findOne(req.body);
```

### Validação de Entrada

✅ **FAÇA:**
```typescript
// Valide e normalize antes de processar
const normalized = normalizeString(userInput, { trim: true, removeControl: true });
if (isCPF(normalized)) {
  // Processar
}
```

❌ **NÃO FAÇA:**
```typescript
// Não confie em entrada do usuário sem validação
if (userInput) {
  // Processar
}
```

## Atualizações de Segurança

### Como Atualizar

1. **Dependências de desenvolvimento:**
   ```bash
   pnpm update
   ```

2. **Peer dependencies (se usado):**
   ```bash
   pnpm update zod
   ```

3. **Verifique vulnerabilidades:**
   ```bash
   pnpm audit
   ```

### Reportar Vulnerabilidades

Se você encontrar uma vulnerabilidade de segurança, por favor:

1. **NÃO** abra uma issue pública
2. Envie um e-mail para o mantenedor do pacote
3. Inclua detalhes sobre a vulnerabilidade
4. Aguarde confirmação antes de divulgar publicamente

## Headers de Segurança Recomendados

Além das funções do pacote, configure estes headers no servidor:

```typescript
// Express
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', cspHeader());
  next();
});
```

## Rate Limiting

O pacote fornece `rateLimitKey` para ajudar com rate limiting, mas você precisa de uma biblioteca:

```typescript
// Exemplo com express-rate-limit
import rateLimit from 'express-rate-limit';
import { rateLimitKey } from '@phdiniiz/utils/security';

const limiter = rateLimit({
  keyGenerator: (req) => rateLimitKey(req.ip, req.path),
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições
});
```

## Validação de Schema

Para validação robusta de schemas, use `validateSchema` com Zod:

```typescript
import { z } from 'zod';
import { validateSchema } from '@phdiniiz/utils/security';

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

const result = validateSchema(req.body, schema);
if (!result.success) {
  return res.status(400).json({ errors: result.errors });
}
```

## Notas Finais

- Sempre valide entrada no **server-side**
- Use escaping no **client-side** para renderização
- Mantenha dependências atualizadas
- Monitore logs de segurança
- Implemente logging e monitoramento adequados
- Use HTTPS em produção
- Configure CORS corretamente
- Implemente autenticação e autorização adequadas

Este pacote é uma ferramenta, não uma solução completa. Use-o como parte de uma estratégia de segurança abrangente.

