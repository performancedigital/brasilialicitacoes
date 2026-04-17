import { NextRequest, NextResponse } from 'next/server'
import { createPreference } from '@/lib/mercadopago'
import { withAuth } from '@/lib/api-security'

export async function POST(req: NextRequest) {
  return withAuth(req, async (ctx) => {
    const { planType } = await req.json()
    
    if (!planType || planType === 'FREE') {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    const preference = await createPreference(
      planType,
      ctx.userId,
      ctx.email
    )
    
    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
    })
  })
}
