'use server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { createSession, deleteSession } from '@/lib/session'

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type ActionState = { errors?: Record<string, string[]>; message?: string } | undefined

export async function registerAction(state: ActionState, formData: FormData): Promise<ActionState> {
  const result = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!result.success) return { errors: result.error.flatten().fieldErrors as Record<string, string[]> }

  const { name, email, password } = result.data
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) return { message: 'An account with this email already exists.' }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await db.user.create({ data: { name, email, passwordHash } })
  await createSession(user.id, user.name, user.email)
  redirect('/dashboard')
}

export async function loginAction(state: ActionState, formData: FormData): Promise<ActionState> {
  const result = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!result.success) return { errors: result.error.flatten().fieldErrors as Record<string, string[]> }

  const { email, password } = result.data
  const user = await db.user.findUnique({ where: { email } })
  if (!user || !user.passwordHash) return { message: 'Invalid email or password.' }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return { message: 'Invalid email or password.' }

  await createSession(user.id, user.name, user.email)
  redirect('/dashboard')
}

export async function logoutAction() {
  await deleteSession()
  redirect('/login')
}
