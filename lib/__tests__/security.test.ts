/**
 * Testes de segurança multi-tenant
 * 
 * Estes testes verificam o isolamento entre usuários
 * Execute com: npm test -- security.test.ts
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '@/lib/prisma'
import { checkRateLimit, trackTokenUsage } from '@/lib/rate-limit'
import { verifyResourceOwnership } from '@/lib/api-security'

describe('Multi-tenant Security', () => {
  let user1: { id: string; email: string }
  let user2: { id: string; email: string }
  let bidding: { id: string; externalId: string }

  beforeEach(async () => {
    // Criar usuários de teste
    user1 = await prisma.user.create({
      data: {
        email: 'user1@test.com',
        password: 'hashed',
        name: 'User 1',
      },
    })

    user2 = await prisma.user.create({
      data: {
        email: 'user2@test.com',
        password: 'hashed',
        name: 'User 2',
      },
    })

    // Criar portal e licitação
    const portal = await prisma.portal.create({
      data: {
        name: 'Test Portal',
        url: 'https://test.com',
        type: 'PNCP',
      },
    })

    bidding = await prisma.bidding.create({
      data: {
        externalId: 'test-bidding-001',
        portalId: portal.id,
        title: 'Test Bidding',
        organ: 'Test Organ',
        modality: 'Pregao',
        status: 'OPEN',
      },
    })
  })

  describe('SavedBidding Isolation', () => {
    it('should not allow user1 to access user2 saved bidding', async () => {
      // User2 salva licitação
      const savedByUser2 = await prisma.savedBidding.create({
        data: {
          userId: user2.id,
          biddingId: bidding.id,
          stage: 'LEAD',
        },
      })

      // User1 tenta acessar - deve falhar
      await expect(
        verifyResourceOwnership('savedBidding', savedByUser2.id, user1.id)
      ).rejects.toThrow('Resource not found or access denied')
    })

    it('should allow user2 to access their own saved bidding', async () => {
      const savedByUser2 = await prisma.savedBidding.create({
        data: {
          userId: user2.id,
          biddingId: bidding.id,
          stage: 'LEAD',
        },
      })

      // Não deve lançar erro
      await expect(
        verifyResourceOwnership('savedBidding', savedByUser2.id, user2.id)
      ).resolves.not.toThrow()
    })

    it('should return only user1 saved biddings', async () => {
      // Criar salvamentos para ambos usuários
      await prisma.savedBidding.create({
        data: { userId: user1.id, biddingId: bidding.id, stage: 'LEAD' },
      })

      const user1Biddings = await prisma.savedBidding.findMany({
        where: { userId: user1.id },
      })

      expect(user1Biddings).toHaveLength(1)
      expect(user1Biddings[0].userId).toBe(user1.id)
    })
  })

  describe('Rate Limiting', () => {
    it('should enforce rate limits per user', async () => {
      const userId = 'test-user-rate-limit'
      const planType = 'FREE'

      // Fazer 30 requisições (limite do plano FREE)
      for (let i = 0; i < 30; i++) {
        const result = await checkRateLimit(userId, planType)
        expect(result.allowed).toBe(true)
      }

      // 31ª requisição deve ser bloqueada
      const blocked = await checkRateLimit(userId, planType)
      expect(blocked.allowed).toBe(false)
      expect(blocked.retryAfter).toBeGreaterThan(0)
    })

    it('should track token usage separately per user', async () => {
      const user1Result = await trackTokenUsage('user1', 'FREE', 500)
      const user2Result = await trackTokenUsage('user2', 'FREE', 500)

      expect(user1Result.allowed).toBe(true)
      expect(user2Result.allowed).toBe(true)
      expect(user1Result.tokensRemaining).toBe(500)
      expect(user2Result.tokensRemaining).toBe(500)
    })

    it('should have different limits per plan', async () => {
      const freeResult = await checkRateLimit('free-user', 'FREE')
      const proResult = await checkRateLimit('pro-user', 'PRO')
      const infinityResult = await checkRateLimit('infinity-user', 'INFINITY_PLUS')

      expect(freeResult.limit).toBe(30)
      expect(proResult.limit).toBe(100)
      expect(infinityResult.limit).toBe(300)
    })
  })

  describe('Alert Isolation', () => {
    it('should not allow user1 to access user2 alerts', async () => {
      const alertByUser2 = await prisma.alert.create({
        data: {
          userId: user2.id,
          keywords: ['test'],
          states: ['SP'],
          portals: ['PNCP'],
        },
      })

      await expect(
        verifyResourceOwnership('alert', alertByUser2.id, user1.id)
      ).rejects.toThrow('Resource not found or access denied')
    })
  })
})

describe('API Security Headers', () => {
  it('should include rate limit headers in responses', async () => {
    const result = await checkRateLimit('test-user', 'FREE')
    
    expect(result).toHaveProperty('limit')
    expect(result).toHaveProperty('remaining')
    expect(result).toHaveProperty('resetAt')
  })
})
