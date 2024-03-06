import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
 
export async function middleware(request: NextRequest) {
  console.log("calling Middleware")
  const currentUser = cookies().get("access_token")?.value;
  console.log("Current User :: ", currentUser)
 
  if (currentUser && !request.nextUrl.pathname.startsWith('/')) {
    return Response.redirect(new URL('/', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],

}