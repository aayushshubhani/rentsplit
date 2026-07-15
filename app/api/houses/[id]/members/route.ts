import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json([], { status: 401 })
  const { id } = await params
  const members = await db.houseMember.findMany({
    where: { houseId: id },
    include: { user: { select: { id: true, name: true, email: true } } },
  })
  return NextResponse.json(members.map(m => ({ id: m.userId, name: m.user.name, email: m.user.email })))
}
