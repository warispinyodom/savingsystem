"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Swal from "sweetalert2"
import { Mail, Lock, ArrowLeft } from "lucide-react"

// ✅ Schema สำหรับตรวจสอบข้อมูลฟอร์มเข้าสู่ระบบ
const loginSchema = z.object({
  email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
  password: z.string().min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values)
    Swal.fire({
      icon: "success",
      title: "เข้าสู่ระบบสำเร็จ!",
      text: `ยินดีต้อนรับกลับมา, ${values.email}`,
      confirmButtonText: "ตกลง",
    })
  }

  return (
    <section className="login bg-gradient-to-b from-[#FF9B00]/80 to-[#FF6B00]/90 min-h-screen flex items-center justify-center relative">
      {/* ปุ่มย้อนกลับ */}
      <Link href="/" className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          className="bg-white/90 text-[#FF9B00] hover:bg-white hover:scale-105 rounded-full px-4 py-2 flex items-center gap-2 transition-all shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ย้อนกลับ</span>
        </Button>
      </Link>

      {/* กล่องเข้าสู่ระบบ */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/40">
        <h1 className="text-3xl font-extrabold mb-2 text-[#FF9B00] text-center">
          เข้าสู่ระบบ
        </h1>
        <p className="text-gray-500 text-center mb-6">
          เข้าสู่ระบบเพื่อใช้งานบัญชีของคุณ
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* อีเมล */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#FF9B00]" />
                    อีเมล
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10 border-gray-300 focus:border-[#FF9B00] focus:ring-[#FF9B00]"
                        {...field}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* รหัสผ่าน */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password" className="text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#FF9B00]" />
                    รหัสผ่าน
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        className="pl-10 border-gray-300 focus:border-[#FF9B00] focus:ring-[#FF9B00]"
                        {...field}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* ปุ่มเข้าสู่ระบบ */}
            <Button
              type="submit"
              className="w-full bg-[#FF9B00] hover:bg-[#FF7B00] text-white font-semibold mt-4 shadow-md transition-all hover:scale-[1.02]"
            >
              เข้าสู่ระบบ
            </Button>

            {/* ลิงก์ไปสมัครสมาชิก */}
            <p className="text-center text-gray-600 mt-4">
              ยังไม่มีบัญชีใช่ไหม?{" "}
              <Link
                href="/register"
                className="underline text-[#FF9B00] hover:text-[#FF7B00] font-medium"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}
