import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/api-security'

export async function GET(request: NextRequest) {
  return withAuth(request, async (ctx) => {
    const userId = ctx.userId

    const savedBiddings = await prisma.savedBidding.findMany({
      where: { userId },
      include: {
        bidding: {
          include: {
            portal: {
              select: { name: true, type: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: savedBiddings })
  })
}
