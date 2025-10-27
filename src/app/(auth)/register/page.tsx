"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Lock } from "lucide-react"
import { useState } from "react"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  // 🔍 ตรวจสอบ input ก่อนส่ง
  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        confirmButtonColor: "#f97316",
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "อีเมลไม่ถูกต้อง",
        text: "กรุณากรอกอีเมลให้ถูกต้อง เช่น example@email.com",
        confirmButtonColor: "#f97316",
      })
      return false
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านสั้นเกินไป",
        text: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        confirmButtonColor: "#f97316",
      })
      return false
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณากรอกให้เหมือนกันทั้งสองช่อง",
        confirmButtonColor: "#f97316",
      })
      return false
    }

    return true
  }

  // 🚀 ฟังก์ชันสมัครสมาชิก
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "สมัครสมาชิกไม่สำเร็จ",
          text: data.message || "กรุณาลองใหม่อีกครั้ง",
          confirmButtonColor: "#f97316",
        })
        return
      }

      // ✅ สมัครสำเร็จ
      Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ!",
        text: "คุณสามารถเข้าสู่ระบบได้ทันที",
        confirmButtonColor: "#16a34a",
      })
      await router.push("/login")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      
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
            <ArrowLeft className="w-4 h-4 mr-2" />
            ย้อนกลับ
          </Link>
        </Button>
      </div>

      {/* กล่องฟอร์มสมัคร */}
      <div className="w-full md:w-[90%] max-w-md md:bg-white/90 md:backdrop-blur-xl md:shadow-lg md:rounded-2xl md:p-10 md:border md:border-orange-100 px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
          สมัครสมาชิก
        </h1>

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              อีเมล
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              รหัสผ่าน
            </label>
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

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ยืนยันรหัสผ่าน
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition-all"
          >
            สมัครสมาชิก
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          มีบัญชีอยู่แล้ว?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </section>
  )
}
