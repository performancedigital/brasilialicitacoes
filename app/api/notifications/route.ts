import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/api-security'
import { getTimeUntil } from '@/lib/utils'

export async function GET(request: NextRequest) {
  return withAuth(
    request,
    async (ctx) => {
      const now = new Date()
      const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      // Editais salvos do usuario que encerram nos proximos 7 dias
      const closingSoon = await prisma.savedBidding.findMany({
        where: {
          userId: ctx.userId,
          bidding: { status: 'OPEN', closingDate: { gte: now, lte: in7days } },
        },
        select: {
          biddingId: true,
          bidding: { select: { title: true, closingDate: true } },
        },
        orderBy: { bidding: { closingDate: 'asc' } },
        take: 8,
      })

      type Notif = { id: string; text: string; time: string; read: boolean; href: string }
      const notifications: Notif[] = closingSoon.map((s) => ({
        id: s.biddingId,
        text: `Encerra em breve: "${(s.bidding.title || 'Edital').slice(0, 60)}"`,
        time: getTimeUntil(s.bidding.closingDate),
        read: false,
        href: `/dashboard/bidding/${s.biddingId}`,
      }))

      // Novos editais coletados hoje (informativo)
      const newToday = await prisma.bidding.count({
        where: { status: 'OPEN', createdAt: { gte: startOfDay } },
      })
      if (newToday > 0) {
        notifications.unshift({
          id: 'new-today',
          text: `${newToday} novos editais coletados hoje`,
          time: 'hoje',
          read: false,
          href: '/dashboard/opportunities',
        })
      }

      return NextResponse.json({ notifications })
    },
    { skipRateLimit: true }
  )
}
