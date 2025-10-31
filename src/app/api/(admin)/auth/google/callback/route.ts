import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseClient"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 })
  }

  // 1️⃣ แลก code เป็น access_token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  })

  const tokenData = await tokenRes.json()
  if (!tokenRes.ok) {
    console.error(tokenData)
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 })
  }

  // 2️⃣ ดึงข้อมูลผู้ใช้จาก Google
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })
  const googleUser = await userRes.json()
  const { email, name, picture } = googleUser

  // 3️⃣ ตรวจสอบ/สร้างผู้ใช้ใน Supabase (ตาราง users ใหม่)
  const { data: existingUser, error: fetchError } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("provider", "google")
    .maybeSingle() // ใช้ maybeSingle() เผื่อไม่เจอ

  let userId: string

  if (existingUser) {
    // ✅ ใช้ record เดิม
    userId = existingUser.id
  } else {
    // ✅ insert ใหม่
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from("users")
      .insert([{ email, name, picture, provider: "google" }])
      .select()
      .maybeSingle()
    if (insertError) {
      console.error("Error creating user:", insertError)
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }
    userId = newUser.id
  }

  // 4️⃣ สร้าง response และเซ็ต cookie
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/homepage`)
  response.cookies.set(
    "session",
    JSON.stringify({ id: userId, email, provider: "google" }), // เพิ่ม provider ลง cookie
    {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }
  )

  return response
}
