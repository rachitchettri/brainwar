"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const dummyUsers = [
    { email: "test1@brainwar.com", password: "123456", username: "PlayerOne" },
    { email: "test2@brainwar.com", password: "123456", username: "PlayerTwo" },
    { email: "test3@brainwar.com", password: "123456", username: "PlayerThree" },
    { email: "test4@brainwar.com", password: "123456", username: "PlayerFour" },
    { email: "test5@brainwar.com", password: "123456", username: "PlayerFive" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (matched) {
      localStorage.setItem("user", JSON.stringify(matched));
      router.push("/");
    } else {
      alert("Invalid credentials. Try test1@brainwar.com / 123456 etc.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">Login to BrainWar</h1>
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
          Login
        </button>
      </form>
    </div>
  );
}
