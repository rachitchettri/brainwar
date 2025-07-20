// File: app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<null | { email: string; username?: string }>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    location.reload();
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white">
      {/* Top-right auth buttons or user info */}
      <div className="absolute top-6 right-6 flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-white/80">Hello, {user.username || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
          <Link
            href="/auth/login"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-lg font-medium transition"
          >
            Register
          </Link>
        </>
        
        )}
      </div>

      {/* Main content */}
      <div className="text-center px-8">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-xl">
          Welcome to <span className="text-yellow-400">BrainWar</span>
        </h1>
        <p className="text-lg md:text-xl max-w-md mx-auto mb-6 text-white/90">
          Join real-time quiz battles, sharpen your brain, and climb the leaderboard with friends or foes!
        </p>

        {user && (
          <div className="flex justify-center gap-4">
            <Link
              href="/matchmaking"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              Start Battle
            </Link>
            <Link
              href="/dashboard"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              View Dashboard
            </Link>
          </div>
        )}

        <div className="mt-12 text-sm text-white/50">
          Developed with ❤️ by Rachit Chettri
        </div>
      </div>
    </div>
  );
}
