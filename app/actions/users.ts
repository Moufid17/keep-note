'use server'
import { createClient } from '@/auth/server'
import { prismaClient } from '@/db/prisma'
import { handleError } from '@/lib/utils'

export async function login(email: string, password: string) {
  try {
    const supabase = await createClient()

    const data = { email, password }
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) throw error

    return {errorMessage: null}
  } catch (error) {
    handleError(error)
  }
}

export async function signup(email: string, password: string) {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.signUp({ email, password })
        
        if (error) throw error
        if (!data.user?.id) throw new Error("Error signing up")
        
        // add user to database
        await prismaClient.user.create({
            data: {
                id: data.user.id,
                email,
            }
        })
        return {errorMessage: null}
    } catch (error) {
        handleError(error)
    }
}

export async function logout() {
    try {
        const supabase = await createClient()
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        return {errorMessage: null}
    } catch (error) {
        handleError(error)
    }
}