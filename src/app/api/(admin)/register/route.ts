import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1️⃣ ตรวจสอบว่า email ซ้ำหรือยัง
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .single(); // single จะได้ object หรือ null

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 = no rows found (Supabase)
      return NextResponse.json(
        { message: "เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้", error: fetchError.message },
        { status: 400 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "อีเมลนี้ถูกใช้งานแล้ว" },
        { status: 400 }
      );
    }

    // 2️⃣ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ insert ลง database
    const { data, error } = await supabaseAdmin
      .from("users")
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: "เกิดข้อผิดพลาดในการสมัครสมาชิก", error: error.message },
        { status: 400 }
      );
    }

    // 4️⃣ ส่งผลลัพธ์กลับ client
    return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ!", user: data });
  } catch (err) {
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาด", error: (err as Error).message },
      { status: 500 }
    );
  }
}
