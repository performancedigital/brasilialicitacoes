# Correção de Portais - Documentação

## Problema
O deploy anterior foi realizado em um cenário com múltiplos conectores, porém a maior parte dos portais estaduais/privados não possui API pública REST estável/documentada. Isso aumentava falhas de sync e custo de manutenção.

## Causa Root
- Escopo de conectores maior que a capacidade real de integração por API pública
- Dependência de endpoints não confiáveis para diversos estados
- Divergência entre portal cadastrado, fonte de integração e health checks

## Solução
1. Consolidar escopo para duas fontes públicas confiáveis:
   - `pncp`
   - `comprasnet`
2. Ajustar schema e APIs administrativas para refletir esse escopo
3. Adotar seed oficial para manter cadastro consistente de `Portal` e `IntegrationSource`
4. Reforçar segurança do cron e rate limiting persistente

## Portais que devem estar ATIVOS
- pncp
- comprasnet

## Portais fora do escopo atual
- compras-rs
- compras-bahia
- compras-amazonas
- compras-rj
- comprasnet-goias
- compras-mg
- banpara
- pe-integrado
- e-lic-sc
- licitacoes-e
- bll
- licitanet

## Status da Correção
✅ **ATUALIZADO** - 13/05/2026
- Arquitetura consolidada para PNCP + ComprasNet
- Enum `PortalType` reduzido para 2 valores
- Seed oficial criado (`prisma/seed.js`)
- Rate limit migrado para PostgreSQL
- Cron protegido com `CRON_SECRET` + fallback Vercel

## Documentação complementar
- `docs/ATUALIZACAO_ARQUITETURA_2026-05.md`
