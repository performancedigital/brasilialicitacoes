import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Status, PlanType } from '@prisma/client'
import { withAuth } from '@/lib/api-security'

interface RouteParams {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  return withAuth(
    request,
    async () => {
      const { id } = params

      let body: {
        status?: Status
        planType?: PlanType
        planExpiresAt?: string | null
      }
      
      try {
        body = await request.json()
      } catch {
        return NextResponse.json(
          { error: 'Invalid JSON body' },
          { status: 400 }
        )
      }

      const { status, planType, planExpiresAt } = body

      if (status === undefined && planType === undefined && planExpiresAt === undefined) {
        return NextResponse.json(
          { error: 'No fields to update' },
          { status: 400 }
        )
      }

      const validStatuses: Status[] = [Status.ACTIVE, Status.INACTIVE, Status.SUSPENDED]
      if (status !== undefined && !validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status value' },
          { status: 400 }
        )
      }

      const validPlanTypes: PlanType[] = [PlanType.FREE, PlanType.PRO, PlanType.INFINITY_PLUS]
      if (planType !== undefined && !validPlanTypes.includes(planType)) {
        return NextResponse.json(
          { error: 'Invalid planType value' },
          { status: 400 }
        )
      }

      const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      const updated = await prisma.user.update({
        where: { id },
        data: {
          ...(status !== undefined && { status }),
          ...(planType !== undefined && { planType }),
          ...(planExpiresAt !== undefined && {
            planExpiresAt: planExpiresAt ? new Date(planExpiresAt) : null,
          }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          planType: true,
          planExpiresAt: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      return NextResponse.json({ data: updated })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
