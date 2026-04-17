import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth, canAccessBidding } from '@/lib/api-security'

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  return withAuth(request, async (ctx) => {
    const { id } = params

    const bidding = await prisma.bidding.findUnique({
      where: { id },
      include: {
        portal: {
          select: { name: true, type: true },
        },
        items: true,
        // Só retorna savedBy do usuário atual
        savedBy: {
          where: { userId: ctx.userId },
          select: { id: true, stage: true, notes: true, alertAt: true },
        },
      },
    })

    if (!bidding) {
      return NextResponse.json(
        { error: 'Bidding not found' },
        { status: 404 }
      )
    }

    const isSaved = bidding.savedBy.length > 0

    return NextResponse.json({
      bidding,
      isSaved,
      // Não expor savedBy de outros usuários
      savedCount: undefined,
    })
  })
}
