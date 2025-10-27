"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Lock } from "lucide-react"

export default function RegisterPage() {
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

        <form className="space-y-5">
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
