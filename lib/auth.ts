import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth/next'
import { NextRequest } from 'next/server'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) return null
        if (user.status === 'SUSPENDED' || user.status === 'INACTIVE') return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          planType: user.planType,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.status = (user as any).status
        token.planType = (user as any).planType
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id
        ;(session.user as any).role = token.role
        ;(session.user as any).status = token.status
        ;(session.user as any).planType = token.planType
      }
      return session
    },
  },
}

/**
 * Obtém o ID do usuário autenticado
 * @throws Error se usuário não estiver autenticado
 */
export async function getCurrentUserId(): Promise<string> {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  
  const userId = (session.user as any).id as string
  
  if (!userId) {
    throw new Error('Invalid session: missing user id')
  }
  
  return userId
}

/**
 * Obtém a sessão completa do usuário
 * @throws Error se usuário não estiver autenticado
 */
export async function getCurrentSession() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  
  return {
    userId: (session.user as any).id as string,
    email: session.user.email as string,
    role: (session.user as any).role as string,
    status: (session.user as any).status as string,
    planType: (session.user as any).planType as string,
  }
}

/**
 * Verifica se o usuário tem role de admin
 */
export async function requireAdmin(): Promise<void> {
  const session = await getCurrentSession()
  
  if (session.role !== 'ADMIN' && session.role !== 'SUPERADMIN') {
    throw new Error('Forbidden: Admin access required')
  }
}

/**
 * Helper para APIs: retorna erro 401 ou 403 padronizado
 */
export function createAuthErrorResponse(error: Error): { status: number; body: { error: string } } {
  if (error.message === 'Unauthorized') {
    return { status: 401, body: { error: 'Unauthorized' } }
  }
  if (error.message.includes('Forbidden')) {
    return { status: 403, body: { error: 'Forbidden' } }
  }
  return { status: 500, body: { error: 'Internal Server Error' } }
}
