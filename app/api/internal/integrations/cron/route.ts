import { NextRequest, NextResponse } from 'next/server'
import { runSync } from '@/lib/integrations/core/engine'
import { getAllConnectors } from '@/lib/integrations/registry'

const CRON_SECRET = process.env.CRON_SECRET

function validateCronAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')

  if (CRON_SECRET) {
    return authHeader === `Bearer ${CRON_SECRET}`
  }

  // Sem CRON_SECRET configurado: aceitar apenas requests com header x-vercel-cron
  // (header interno injetado pelo Vercel Cron, nao forgeable pelo cliente)
  return req.headers.get('x-vercel-cron') === 'true'
}

async function runCronSync() {
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

// Vercel Cron Jobs enviam GET por padrao
export async function GET(req: NextRequest) {
  if (!validateCronAuth(req)) {
    return NextResponse.json({ error: 'Nao autorizado - configure CRON_SECRET' }, { status: 401 })
  }
  return runCronSync()
}

// Chamada manual via API
export async function POST(req: NextRequest) {
  if (!validateCronAuth(req)) {
    return NextResponse.json({ error: 'Nao autorizado - configure CRON_SECRET' }, { status: 401 })
  }
  return runCronSync()
}
