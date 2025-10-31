"use client";
import { useEffect, useRef } from "react";
import NavbarUsers from "@/app/component/NavbarUsers";
import Gamelist from "@/app/component/Gamelist";

interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
}

export default function UsersHomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const numParticles = window.innerWidth < 768 ? 30 : 70; // ลด particle บนมือถือ

    const particles: Particle[] = Array.from({ length: numParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      color: `hsl(${30 + Math.random() * 40}, 100%, 70%)`,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#FF9B00");
      gradient.addColorStop(1, "#FFA500");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = window.innerWidth < 768 ? 2 : 10; // ลด blur บน mobile
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.closePath();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      // เชื่อม particle
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = window.innerWidth < 768 ? 60 : 120;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 200, 0, ${1 - dist / maxDist})`;
            ctx.lineWidth = window.innerWidth < 768 ? 0.1 : 0.3;
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
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section className="relative w-full overflow-auto min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full" />
      <NavbarUsers />

      {/* Banner */}
      <div className="relative mt-[72px] md:mt-[96px] p-6 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-pulse">
          🎮 ออมเงินเพื่อเกมในฝันของคุณ!
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-6">
          เลือกเกมที่คุณชอบ แล้วเริ่มออมเงินไปพร้อมกัน สนุกง่าย ได้เกมไว!
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
          เริ่มออมเงินเลย
        </button>
      </div>

      {/* Game List */}
      <div className="relative p-6 text-white opacity-90">
        <Gamelist />
      </div>
    </section>
  );
}
