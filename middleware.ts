import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value

  // ❌ ถ้าไม่มี session และพยายามเข้าถึง /users → redirect กลับไปหน้า login
  if (!sessionCookie && req.nextUrl.pathname.startsWith("/users")) {
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  // ✅ ถ้ามี session หรือเป็นหน้าอื่น ๆ → ดำเนินการต่อ
  return NextResponse.next()
}

// 🔧 ระบุว่า middleware จะทำงานกับ path ไหนบ้าง
export const config = {
  matcher: ["/users/:path*"], // ป้องกันทุกหน้าใน /users/
}
