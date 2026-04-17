import { NextRequest, NextResponse } from 'next/server'

/**
 * Rate Limiting por usuário - Armazenamento em memória
 * Para produção com múltiplas instâncias, usar Redis
 */

interface RateLimitEntry {
  count: number
  resetAt: number
  tokensUsed: number
}

// Store em memória (substituir por Redis em produção multi-instância)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Limites por plano
const RATE_LIMITS = {
  FREE: { requests: 30, windowMs: 60 * 1000, tokens: 1000 },        // 30 req/min, 1000 tokens
  PRO: { requests: 100, windowMs: 60 * 1000, tokens: 10000 },       // 100 req/min, 10000 tokens
  INFINITY_PLUS: { requests: 300, windowMs: 60 * 1000, tokens: 50000 }, // 300 req/min, 50000 tokens
}

/**
 * Gera chave única para rate limiting
 */
function getRateLimitKey(userId: string, endpoint?: string): string {
  const window = Math.floor(Date.now() / 60000) // Janela de 1 minuto
  return endpoint 
    ? `ratelimit:${userId}:${endpoint}:${window}`
    : `ratelimit:${userId}:${window}`
}

/**
 * Verifica rate limit para um usuário
 * @returns objeto com status e informações de limite
 */
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
  
  const entry = rateLimitStore.get(key)
  
  // Se não existe entrada ou já expirou, criar nova
  if (!entry || entry.resetAt < now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + limits.windowMs,
      tokensUsed: 0,
    }
    rateLimitStore.set(key, newEntry)
    
    // Limpar entradas antigas periodicamente
    if (Math.random() < 0.01) {
      cleanupOldEntries()
    }
    
    return {
      allowed: true,
      limit: limits.requests,
      remaining: limits.requests - 1,
      resetAt: newEntry.resetAt,
    }
  }
  
  // Verificar se excedeu limite
  if (entry.count >= limits.requests) {
    return {
      allowed: false,
      limit: limits.requests,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    }
  }
  
  // Incrementar contador
  entry.count++
  rateLimitStore.set(key, entry)
  
  return {
    allowed: true,
    limit: limits.requests,
    remaining: limits.requests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Registra uso de tokens (para APIs de IA)
 */
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
  
  const entry = rateLimitStore.get(key)
  
  if (!entry || entry.resetAt < now) {
    // Nova janela
    if (tokensUsed > limits.tokens) {
      return {
        allowed: false,
        tokensLimit: limits.tokens,
        tokensRemaining: 0,
      }
    }
    
    rateLimitStore.set(key, {
      count: 0,
      resetAt: now + limits.windowMs,
      tokensUsed,
    })
    
    return {
      allowed: true,
      tokensLimit: limits.tokens,
      tokensRemaining: limits.tokens - tokensUsed,
    }
  }
  
  const totalTokens = entry.tokensUsed + tokensUsed
  
  if (totalTokens > limits.tokens) {
    return {
      allowed: false,
      tokensLimit: limits.tokens,
      tokensRemaining: Math.max(0, limits.tokens - entry.tokensUsed),
    }
  }
  
  entry.tokensUsed = totalTokens
  rateLimitStore.set(key, entry)
  
  return {
    allowed: true,
    tokensLimit: limits.tokens,
    tokensRemaining: limits.tokens - totalTokens,
  }
}

/**
 * Retorna headers de rate limit para resposta HTTP
 */
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

/**
 * Cria resposta de erro de rate limit
 */
export function createRateLimitResponse(
  retryAfter: number
): NextResponse {
  return NextResponse.json(
    {
      error: 'Rate limit exceeded',
      message: `Muitas requisições. Tente novamente em ${retryAfter} segundos.`,
      retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
      },
    }
  )
}

/**
 * Limpa entradas antigas do store (chamado periodicamente)
 */
function cleanupOldEntries(): void {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Middleware de rate limiting para APIs
 * Uso: await rateLimitMiddleware(request, userId, planType)
 */
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
