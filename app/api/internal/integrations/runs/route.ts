import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth, parsePagination } from '@/lib/api-security'

export async function GET(req: NextRequest) {
  return withAuth(
    req,
    async () => {
      const { searchParams } = new URL(req.url)
      const sourceCode = searchParams.get('source')
      const status = searchParams.get('status')
      const { limit } = parsePagination(searchParams)

      const sourceFilter = sourceCode
        ? { source: { code: sourceCode } }
        : {}

      const statusFilter = status
        ? { status: status as 'PENDING' | 'RUNNING' | 'SUCCESS' | 'PARTIAL' | 'FAILED' }
        : {}

      const runs = await prisma.integrationRun.findMany({
        where: { ...sourceFilter, ...statusFilter },
        include: { source: { select: { code: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })

      return NextResponse.json({ runs })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
