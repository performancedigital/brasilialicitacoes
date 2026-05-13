# Plano de Correção - Conectores de Portais de Licitação (Revisado)

## Status
**Concluído (base técnica aplicada)**.

## Escopo vigente

O sistema passa a operar oficialmente com:

- `pncp`
- `comprasnet`

Conectores estaduais/privados foram retirados do fluxo principal por ausência de API pública REST estável/documentada.

---

## Mudanças consolidadas

## 1) Registry de conectores

- `lib/integrations/registry.ts` reduzido para PNCP e ComprasNet.

## 2) Tipos de portal

- `prisma/schema.prisma` atualizado:
  - `PortalType.PNCP`
  - `PortalType.COMPRAS_GOV`

## 3) Admin e dashboard alinhados ao novo escopo

- `app/admin/integrations/page.tsx` (`ALL_SOURCES`)
- `app/api/admin/portals/route.ts` (`validPortalTypes`)
- `app/dashboard/opportunities/page.tsx` (filtros e labels)
- `app/api/test-connectors/route.ts` (etapa única pública)

## 4) Segurança e operação

- `app/api/internal/integrations/cron/route.ts` com:
  - validação por `CRON_SECRET` quando definido
  - fallback por assinatura de origem Vercel

## 5) Rate limit persistente

- `lib/rate-limit.ts` reescrito para PostgreSQL
- Model `RateLimitEntry` adicionado em `prisma/schema.prisma`

## 6) Seed de consistência

- `prisma/seed.js` cria/atualiza:
  - `Portal`: PNCP, COMPRAS_GOV
  - `IntegrationSource`: pncp, comprasnet
- também desativa fontes fora do escopo.

## 7) Confiabilidade de conexão

- Timeouts aumentados:
  - `pncp.connector.ts`
  - `comprasnet.connector.ts`

---

## Procedimento pós-atualização

1. Aplicar migrações do Prisma
2. Gerar client:
   - `npx prisma generate`
3. Popular configuração base:
   - `npm run prisma:seed`
4. Validar:
   - `npm run build`
   - `GET /api/test-connectors?etapa=1`

---

## Nota de compatibilidade de dados

Caso existam dados legados de portais removidos, executar limpeza controlada antes/na migração do schema para evitar inconsistência com o novo enum.

---

## Referência principal

- `docs/ATUALIZACAO_ARQUITETURA_2026-05.md`
