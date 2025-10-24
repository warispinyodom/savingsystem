'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Home,
  Briefcase,
  Users,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";

export default function NavbarGuest() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <section>
      {/* Desktop Navbar */}
      <div className="fixed top-0 right-0 w-full bg-[#FF9B00] px-6 py-4 md:py-6 flex justify-between items-center shadow-md hidden md:flex z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:scale-105 transition-all">
            <img src="/icon.ico" alt="Logo" width={48} height={48} />
          </Link>

          <NavLink href="/" icon={<Home size={20} />} text="หน้าแรก" />
          <NavLink href="/" icon={<Briefcase size={20} />} text="บริการ" />
          <NavLink href="/" icon={<Users size={20} />} text="เกี่ยวกับเรา" />
        </div>

        <div className="flex gap-4">
          <Button
            asChild
            className="bg-white text-[#FF9B00] hover:bg-gray-100 rounded-full transition hover:scale-105"
          >
            <Link href="/login">
              <LogIn className="mr-2" /> เข้าสู่ระบบ
            </Link>
          </Button>
          <Button
            asChild
            className="bg-white text-[#FF9B00] hover:bg-gray-100 rounded-full transition hover:scale-105"
          >
            <Link href="/register">
              <UserPlus className="mr-2" /> สมัครสมาชิก
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-0 right-0 w-full bg-[#FF9B00] px-4 py-4 flex justify-between items-center shadow-md md:hidden z-50">
        <Link href="/" className="hover:scale-105 transition">
          <img src="/globe.svg" alt="Logo" width={40} height={40} />
        </Link>

        <button
          onClick={toggleMenu}
          className="text-white text-3xl focus:outline-none"
        >
          {isOpen ? <X size={32} /> : <>≡</>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
          />

          {/* Dropdown Content */}
          <div className="fixed top-20 right-4 bg-white shadow-lg rounded-xl p-6 w-[85vw] max-w-xs z-50">
            <div className="flex flex-col gap-4">
              <MobileNavLink href="/" icon={<Home size={18} />} text="หน้าแรก" />
              <MobileNavLink href="/" icon={<Briefcase size={18} />} text="บริการ" />
              <MobileNavLink href="/" icon={<Users size={18} />} text="เกี่ยวกับเรา" />

              <div className="border-t pt-4 flex flex-col gap-3">
                <Button
                  asChild
                  className="w-full bg-white text-[#FF9B00] border hover:bg-gray-100 rounded-full transition"
                >
                  <Link href="/login">
                    <LogIn className="mr-2" /> เข้าสู่ระบบ
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-white text-[#FF9B00] border hover:bg-gray-100 rounded-full transition"
                >
                  <Link href="/register">
                    <UserPlus className="mr-2" /> สมัครสมาชิก
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

// ✅ กำหนด type props แบบง่าย โดยไม่ใช้ JSX.Element
function NavLink(props: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      href={props.href}
      className="flex items-center gap-2 text-white text-lg font-medium hover:scale-105 transition-all"
    >
      {props.icon}
      {props.text}
    </Link>
  );
}

function MobileNavLink(props: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      href={props.href}
      className="flex items-center gap-2 text-[#FF9B00] text-base font-medium hover:scale-105 transition-all"
    >
      {props.icon}
      {props.text}
    </Link>
  );
}
