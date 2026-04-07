import { NextRequest, NextResponse } from 'next/server'
import { runSync } from '@/lib/integrations/core/engine'
import { getAllConnectors } from '@/lib/integrations/registry'

const CRON_SECRET = process.env.CRON_SECRET ?? ''

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const connectors = getAllConnectors()
  const results: Record<string, unknown> = {}

  for (const [code, connector] of Object.entries(connectors)) {
    try {
      const result = await runSync(code, connector)
      results[code] = result
    } catch (err) {
      results[code] = { error: err instanceof Error ? err.message : String(err) }
    }
  }

  return NextResponse.json({ ok: true, results })
}
