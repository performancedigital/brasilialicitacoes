import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/api-security'

export async function POST(
  _req: NextRequest,
  { params }: { params: { runId: string } }
) {
  return withAuth(
    _req,
    async () => {
      const { runId } = params

      const updated = await prisma.integrationRawEvent.updateMany({
        where: { runId, status: 'FAILED' },
        data: { status: 'PENDING', errorMessage: null },
      })

      return NextResponse.json({ reprocessed: updated.count })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
