"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Game {
  game_id: string;
  name: string;
  description: string;
  price: number;
  picture: string;
}

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gamelist")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-6 text-lg">กำลังโหลดเกม...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 px-4">
      {games.map((game) => (
        <div
          key={game.game_id}
          className="bg-black/60 backdrop-blur-lg p-5 rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300 relative overflow-hidden"
        >
          {/* รูปเกม */}
          {game.picture && (
            <div className="w-full h-48 relative rounded-xl overflow-hidden mb-4 shadow-lg">

            </div>
          )}

          {/* ชื่อเกม */}
          <h3 className="text-2xl font-bold mb-2 text-yellow-400 drop-shadow-lg">
            {game.name}
          </h3>

          {/* รายละเอียด */}
          <p className="text-white/80 text-sm mb-4 line-clamp-3">
            {game.description}
          </p>

          {/* ราคา + Button */}
          <div className="mt-auto flex justify-between items-center">
            <span className="text-yellow-300 font-bold text-lg drop-shadow-sm">
              {game.price.toLocaleString()} บาท
            </span>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300">
              ออมเงิน
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
