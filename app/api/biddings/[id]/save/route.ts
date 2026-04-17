import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { KanbanStage } from '@prisma/client'
import { withAuth } from '@/lib/api-security'

interface RouteParams {
  params: { id: string }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  return withAuth(request, async (ctx) => {
    const { id: biddingId } = params
    const userId = ctx.userId

    // Verificar se licitação existe
    const biddingExists = await prisma.bidding.findUnique({
      where: { id: biddingId },
      select: { id: true },
    })

    if (!biddingExists) {
      return NextResponse.json(
        { error: 'Bidding not found' },
        { status: 404 }
      )
    }

    const existing = await prisma.savedBidding.findUnique({
      where: { userId_biddingId: { userId, biddingId } },
    })

    if (existing) {
      // Remover se já existe (toggle)
      await prisma.savedBidding.delete({
        where: { userId_biddingId: { userId, biddingId } },
      })
      return NextResponse.json({ saved: false })
    }

    const savedBidding = await prisma.savedBidding.create({
      data: {
        userId,
        biddingId,
        stage: KanbanStage.LEAD,
      },
    })

    return NextResponse.json(
      { saved: true, savedBidding },
      { status: 201 }
    )
  })
}
