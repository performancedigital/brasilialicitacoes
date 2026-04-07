import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { runSync } from '@/lib/integrations/core/engine'
import { getConnector } from '@/lib/integrations/registry'

export async function POST(
  _req: NextRequest,
  { params }: { params: { source: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || !['ADMIN', 'SUPERADMIN'].includes(session.user?.role ?? '')) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const { source } = params

  try {
    const connector = getConnector(source)
    const result = await runSync(source, connector)
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}
