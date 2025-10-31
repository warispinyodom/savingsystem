"use client";
import NavbarAdmin from "@/app/component/NavbarAdmin";
import ShowMembers from "@/app/component/ShowMembers";

export default function AdminPage() {
  return (
    <section className="relative w-full min-h-screen overflow-auto bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-400">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Content */}
      <div className="relative p-6 text-white mt-[72px] md:mt-[96px]">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-lg opacity-80 mb-6">
          ยินดีต้อนรับสู่แดชบอร์ดผู้ดูแลระบบ คุณสามารถจัดการผู้ใช้และบริการได้จากที่นี่
        </p>

        {/* แสดงจำนวนสมาชิก */}
        <ShowMembers />
      </div>
    </section>
  );
}
