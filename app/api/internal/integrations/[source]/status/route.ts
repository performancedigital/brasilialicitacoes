import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getConnector } from '@/lib/integrations/registry'

export async function GET(
  _req: NextRequest,
  { params }: { params: { source: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || !['ADMIN', 'SUPERADMIN'].includes(session.user?.role ?? '')) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const { source } = params

  const sourceRecord = await prisma.integrationSource.findUnique({ where: { code: source } })
  if (!sourceRecord) {
    return NextResponse.json({ error: 'Source nao encontrada' }, { status: 404 })
  }

  const [lastRun, cursor, dlqCount] = await Promise.all([
    prisma.integrationRun.findFirst({
      where: { sourceId: sourceRecord.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.integrationCursor.findUnique({
      where: { sourceId_endpoint: { sourceId: sourceRecord.id, endpoint: 'default' } },
    }),
    prisma.integrationDeadLetter.count({ where: { sourceId: sourceRecord.id } }),
  ])

  let health: { ok: boolean; latencyMs: number; message: string } = { ok: false, latencyMs: 0, message: 'Stub' }
  try {
    const connector = getConnector(source)
    const rawHealth = await connector.healthCheck()
    health = { ok: rawHealth.ok, latencyMs: rawHealth.latencyMs, message: rawHealth.message ?? '' }
  } catch {}

  return NextResponse.json({
    source: sourceRecord,
    lastRun,
    cursor: cursor?.lastValue ?? null,
    dlqCount,
    health,
  })
}
