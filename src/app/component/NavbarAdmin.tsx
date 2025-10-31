"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Home,
    Briefcase,
    Users,
    LogOut,
    UserCircle,
    X,
} from "lucide-react";
import Swal from "sweetalert2";

export default function NavbarAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ email: string } | null>(null); // ✅ แก้เหลือเฉพาะ email
    const router = useRouter();

    const toggleMenu = () => setIsOpen((prev) => !prev);

    // 🧠 ดึงข้อมูล session ปัจจุบันจาก API (ฝั่ง client)
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch("/api/session");
                const data = await res.json();

                const user = data?.user;
                if (!user) {
                    router.push("/login");
                    return;
                }

                // 🔹 ตรวจสอบ role admin (รองรับ string หรือ array)
                const isAdmin =
                    (Array.isArray(user.roles) && user.roles.includes("admin")) ||
                    user.roles === "admin";

                if (!isAdmin) {
                    // ❌ ลบ session ทาง server
                    await fetch("/api/logout", { method: "POST" });
                    router.push("/login");
                    return;
                }

                // ✅ เป็น admin ให้เข้าถึง
                setUser(user);
            } catch (error) {
                console.error("Session check failed:", error);
                router.push("/login");
            }
        };

        fetchSession();
    }, [router]);


    // 🔓 ออกจากระบบ
    const handleLogout = async () => {
        try {
            const res = await fetch("/api/logout", { method: "POST" });
            if (!res.ok) throw new Error("Logout failed");

            Swal.fire({
                icon: "success",
                title: "ออกจากระบบสำเร็จ",
                timer: 1500,
                showConfirmButton: false,
            }).then(() => router.push("/login"));
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถออกจากระบบได้",
                confirmButtonColor: "#f97316",
            });
        }
    };

    return (
        <section>
            {/* ✅ Desktop Navbar */}
            <div className="fixed top-0 right-0 w-full bg-[#FF9B00] px-6 py-4 md:py-6 flex justify-between items-center shadow-md hidden md:flex z-50">
                <div className="flex items-center gap-6">
                    <Link href="/" className="hover:scale-105 transition-all">
                        <img src="/icon.ico" alt="Logo" width={48} height={48} />
                    </Link>

                    <NavLink href="/homepage" icon={<Home size={20} />} text="หน้าแรก" />
                    <NavLink href="/homepage" icon={<Briefcase size={20} />} text="บริการ" />
                    <NavLink href="/homepage" icon={<Users size={20} />} text="เกี่ยวกับเรา" />
                </div>

                {/* ✅ Profile + Logout */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-[#FF9B00]">
                        <UserCircle size={20} />
                        <span className="font-medium">
                            {user?.email || "ผู้ใช้"}
                        </span>
                    </div>

                    <Button
                        onClick={handleLogout}
                        className="bg-white text-[#FF9B00] hover:bg-gray-100 rounded-full flex items-center transition hover:scale-105"
                    >
                        <LogOut className="mr-2" size={18} />
                        ออกจากระบบ
                    </Button>
                </div>
            </div>

            {/* ✅ Mobile Navbar */}
            <div className="fixed top-0 right-0 w-full bg-[#FF9B00] px-4 py-4 flex justify-between items-center shadow-md md:hidden z-50">
                <Link href="/" className="hover:scale-105 transition">
                    <img src="/icon.ico" alt="Logo" width={40} height={40} />
                </Link>

                <button
                    onClick={toggleMenu}
                    className="text-white text-3xl focus:outline-none"
                >
                    {isOpen ? <X size={32} /> : <>≡</>}
                </button>
            </div>

            {/* ✅ Mobile Menu */}
            {isOpen && (
                <>
                    <div
                        onClick={toggleMenu}
                        className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
                    />

                    <div className="fixed top-20 right-4 bg-white shadow-lg rounded-xl p-6 w-[85vw] max-w-xs z-50">
                        <div className="flex flex-col gap-4">
                            <MobileNavLink href="/" icon={<Home size={18} />} text="หน้าแรก" />
                            <MobileNavLink href="/" icon={<Briefcase size={18} />} text="บริการ" />
                            <MobileNavLink href="/" icon={<Users size={18} />} text="เกี่ยวกับเรา" />

                            <div className="border-t pt-4 flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-[#FF9B00] font-medium">
                                    <UserCircle size={18} />
                                    {user?.email || "ผู้ใช้"}
                                </div>
                                <Button
                                    onClick={handleLogout}
                                    className="w-full bg-white text-[#FF9B00] border hover:bg-gray-100 rounded-full flex items-center justify-center transition"
                                >
                                    <LogOut className="mr-2" size={18} /> ออกจากระบบ
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

// 🔹 Reusable NavLink components
function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 text-white text-lg font-medium hover:scale-105 transition-all"
        >
            {icon}
            {text}
        </Link>
    );
}

function MobileNavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 text-[#FF9B00] text-base font-medium hover:scale-105 transition-all"
        >
            {icon}
            {text}
        </Link>
    );
}
