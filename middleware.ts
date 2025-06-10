import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getUser } from '@/auth/server'
import { prismaClient } from './db/prisma'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
      request,
    })
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )
    
    const isAuthROute =
      request.nextUrl.pathname.toLowerCase().startsWith('/login') ||
      request.nextUrl.pathname.toLowerCase().startsWith('/sign-up')

    if (isAuthROute) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // user is already logged in, redirect to the dashboard
      if (user) {
        return NextResponse.redirect(
          new URL("/notes", process.env.NEXT_PUBLIC_BASE_URL),
        );
      }
    }
    
    const {searchParams, pathname} = new URL(request.url)
    
    if (!searchParams.get("noteId") && pathname.toLowerCase() === "/notes") {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { newestNoteId } = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-newest-note?email=${user.email}`,
        ).then((res) => res.json());
        console.log("newestNoteId", newestNoteId);
        
        
        if (newestNoteId) {
          const url = request.nextUrl.clone();
          url.searchParams.set("noteId", newestNoteId);
          return NextResponse.redirect(url);
        } else {
          const { noteId } = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-new-note?email=${user.email}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            },
          ).then((res) => res.json());
          
          if (noteId) {
            const url = request.nextUrl.clone();
            url.searchParams.set("noteId", noteId);
            return NextResponse.redirect(url);
          }
        }
      } else {
        return NextResponse.redirect(
          new URL("/login", process.env.NEXT_PUBLIC_BASE_URL),
        );
      }
    }
    
    return supabaseResponse
  }