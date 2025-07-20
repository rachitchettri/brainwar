// File: app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, register with backend here
    if (email && password && username) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, username, elo: 1200 })
      );
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">Create Your BrainWar Account</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 w-full text-black font-semibold py-2 rounded-lg shadow-md transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
