import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getConnector } from '@/lib/integrations/registry'
import { withAuth } from '@/lib/api-security'

export async function GET(
  _req: NextRequest,
  { params }: { params: { source: string } }
) {
  return withAuth(
    _req,
    async () => {
      const { source } = params

      const sourceRecord = await prisma.integrationSource.findUnique({
        where: { code: source },
      })
      
      if (!sourceRecord) {
        return NextResponse.json(
          { error: 'Source nao encontrada' },
          { status: 404 }
        )
      }

      const [lastRun, cursor, dlqCount] = await Promise.all([
        prisma.integrationRun.findFirst({
          where: { sourceId: sourceRecord.id },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.integrationCursor.findUnique({
          where: {
            sourceId_endpoint: {
              sourceId: sourceRecord.id,
              endpoint: 'default',
            },
          },
        }),
        prisma.integrationDeadLetter.count({
          where: { sourceId: sourceRecord.id },
        }),
      ])

      let health: { ok: boolean; latencyMs: number; message: string } = {
        ok: false,
        latencyMs: 0,
        message: 'Healthcheck nao executado',
      }
      
      try {
        const connector = getConnector(source)
        const rawHealth = await connector.healthCheck()
        health = {
          ok: rawHealth.ok,
          latencyMs: rawHealth.latencyMs,
          message: rawHealth.message ?? '',
        }
      } catch (err) {
        health.message = err instanceof Error ? err.message : 'Erro no healthcheck'
      }

      return NextResponse.json({
        source: sourceRecord,
        lastRun,
        cursor: cursor?.lastValue ?? null,
        dlqCount,
        health,
      })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
