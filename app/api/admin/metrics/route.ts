import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Status, BiddingStatus, PlanType } from '@prisma/client'
import { withAuth } from '@/lib/api-security'

export async function GET(request: NextRequest) {
  return withAuth(
    request,
    async () => {
      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)

      const [
        totalUsers,
        activeUsers,
        totalBiddings,
        openBiddings,
        newBiddingsToday,
        totalSaved,
        activePortals,
        freeUsers,
        proUsers,
        infinityUsers,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { status: Status.ACTIVE } }),
        prisma.bidding.count(),
        prisma.bidding.count({ where: { status: BiddingStatus.OPEN } }),
        prisma.bidding.count({ where: { createdAt: { gte: startOfToday } } }),
        prisma.savedBidding.count(),
        prisma.portal.count({ where: { isActive: true } }),
        prisma.user.count({ where: { planType: PlanType.FREE } }),
        prisma.user.count({ where: { planType: PlanType.PRO } }),
        prisma.user.count({ where: { planType: PlanType.INFINITY_PLUS } }),
      ])

      return NextResponse.json({
        totalUsers,
        activeUsers,
        totalBiddings,
        openBiddings,
        newBiddingsToday,
        totalSaved,
        activePortals,
        byPlan: { FREE: freeUsers, PRO: proUsers, INFINITY_PLUS: infinityUsers },
      })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
