"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// 🧩 icons from lucide-react (ใช้ใน shadcn)
import { User, Mail, Lock, ArrowLeft } from "lucide-react"

// ✅ Schema สำหรับตรวจสอบข้อมูลฟอร์ม
const formSchema = z.object({
  name: z.string().min(2, { message: "กรุณากรอกชื่อให้ถูกต้อง" }),
  email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
  password: z.string().min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
  confirmPassword: z.string().min(6, { message: "กรุณายืนยันรหัสผ่าน" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    alert("สมัครสมาชิกสำเร็จ!")
  }

  return (
    <section className="register bg-gradient-to-b from-[#FF9B00]/80 to-[#FF6B00]/90 min-h-screen flex items-center justify-center relative">
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

      {/* กล่องสมัครสมาชิก */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/40">
        <h1 className="text-3xl font-extrabold mb-2 text-[#FF9B00] text-center">
          สมัครสมาชิก
        </h1>
        <p className="text-gray-500 text-center mb-6">สร้างบัญชีใหม่ของคุณ</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* ชื่อ */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#FF9B00]" />
                    ชื่อผู้ใช้
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="name"
                        placeholder="กรอกชื่อผู้ใช้"
                        className="pl-10 border-gray-300 focus:border-[#FF9B00] focus:ring-[#FF9B00]"
                        {...field}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

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

            {/* ยืนยันรหัสผ่าน */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirmPassword" className="text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#FF9B00]" />
                    ยืนยันรหัสผ่าน
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
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

            {/* ปุ่มสมัคร */}
            <Button
              type="submit"
              className="w-full bg-[#FF9B00] hover:bg-[#FF7B00] text-white font-semibold mt-4 shadow-md transition-all hover:scale-[1.02]"
            >
              สมัครสมาชิก
            </Button>

            {/* ลิงก์ไปหน้า Login */}
            <p className="text-center text-gray-600 mt-4">
              มีบัญชีอยู่แล้ว?{" "}
              <Link
                href="/login"
                className="underline text-[#FF9B00] hover:text-[#FF7B00] font-medium"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}
