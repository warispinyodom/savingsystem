import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logout successful" });
  // 🔒 ลบ cookie session
  res.cookies.set("session", "", { expires: new Date(0) });
  return res;
}
