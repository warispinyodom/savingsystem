import { NextResponse, NextRequest } from "next/server";

// แนะนำให้ใช้ JWT หรือ cookie ที่มี role เก็บไว้
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookie = req.cookies.get("session")?.value;

  if (!cookie) {
    // ยังไม่มี session → block
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    // parse session cookie (ตัวอย่างใช้ JSON.stringify/parse)
    const session = JSON.parse(decodeURIComponent(cookie));
    const roles = session.roles || "user";

    if (url.pathname.startsWith("/adminpage")) {
      const isAdmin = (Array.isArray(roles) && roles.includes("admin")) || roles === "admin";
      if (!isAdmin) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    if (url.pathname.startsWith("/homepage")) {
      const isUser = (Array.isArray(roles) && roles.includes("user")) || roles === "user";
      if (!isUser) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware session error:", err);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/adminpage/:path*", "/homepage/:path*"],
};
