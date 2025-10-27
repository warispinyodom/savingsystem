import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔍 ตรวจสอบผู้ใช้ในฐานข้อมูล
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // 🔑 ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // ✅ สร้าง response พร้อม cookie
    const response = NextResponse.json({
      success: true,
      message: "เข้าสู่ระบบสำเร็จ 🎉",
      user: { id: user.id, email: user.email, name: user.name },
    });

    // ✅ ตั้ง cookie session เก็บ email ไว้
    response.cookies.set(
      "session",
      JSON.stringify({ id: user.id, email: user.email }),
      {
        httpOnly: true, // ป้องกันการเข้าถึงจาก JavaScript ฝั่ง client
        path: "/",
        maxAge: 60 * 60 * 24, // 1 วัน
      }
    );

    return response;
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
