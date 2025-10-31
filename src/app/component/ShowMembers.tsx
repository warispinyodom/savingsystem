"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react"; // icon Users จาก lucide-react

export default function ShowMembersCard() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/memberscount");
        if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลสมาชิกได้");
        const data = await res.json();
        setCount(data.count);
      } catch (err: unknown) {
        // ตรวจสอบชนิดของ error ก่อนเข้าถึง message
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
  }, []);

  return (
    <div className="p-4">
      {/* Grid สำหรับ responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4">
          <div className="p-4 bg-blue-500 rounded-full text-white flex-shrink-0">
            <Users className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 dark:text-gray-300 font-semibold text-sm">
              สมาชิกทั้งหมด
            </p>
            {loading ? (
              <p className="text-xl font-bold text-gray-800 dark:text-white mt-1 animate-pulse">
                กำลังโหลด...
              </p>
            ) : error ? (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ) : (
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {count} คน
              </p>
            )}
          </div>
        </div>

        {/* คุณสามารถเพิ่ม card อื่น ๆ ใน grid นี้ได้ */}
        {/* <OtherCard /> */}
      </div>
    </div>
  );
}
