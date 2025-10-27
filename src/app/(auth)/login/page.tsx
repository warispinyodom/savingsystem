"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Lock } from "lucide-react"
import Swal from "sweetalert2"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  // ✅ ถ้ามี session แล้ว ให้ redirect ไปหน้า home ทันที
  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/session") // API ตรวจสอบ session
      const data = await res.json()

      if (data?.authenticated) {
        Swal.fire({
          icon: "info",
          title: "คุณเข้าสู่ระบบแล้ว",
          text: "กำลังพาไปยังหน้าแรก...",
          timer: 2000,
          showConfirmButton: false,
        })
        router.push("/homepage")
      }
    }

    checkSession()
  }, [router])

  // 🚀 ฟังก์ชันเข้าสู่ระบบ
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกอีเมลและรหัสผ่าน",
        confirmButtonColor: "#f97316",
      })
      return
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: data.message || "กรุณาลองใหม่อีกครั้ง",
          confirmButtonColor: "#f97316",
        })
        return
      }

      // ✅ เข้าสู่ระบบสำเร็จ
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ 🎉",
        text: `ยินดีต้อนรับ ${data.user.name || data.user.email}`,
        confirmButtonColor: "#16a34a",
      }).then(() => {
        router.push("/homepage") // redirect ไปหน้า home
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonColor: "#f97316",
      })
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 relative">
      {/* ปุ่มย้อนกลับ */}
      <div className="absolute top-5 left-5">
        <Button
          asChild
          variant="outline"
          className="rounded-full px-4 py-2 bg-white/80 backdrop-blur border border-orange-200 text-orange-600 hover:bg-orange-50 transition"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> ย้อนกลับ
          </Link>
        </Button>
      </div>

      {/* กล่องฟอร์มล็อกอิน */}
      <div className="w-full md:w-[90%] max-w-md md:bg-white/90 md:backdrop-blur-xl md:shadow-lg md:rounded-2xl md:p-10 md:border md:border-orange-100 px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
          เข้าสู่ระบบ
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">อีเมล</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">รหัสผ่าน</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* ปุ่มเข้าสู่ระบบ */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition-all"
          >
            เข้าสู่ระบบ
          </Button>
        </form>

        {/* ลิงก์เพิ่มเติม */}
        <div className="text-center text-gray-600 mt-6 text-sm space-y-2">
          <p>
            ลืมรหัสผ่าน?{" "}
            <Link
              href="/forgot-password"
              className="text-orange-500 font-medium hover:underline"
            >
              กู้คืนรหัสผ่าน
            </Link>
          </p>
          <p>
            ยังไม่มีบัญชี?{" "}
            <Link
              href="/register"
              className="text-orange-500 font-medium hover:underline"
            >
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
