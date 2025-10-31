import { NextResponse } from "next/server"

export async function GET() {
  const client_id = process.env.GOOGLE_CLIENT_ID!
  const redirect_uri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`
  const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" ")

  const oauthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
  oauthUrl.searchParams.set("client_id", client_id)
  oauthUrl.searchParams.set("redirect_uri", redirect_uri)
  oauthUrl.searchParams.set("response_type", "code")
  oauthUrl.searchParams.set("scope", scope)
  oauthUrl.searchParams.set("access_type", "offline")
  oauthUrl.searchParams.set("prompt", "consent")

  return NextResponse.redirect(oauthUrl.toString())
}
