import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: any) {
  const token: any = await getToken({ req, secret })

  if (token && token.userRole !== "user") return NextResponse.next()

  return new Response("Admin auth required")
}
