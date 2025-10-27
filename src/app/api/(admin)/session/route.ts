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

    // 🧠 session เก็บ email ไว้ใน cookie ตอน login
    const email = session?.email

    if (!email) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // ✅ ดึงข้อมูลผู้ใช้จากฐานข้อมูล (Supabase)
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("email")
      .eq("email", email)
      .single()

    if (error || !user) {
      console.error("User not found or DB error:", error)
      return NextResponse.json({ authenticated: false }, { status: 404 })
    }

    // ✅ ส่งข้อมูล email กลับให้ฝั่ง client ใช้งานได้
    return NextResponse.json({
      authenticated: true,
      user: { email: user.email },
    })
  } catch (err) {
    console.error("Session parse error:", err)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
