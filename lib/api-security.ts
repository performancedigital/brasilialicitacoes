import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId, getCurrentSession, createAuthErrorResponse } from './auth'
import { rateLimitMiddleware, trackTokenUsage } from './rate-limit'
import { prisma } from './prisma'

export { trackTokenUsage }

/**
 * Utilitários de segurança para APIs
 * Centraliza validação de autenticação, autorização e rate limiting
 */

interface ApiContext {
  userId: string
  email: string
  role: string
  status: string
  planType: 'FREE' | 'PRO' | 'INFINITY_PLUS'
}

/**
 * Wrapper seguro para handlers de API
 * Valida autenticação, rate limiting e retorna contexto do usuário
 */
export async function withAuth(
  request: NextRequest,
  handler: (ctx: ApiContext) => Promise<NextResponse | Response>,
  options?: {
    skipRateLimit?: boolean
    requireAdmin?: boolean
  }
): Promise<NextResponse> {
  try {
    // 1. Autenticação
    const session = await getCurrentSession()
    
    // 2. Verificar se usuário está suspenso
    if (session.status === 'SUSPENDED') {
      return NextResponse.json(
        { error: 'Account suspended' },
        { status: 403 }
      )
    }
    
    // 3. Verificar role de admin se necessário
    if (options?.requireAdmin) {
      if (session.role !== 'ADMIN' && session.role !== 'SUPERADMIN') {
        return NextResponse.json(
          { error: 'Forbidden: Admin access required' },
          { status: 403 }
        )
      }
    }
    
    // 4. Rate limiting (exceto para admins ou se skipRateLimit)
    if (!options?.skipRateLimit && session.role !== 'SUPERADMIN') {
      const rateLimit = await rateLimitMiddleware(
        request,
        session.userId,
        session.planType as 'FREE' | 'PRO' | 'INFINITY_PLUS'
      )
      
      if (!rateLimit.allowed) {
        return rateLimit.response!
      }
      
      // Executar handler
      const response = await handler({
        userId: session.userId,
        email: session.email,
        role: session.role,
        status: session.status,
        planType: session.planType as 'FREE' | 'PRO' | 'INFINITY_PLUS',
      })
      
      // Adicionar headers de rate limit
      if (rateLimit.headers) {
        const nextResponse = response instanceof NextResponse 
          ? response 
          : new NextResponse(response.body, response)
        Object.entries(rateLimit.headers).forEach(([key, value]) => {
          nextResponse.headers.set(key, value)
        })
        return nextResponse
      }
      
      return response instanceof NextResponse 
        ? response 
        : new NextResponse(response.body, response)
    }
    
    // Sem rate limiting
    const response = await handler({
      userId: session.userId,
      email: session.email,
      role: session.role,
      status: session.status,
      planType: session.planType as 'FREE' | 'PRO' | 'INFINITY_PLUS',
    })
    
    return response instanceof NextResponse 
      ? response 
      : new NextResponse(response.body, response)
    
  } catch (error) {
    const { status, body } = createAuthErrorResponse(error as Error)
    return NextResponse.json(body, { status })
  }
}

/**
 * Verifica se um recurso salvo pertence ao usuário
 * @throws Error se recurso não existir ou não pertencer ao usuário
 */
export async function verifyResourceOwnership(
  resourceType: 'savedBidding' | 'alert',
  resourceId: string,
  userId: string
): Promise<void> {
  let exists = false
  
  switch (resourceType) {
    case 'savedBidding':
      const saved = await prisma.savedBidding.findFirst({
        where: { id: resourceId, userId },
        select: { id: true },
      })
      exists = !!saved
      break
      
    case 'alert':
      const alert = await prisma.alert.findFirst({
        where: { id: resourceId, userId },
        select: { id: true },
      })
      exists = !!alert
      break
  }
  
  if (!exists) {
    throw new Error('Resource not found or access denied')
  }
}

/**
 * Valida se usuário pode acessar uma licitação específica
 * Para licitações públicas, todos podem ver
 * Para licitações salvas, verifica propriedade
 */
export async function canAccessBidding(
  biddingId: string,
  userId: string,
  requireSaved: boolean = false
): Promise<boolean> {
  if (!requireSaved) {
    // Licitações públicas: verificar se existe
    const bidding = await prisma.bidding.findUnique({
      where: { id: biddingId },
      select: { id: true },
    })
    return !!bidding
  }
  
  // Verificar se usuário salvou a licitação
  const saved = await prisma.savedBidding.findUnique({
    where: { userId_biddingId: { userId, biddingId } },
    select: { id: true },
  })
  return !!saved
}

/**
 * Cria resposta padronizada de erro
 */
export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, unknown>
): NextResponse {
  return NextResponse.json(
    { error: message, ...details },
    { status }
  )
}

/**
 * Cria resposta padronizada de sucesso
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200,
  meta?: Record<string, unknown>
): NextResponse {
  return NextResponse.json(
    { data, ...meta },
    { status }
  )
}

/**
 * Sanitiza input de busca para prevenir injeção
 */
export function sanitizeSearchInput(input: string | null): string | undefined {
  if (!input) return undefined
  
  // Remover caracteres especiais perigosos
  const sanitized = input
    .replace(/[<>\"']/g, '')
    .trim()
    .slice(0, 200) // Limitar tamanho
  
  return sanitized || undefined
}

/**
 * Valida e parseia parâmetros de paginação
 */
export function parsePagination(searchParams: URLSearchParams): {
  page: number
  limit: number
  skip: number
} {
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
  
  return {
    page,
    limit,
    skip: (page - 1) * limit,
  }
}
