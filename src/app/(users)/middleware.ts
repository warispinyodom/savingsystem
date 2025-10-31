import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value

  // ถ้าไม่มี session → redirect ไปหน้า login
  if (!sessionCookie) {
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  // ถ้ามี session → ให้ผ่าน
  return NextResponse.next()
}

// ✅ ไม่มี matcher ก็ได้ เพราะมันจะมีผลเฉพาะใน route group (users)
