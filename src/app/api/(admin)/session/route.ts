import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseClient"

export async function GET(req: Request) {
  // 🧩 ดึงค่า session จาก cookie
  const cookie = (req.headers.get("cookie") || "")
    .split(";")
    .find((c) => c.trim().startsWith("session="))

  if (!cookie) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    // 📦 แปลงข้อมูล session กลับจาก cookie
    const session = JSON.parse(decodeURIComponent(cookie.split("=")[1]))

    const email = session?.email
    const provider = session?.provider || "form" // default เป็น form

    if (!email) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // ✅ ดึงข้อมูลผู้ใช้จากฐานข้อมูล (users table) ตาม provider
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("id, name, email, picture, provider")
      .eq("email", email)
      .eq("provider", provider)
      .maybeSingle() // ใช้ maybeSingle เผื่อไม่เจอ

    if (error || !user) {
      console.error("User not found or DB error:", error)
      return NextResponse.json({ authenticated: false }, { status: 404 })
    }

    // ✅ ส่งข้อมูลผู้ใช้กลับให้ฝั่ง client
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        provider: user.provider,
      },
    })
  } catch (err) {
    console.error("Session parse error:", err)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
