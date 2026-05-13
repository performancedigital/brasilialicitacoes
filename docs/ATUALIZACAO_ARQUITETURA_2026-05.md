# Atualização de Arquitetura - Maio/2026

## Resumo

Esta atualização consolida a estratégia do produto para coleta de licitações com foco em **fontes públicas confiáveis**:

- `PNCP`
- `ComprasNet` (`dadosabertos.compras.gov.br`)

Também foram aplicadas melhorias de segurança, autenticação, sincronização e rate limiting.

---

## Mudanças Implementadas

### 1) Autenticação

- Removido `PrismaAdapter` do NextAuth.
- Mantido fluxo com `JWT` (Credentials Provider), simplificando o stack.

**Arquivo**: `lib/auth.ts`

---

### 2) Portais suportados

- O sistema passou a operar oficialmente com apenas:
  - `PNCP`
  - `COMPRAS_GOV`
- Conectores estaduais/privados foram removidos do registry e da camada de UI/API administrativa.

**Arquivos principais**:
- `lib/integrations/registry.ts`
- `app/admin/integrations/page.tsx`
- `app/dashboard/opportunities/page.tsx`
- `app/api/admin/portals/route.ts`
- `app/api/test-connectors/route.ts`

---

### 3) Modelo de dados

- Enum `PortalType` reduzido para:
  - `PNCP`
  - `COMPRAS_GOV`
- Adicionado model `RateLimitEntry` para rate limiting persistente em banco.

**Arquivo**: `prisma/schema.prisma`

---

### 4) Sincronização e engine

- Ajuste de tipagem na resolução de portal no `engine`.
- Seed oficial criado para garantir:
  - Portais base em `Portal`
  - Fontes base em `IntegrationSource`
  - Desativação automática de fontes fora do escopo atual

**Arquivos**:
- `lib/integrations/core/engine.ts`
- `prisma/seed.js`
- `package.json` (scripts/config de seed)

---

### 5) Segurança do cron

- Endpoint de cron agora segue política:
  - Se `CRON_SECRET` estiver definido: exige `Authorization: Bearer <CRON_SECRET>`
  - Se não estiver definido: aceita apenas chamadas com assinatura de origem Vercel (fallback)

**Arquivo**: `app/api/internal/integrations/cron/route.ts`

---

### 6) Rate limiting em produção

- Substituído store em memória por persistência em PostgreSQL.
- Controle de limite por plano e uso de tokens persistente entre instâncias serverless.

**Arquivo**: `lib/rate-limit.ts`

---

### 7) Confiabilidade de conectores

- Timeouts aumentados:
  - Fetch principal: `20s -> 30s`
  - Healthcheck: `15s -> 20s`

**Arquivos**:
- `lib/integrations/connectors/pncp.connector.ts`
- `lib/integrations/connectors/comprasnet.connector.ts`

---

## Variáveis de Ambiente

Atualizado `.env.example` com:

- `CRON_SECRET` (novo)

Removidas variáveis de conectores fora do escopo atual.

---

## Procedimento de Implantação

## 1. Atualizar schema no banco

Aplicar migrações Prisma correspondentes ao novo schema.

> Observação: a criação da migração pode exigir ambiente interativo local.

## 2. Gerar client Prisma

`npx prisma generate`

## 3. Executar seed oficial

`npm run prisma:seed`

## 4. Validar build

`npm run build`

## 5. Validar integrações

- `GET /api/test-connectors?etapa=1`
- `GET /api/test-connectors?etapa=all`

---

## Resultado Esperado

- Sincronização funcional apenas para `pncp` e `comprasnet`
- UI administrativa alinhada com fontes suportadas
- Cron protegido
- Rate limiting efetivo em serverless
- Menor custo de manutenção e menor risco operacional
