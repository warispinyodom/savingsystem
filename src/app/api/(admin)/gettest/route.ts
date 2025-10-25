import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

// ✅ ใช้ GET เพราะเราจะดึงข้อมูล
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("test")
      .select("*") // ดึงทุก column
      .order("id", { ascending: true }); // เรียงลำดับตาม id
 
    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
