"use client";
import { useEffect, useRef } from "react";
import NavbarUsers from "@/app/component/NavbarUsers";

export default function UsersHomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const numParticles = 70;

    // ปรับขนาด canvas ตามขนาดหน้าจอ
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // สร้างอนุภาคสีส้ม
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        color: `hsl(${30 + Math.random() * 40}, 100%, 70%)`, // สีส้ม/ทอง
      });
    }

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // พื้นหลัง gradient โทนส้ม
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#FF9B00"); // ส้ม Navbar
      gradient.addColorStop(1, "#FFA500"); // ส้มอ่อน
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // วาดอนุภาค
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.closePath();

        p.x += p.dx;
        p.y += p.dy;

        // เด้งกลับเมื่อชนขอบ
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      // เส้นเชื่อมระหว่างอนุภาค
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 200, 0, ${1 - dist / 120})`; // สีเส้นส้มทอง
            ctx.lineWidth = 0.3;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 🔹 Canvas background เคลื่อนไหว */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 w-full h-full"
      />

      {/* 🔹 Navbar */}
      <NavbarUsers />

      {/* 🔹 เนื้อหาหลัก */}
      <div className="relative mt-[72px] md:mt-[96px] p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">🎮 เกมที่อยากจะออมเงินเพื่อซื้อ</h1>
        <p className="text-lg opacity-90">
          เตรียมรายชื่อเกมของคุณไว้ที่นี่ แล้วเริ่มวางแผนออมเงินไปพร้อมกัน!
        </p>
      </div>
    </section>
  );
}
