import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs"; // ติดตั้งด้วย: npm install bcryptjs

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // ตรวจสอบว่า email มีในฐานข้อมูลหรือยัง
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .eq("provider", "form") // ตรวจเฉพาะ provider = form
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { success: false, message: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" },
        { status: 500 }
      );
    }

    if (existingUser) {
      // มี email ซ้ำ
      return NextResponse.json(
        { success: false, message: "อีเมลนี้ถูกใช้งานแล้ว" },
        { status: 400 }
      );
    }

    // 🔒 เข้ารหัส password ก่อนบันทึก
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // เพิ่มผู้ใช้ใหม่
    const { data, error } = await supabaseAdmin.from("users").insert({
      email,
      password: hashedPassword,       // เก็บ hashed password
      name: email.split("@")[0],       // ตั้งค่า default name
      provider: "form",                // เพิ่ม provider default
    }).select().maybeSingle();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { success: false, message: "สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "สมัครสมาชิกสำเร็จ 🎉",
      user: { id: data.id, email: data.email, name: data.name, provider: data.provider }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
