'use server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createNotification(userId: string, title: string, body: string, link?: string) {
  try {
    await db.notification.create({ data: { userId, title, body, link: link ?? null } })
  } catch { /* silent */ }
}

export async function createAuditLog(houseId: string, userId: string, action: string, details?: string) {
  try {
    await db.auditLog.create({ data: { houseId, userId, action, details: details ?? null } })
  } catch { /* silent */ }
}

export async function markAllNotificationsRead(userId: string) {
  await db.notification.updateMany({ where: { userId, read: false }, data: { read: true } })
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/notifications')
}
