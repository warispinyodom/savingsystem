import { NextResponse } from "next/server";
import { createClient, PostgrestError } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from("users")
      .select("*", { count: "exact", head: true });

    if (error) {
      // กำหนด type ของ error ให้เป็น PostgrestError
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ count });
  } catch (err: unknown) {
    let message = "ไม่สามารถดึงข้อมูลสมาชิกได้";

    // ตรวจสอบ type ของ error
    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
