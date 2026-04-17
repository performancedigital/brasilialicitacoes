import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth, parsePagination } from '@/lib/api-security'

export async function GET(req: NextRequest) {
  return withAuth(
    req,
    async () => {
      const { searchParams } = new URL(req.url)
      const sourceCode = searchParams.get('source')
      const { limit } = parsePagination(searchParams)

      const where = sourceCode ? { source: { code: sourceCode } } : {}

      const items = await prisma.integrationDeadLetter.findMany({
        where,
        include: { source: { select: { code: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })

      return NextResponse.json({ items, total: items.length })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
