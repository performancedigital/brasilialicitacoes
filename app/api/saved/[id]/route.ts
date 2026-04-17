import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { KanbanStage } from '@prisma/client'
import { withAuth, verifyResourceOwnership } from '@/lib/api-security'

interface RouteParams {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  return withAuth(request, async (ctx) => {
    const { id } = params
    const userId = ctx.userId

    // Verificar propriedade do recurso
    await verifyResourceOwnership('savedBidding', id, userId)

    let body: { stage?: KanbanStage; notes?: string; alertAt?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const { stage, notes, alertAt } = body

    if (!stage && notes === undefined && alertAt === undefined) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    const updated = await prisma.savedBidding.update({
      where: { id },
      data: {
        ...(stage !== undefined && { stage }),
        ...(notes !== undefined && { notes }),
        ...(alertAt !== undefined && { alertAt: alertAt ? new Date(alertAt) : null }),
      },
    })

    return NextResponse.json({ data: updated })
  })
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  return withAuth(request, async (ctx) => {
    const { id } = params
    const userId = ctx.userId

    // Verificar propriedade do recurso
    await verifyResourceOwnership('savedBidding', id, userId)

    await prisma.savedBidding.delete({ where: { id } })

    return NextResponse.json({ success: true })
  })
}
