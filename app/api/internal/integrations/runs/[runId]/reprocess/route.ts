import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  _req: NextRequest,
  { params }: { params: { runId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || !['ADMIN', 'SUPERADMIN'].includes(session.user?.role ?? '')) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const { runId } = params

  const updated = await prisma.integrationRawEvent.updateMany({
    where: { runId, status: 'FAILED' },
    data: { status: 'PENDING', errorMessage: null },
  })

  return NextResponse.json({ reprocessed: updated.count })
}
