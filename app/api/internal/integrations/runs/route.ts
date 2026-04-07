import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !['ADMIN', 'SUPERADMIN'].includes(session.user?.role ?? '')) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const sourceCode = searchParams.get('source')
  const status = searchParams.get('status')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100)

  const sourceFilter = sourceCode
    ? { source: { code: sourceCode } }
    : {}

  const statusFilter = status ? { status: status as 'PENDING' | 'RUNNING' | 'SUCCESS' | 'PARTIAL' | 'FAILED' } : {}

  const runs = await prisma.integrationRun.findMany({
    where: { ...sourceFilter, ...statusFilter },
    include: { source: { select: { code: true, name: true } } },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return NextResponse.json({ runs })
}
