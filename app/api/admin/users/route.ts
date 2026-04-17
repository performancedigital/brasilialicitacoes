import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Status, PlanType, Prisma } from '@prisma/client'
import { withAuth, parsePagination, sanitizeSearchInput } from '@/lib/api-security'

export async function GET(request: NextRequest) {
  return withAuth(
    request,
    async () => {
      const { searchParams } = new URL(request.url)
      const search = sanitizeSearchInput(searchParams.get('search'))
      const statusFilter = searchParams.get('status') as Status | null
      const planTypeFilter = searchParams.get('planType') as PlanType | null

      const { page, limit, skip } = parsePagination(searchParams)

      const where: Prisma.UserWhereInput = {}

      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
        ]
      }

      const validStatuses: Status[] = [Status.ACTIVE, Status.INACTIVE, Status.SUSPENDED]
      if (statusFilter && validStatuses.includes(statusFilter)) {
        where.status = statusFilter
      }

      const validPlanTypes: PlanType[] = [PlanType.FREE, PlanType.PRO, PlanType.INFINITY_PLUS]
      if (planTypeFilter && validPlanTypes.includes(planTypeFilter)) {
        where.planType = planTypeFilter
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            status: true,
            planType: true,
            planExpiresAt: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.user.count({ where }),
      ])

      const totalPages = Math.ceil(total / limit)

      return NextResponse.json({ data: users, total, page, limit, totalPages })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}

export async function POST(request: NextRequest) {
  return withAuth(
    request,
    async () => {
      let body: {
        email: string
        name?: string
        password: string
        role?: string
        planType?: string
        cnpj?: string
        phone?: string
        company?: string
      }
      
      try {
        body = await request.json()
      } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
      }

      const {
        email,
        name,
        password,
        role = 'USER',
        planType = 'FREE',
        cnpj,
        phone,
        company,
      } = body
      
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email e senha são obrigatórios' },
          { status: 400 }
        )
      }

      const bcrypt = await import('bcryptjs')
      const hashedPassword = await bcrypt.hash(password, 12)
      
      try {
        const user = await prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
            role: role as any,
            planType: planType as any,
            cnpj,
            phone,
            company,
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            planType: true,
            createdAt: true,
          },
        })
        return NextResponse.json(user, { status: 201 })
      } catch (error: any) {
        if (error?.code === 'P2002') {
          return NextResponse.json(
            { error: 'E-mail já cadastrado' },
            { status: 409 }
          )
        }
        throw error
      }
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
