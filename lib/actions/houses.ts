'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getSession } from '@/lib/session'
import { createNotification, createAuditLog } from '@/lib/actions/notifications'

const HouseSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  city: z.string().optional(),
  splitMode: z.enum(['equal', 'percent', 'custom']),
})

export type HouseActionState = { errors?: Record<string, string[]>; message?: string } | undefined

export async function createHouseAction(state: HouseActionState, formData: FormData): Promise<HouseActionState> {
  const session = await getSession()
  if (!session) redirect('/login')

  const result = HouseSchema.safeParse({
    name: formData.get('name'),
    description: (formData.get('description') as string) || undefined,
    city: (formData.get('city') as string) || undefined,
    splitMode: formData.get('splitMode') || 'equal',
  })
  if (!result.success) return { errors: result.error.flatten().fieldErrors as Record<string, string[]> }

  const house = await db.house.create({
    data: {
      ...result.data,
      adminId: session.userId,
      members: { create: { userId: session.userId, role: 'admin' } },
    },
  })
  await createAuditLog(house.id, session.userId, 'House created', `"${house.name}" created`)
  redirect(`/dashboard/houses/${house.id}`)
}

export async function approveJoinRequest(requestId: string) {
  const session = await getSession()
  if (!session) return
  const req = await db.joinRequest.findUnique({ where: { id: requestId }, include: { house: true, user: true } })
  if (!req || req.house.adminId !== session.userId) return
  const existingMember = await db.houseMember.findUnique({ where: { houseId_userId: { houseId: req.houseId, userId: req.userId } } })
  if (!existingMember) {
    await db.houseMember.create({ data: { houseId: req.houseId, userId: req.userId, role: 'member' } })
  }
  await db.joinRequest.update({ where: { id: requestId }, data: { status: 'approved' } })
  await createNotification(req.userId, 'Join Request Approved', `You have been approved to join "${req.house.name}"`, `/dashboard/houses/${req.houseId}`)
  await createAuditLog(req.houseId, session.userId, 'Member approved', `${req.user.name} approved`)
  revalidatePath(`/dashboard/houses/${req.houseId}/members`)
}

export async function rejectJoinRequest(requestId: string) {
  const session = await getSession()
  if (!session) return
  const req = await db.joinRequest.findUnique({ where: { id: requestId }, include: { house: true, user: true } })
  if (!req || req.house.adminId !== session.userId) return
  await db.joinRequest.update({ where: { id: requestId }, data: { status: 'rejected' } })
  await createNotification(req.userId, 'Join Request Rejected', `Your request to join "${req.house.name}" was not approved.`)
  await createAuditLog(req.houseId, session.userId, 'Member rejected', `${req.user.name} rejected`)
  revalidatePath(`/dashboard/houses/${req.houseId}/members`)
}

export async function requestToJoin(token: string): Promise<{ error?: string; success?: boolean; houseName?: string }> {
  const session = await getSession()
  if (!session) redirect('/login')
  const house = await db.house.findUnique({ where: { inviteToken: token } })
  if (!house) return { error: 'Invalid invite link.' }
  const existing = await db.houseMember.findUnique({ where: { houseId_userId: { houseId: house.id, userId: session.userId } } })
  if (existing) return { error: 'You are already a member of this house.' }
  const existingReq = await db.joinRequest.findFirst({ where: { houseId: house.id, userId: session.userId } })
  if (existingReq) return { error: 'You already have a pending request.' }
  await db.joinRequest.create({ data: { houseId: house.id, userId: session.userId } })
  await createNotification(house.adminId, 'New Join Request', `Someone wants to join "${house.name}"`, `/dashboard/houses/${house.id}/members`)
  return { success: true, houseName: house.name }
}

export async function regenerateInviteToken(houseId: string) {
  const session = await getSession()
  if (!session) return
  const house = await db.house.findUnique({ where: { id: houseId } })
  if (!house || house.adminId !== session.userId) return
  const { v4: uuidv4 } = await import('uuid')
  await db.house.update({ where: { id: houseId }, data: { inviteToken: uuidv4() } })
  await createAuditLog(houseId, session.userId, 'Invite regenerated', 'New invite link created')
  revalidatePath(`/dashboard/houses/${houseId}/members`)
}

export async function removeMember(houseId: string, userId: string) {
  const session = await getSession()
  if (!session) return
  const house = await db.house.findUnique({ where: { id: houseId } })
  if (!house || house.adminId !== session.userId) return
  if (userId === house.adminId) return
  await db.houseMember.delete({ where: { houseId_userId: { houseId, userId } } })
  await createAuditLog(houseId, session.userId, 'Member removed', `Member removed from house`)
  revalidatePath(`/dashboard/houses/${houseId}/members`)
}
