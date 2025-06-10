import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * This function creates a Supabase client that can be used in server components
 * @returns 
 */
export async function createClient() {
    const cookieStore = await cookies()
    const client = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value }) =>
                            cookieStore.set(name, value)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )

    return client
}

/*
* Gets the current user details if there is an existing session. This method performs a network request to the 
* Supabase Auth server, so the returned value is authentic and can be used to base authorization rules on.
* @returns Promise<User | null>
*/
// This function retreive user
export async function getUser() {
    const client = await createClient()
    const {
        data: { user }, error
    } = await client.auth.getUser()

    if (error) {
        return null
    }
    return user
}

export async function getSession() {
    const client = await createClient()
    const {
        data: { session }, error
    } = await client.auth.getSession()

    if (error) {
        console.log('Error getting session:', error.message)
        return null
    }

    return session
}