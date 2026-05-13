import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'

const RATE_LIMITS = {
  FREE: { requests: 30, windowMs: 60 * 1000, tokens: 1000 },
  PRO: { requests: 100, windowMs: 60 * 1000, tokens: 10000 },
  INFINITY_PLUS: { requests: 300, windowMs: 60 * 1000, tokens: 50000 },
}

function getRateLimitKey(userId: string, endpoint?: string): string {
  const window = Math.floor(Date.now() / 60000)
  return endpoint ? `ratelimit:${userId}:${endpoint}:${window}` : `ratelimit:${userId}:${window}`
}

async function cleanupExpiredEntries(): Promise<void> {
  if (Math.random() < 0.02) {
    await prisma.rateLimitEntry.deleteMany({
      where: { resetAt: { lt: new Date() } },
    })
  }
}

export async function checkRateLimit(
  userId: string,
  planType: 'FREE' | 'PRO' | 'INFINITY_PLUS',
  endpoint?: string
): Promise<{
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfter?: number
}> {
  const limits = RATE_LIMITS[planType] || RATE_LIMITS.FREE
  const key = getRateLimitKey(userId, endpoint)
  const now = Date.now()
  const newResetAt = new Date(now + limits.windowMs)

  const existing = await prisma.rateLimitEntry.findUnique({ where: { key } })
  await cleanupExpiredEntries()

  if (!existing || existing.resetAt.getTime() < now) {
    const entry = await prisma.rateLimitEntry.upsert({
      where: { key },
      create: {
        key,
        count: 1,
        resetAt: newResetAt,
        tokensUsed: 0,
      },
      update: {
        count: 1,
        resetAt: newResetAt,
        tokensUsed: 0,
      },
    })

    return {
      allowed: true,
      limit: limits.requests,
      remaining: limits.requests - 1,
      resetAt: entry.resetAt.getTime(),
    }
  }

  if (existing.count >= limits.requests) {
    return {
      allowed: false,
      limit: limits.requests,
      remaining: 0,
      resetAt: existing.resetAt.getTime(),
      retryAfter: Math.ceil((existing.resetAt.getTime() - now) / 1000),
    }
  }

  const updated = await prisma.rateLimitEntry.update({
    where: { key },
    data: { count: { increment: 1 } },
  })

  return {
    allowed: true,
    limit: limits.requests,
    remaining: limits.requests - updated.count,
    resetAt: updated.resetAt.getTime(),
  }
}

export async function trackTokenUsage(
  userId: string,
  planType: 'FREE' | 'PRO' | 'INFINITY_PLUS',
  tokensUsed: number
): Promise<{
  allowed: boolean
  tokensLimit: number
  tokensRemaining: number
}> {
  const limits = RATE_LIMITS[planType] || RATE_LIMITS.FREE
  const key = getRateLimitKey(userId, 'tokens')
  const now = Date.now()
  const newResetAt = new Date(now + limits.windowMs)

  const existing = await prisma.rateLimitEntry.findUnique({ where: { key } })
  await cleanupExpiredEntries()

  if (!existing || existing.resetAt.getTime() < now) {
    if (tokensUsed > limits.tokens) {
      return {
        allowed: false,
        tokensLimit: limits.tokens,
        tokensRemaining: 0,
      }
    }

    await prisma.rateLimitEntry.upsert({
      where: { key },
      create: {
        key,
        count: 0,
        resetAt: newResetAt,
        tokensUsed,
      },
      update: {
        count: 0,
        resetAt: newResetAt,
        tokensUsed,
      },
    })

    return {
      allowed: true,
      tokensLimit: limits.tokens,
      tokensRemaining: limits.tokens - tokensUsed,
    }
  }

  const totalTokens = existing.tokensUsed + tokensUsed
  if (totalTokens > limits.tokens) {
    return {
      allowed: false,
      tokensLimit: limits.tokens,
      tokensRemaining: Math.max(0, limits.tokens - existing.tokensUsed),
    }
  }

  const updated = await prisma.rateLimitEntry.update({
    where: { key },
    data: { tokensUsed: totalTokens },
  })

  return {
    allowed: true,
    tokensLimit: limits.tokens,
    tokensRemaining: limits.tokens - updated.tokensUsed,
  }
}

export function getRateLimitHeaders(result: {
  limit: number
  remaining: number
  resetAt: number
}): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  }
}

export function createRateLimitResponse(retryAfter: number): NextResponse {
  return NextResponse.json(
    {
      error: 'Rate limit exceeded',
      message: `Muitas requisicoes. Tente novamente em ${retryAfter} segundos.`,
      retryAfter,
    },
    {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) },
    }
  )
}

export async function rateLimitMiddleware(
  request: NextRequest,
  userId: string,
  planType: 'FREE' | 'PRO' | 'INFINITY_PLUS'
): Promise<{
  allowed: boolean
  response?: NextResponse
  headers?: Record<string, string>
}> {
  const endpoint = request.nextUrl.pathname
  const result = await checkRateLimit(userId, planType, endpoint)

  if (!result.allowed) {
    return {
      allowed: false,
      response: createRateLimitResponse(result.retryAfter || 60),
    }
  }

  return {
    allowed: true,
    headers: getRateLimitHeaders(result),
  }
}