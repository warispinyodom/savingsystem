"use client";
import { useEffect, useState } from "react";

export default function TestList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gettest")
      .then((res) => res.json())
      .then((result) => {
        setData(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div>
      <h2>ข้อมูลจากตาราง test</h2>
      <ul>
        {data.map((row) => (
          <li key={row.id}>
            ID: {row.id} — Created at: {new Date(row.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
