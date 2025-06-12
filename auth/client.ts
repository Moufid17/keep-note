import { createBrowserClient } from '@supabase/ssr'
/*
* Gets the current user details if there is an existing session. This method performs a network request to the 
* Supabase Auth server, so the returned value is authentic and can be used to base authorization rules on.
* @returns Promise<User | null>
*/
// This function retreive user
export async function getClientUser() {
    // if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    //     throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
    // }
    const client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const {
        data: { user }, error
    } = await client.auth.getUser()

    if (error) {
        return null
    }
    return user
}