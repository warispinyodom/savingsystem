'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Home, Briefcase, Users } from "lucide-react";

export default function NavbarGuest() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <section>
            {/* เราจะสร้าง navbar ที่หน้านี้เพื่อให้เกิดเป็น component ไว้เรียกใช้งานหลายหน้า  */}
            <div className="bg-[#FF9B00] p-6 flex justify-between items-center shadow-md hidden md:flex">
                <div className="section-left flex items-center gap-6">
                    <div className="section-logo transition-all duration-300 hover:scale-105">
                        <img src="/globe.svg" alt="" width={48} height={48} />
                    </div>
                    <Button asChild variant="link" className="text-xl text-white transition-all duration-300 hover:scale-105">
                        <Link href="/">
                            หน้าแรก
                        </Link>
                    </Button>
                    <Button asChild variant="link" className="text-xl text-white transition-all duration-300 hover:scale-105">
                        <Link href="/">
                            บริการ
                        </Link>
                    </Button>
                    <Button asChild variant="link" className="text-xl text-white transition-all duration-300 hover:scale-105">
                        <Link href="/">
                            เกี่ยวกับเรา
                        </Link>
                    </Button>
                </div>
                <div className="section-right flex items-center gap-6">
                    {/* เนื้อหาสำหรับปุ่ม login logout */}
                    <Button asChild className="text-xl bg-white text-[#FF9B00] hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-105">
                        <Link href="/auth/login">
                            เข้าสู่ระบบ
                        </Link>
                    </Button>
                    <Button asChild className="text-xl bg-white text-[#FF9B00] hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-105">
                        <Link href="/auth/register">
                            สมัครสมาชิก
                        </Link>
                    </Button>
                </div>
            </div>
            {/* mobile navbar menu */}
            <div className="bg-[#FF9B00] p-6 flex justify-between items-center shadow-md flex md:hidden">
                <div className="section-left">
                    <img className="transition-all duration-300 hover:scale-105" src="/globe.svg" alt="" width={48} height={48} />
                </div>
                <div className="section-right">
                    {/* ทำ toggle menu เพื่อใช้ dropdown menu ใน โหมด mobile responsive */}
                    <Button onClick={toggleMenu} className="bg-transparent outline-none text-white text-4xl font-bold cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:bg-transparent">
                        ≡
                    </Button>
                    {/* เนื้อหา dropdown menu เพื่อแสดง รายการลิงค์ไปยังหน้าต่าง ๆ  */}
                    {isOpen &&
                        <div className="absolute bg-white shadow-md p-6 right-10 rounded-md">
                            <div className="flex flex-col gap-4">
                                <Link href="/" className="flex items-center gap-2 text-lg font-medium text-[#FF9B00] transition-all duration-300 hover:scale-105">
                                    <Home/>
                                    หน้าแรก
                                </Link>
                                <Link href="/" className="flex items-center gap-2 text-lg font-medium text-[#FF9B00] transition-all duration-300 hover:scale-105">
                                    <Briefcase/>
                                    บริการ
                                </Link>
                                <Link href="/" className="flex items-center gap-2 text-lg font-medium text-[#FF9B00] transition-all duration-300 hover:scale-105">
                                    <Users/>
                                    เกี่ยวกับเรา
                                </Link>
                                <Button asChild className="shadow-md text-xl bg-white text-[#FF9B00] hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-105">
                                    <Link href="/auth/login" className="">
                                        เข้าสู่ระบบ
                                    </Link>
                                </Button>
                                <Button asChild className="shadow-md text-xl bg-white text-[#FF9B00] hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-105">
                                    <Link href="/auth/register" className="">
                                        สมัครสมาชิก
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* ส่วนเนื้อหาของ container ตั้งแต่ banner ไปจน ถึง footer */}
            <div className="section-banner">
                <img src="/images/banner.png" alt="banner" />
            </div>
            {/* ส่วนของเนื้อหา สำหรับ content รีวิว โปรโมท เกี่ยวกับระบบสามารถทำอะไรได้บ้าง */}

        </section>
    )
}