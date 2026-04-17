import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/api-security'

interface RouteParams {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  return withAuth(
    request,
    async () => {
      const { id } = params

      let body: { name?: string; url?: string; isActive?: boolean }
      
      try {
        body = await request.json()
      } catch {
        return NextResponse.json(
          { error: 'Invalid JSON body' },
          { status: 400 }
        )
      }

      const { name, url, isActive } = body

      if (name === undefined && url === undefined && isActive === undefined) {
        return NextResponse.json(
          { error: 'No fields to update' },
          { status: 400 }
        )
      }

      const portal = await prisma.portal.findUnique({
        where: { id },
        select: { id: true },
      })

      if (!portal) {
        return NextResponse.json(
          { error: 'Portal not found' },
          { status: 404 }
        )
      }

      const updated = await prisma.portal.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(url !== undefined && { url }),
          ...(isActive !== undefined && { isActive }),
        },
      })

      return NextResponse.json({ data: updated })
    },
    { requireAdmin: true, skipRateLimit: true }
  )
}
