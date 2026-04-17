import { NextRequest, NextResponse } from 'next/server'
import { runSync } from '@/lib/integrations/core/engine'
import { getConnector } from '@/lib/integrations/registry'
import { withAuth } from '@/lib/api-security'

export async function POST(
  _req: NextRequest,
  { params }: { params: { source: string } }
) {
  return withAuth(
    _req,
    async () => {
      const { source } = params

      const connector = getConnector(source)
      const result = await runSync(source, connector)
      
      return NextResponse.json(result)
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
