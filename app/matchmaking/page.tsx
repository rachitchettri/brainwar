"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/lib/socket/useSocket";

export default function MatchmakingPage() {
  const socket = useSocket();
  const router = useRouter();
  const [category, setCategory] = useState("Math");
  const [teamSize, setTeamSize] = useState(1);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!socket) return;

    socket.on("match_found", ({ roomId }) => {
      router.push(`/battle/${roomId}`);
    });

    return () => {
      socket.off("match_found");
    };
  }, [socket]);

  const handleJoinQueue = () => {
    if (!user.email || !socket) return;
    socket.emit("join_queue", {
      category,
      elo: 1200,
      userId: user.email,
      teamSize,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">Find a Match</h1>

      <label className="mb-2 text-white/80">Select Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 px-4 py-2 bg-white/20 rounded"
      >
        <option value="Math">Math</option>
        <option value="GK">General Knowledge</option>
        <option value="Science">Science</option>
      </select>

      <label className="mb-2 text-white/80">Team Size:</label>
      <select
        value={teamSize}
        onChange={(e) => setTeamSize(Number(e.target.value))}
        className="mb-6 px-4 py-2 bg-white/20 rounded"
      >
        <option value={1}>1v1</option>
        <option value={2}>2v2</option>
        <option value={3}>3v3</option>
        <option value={4}>4v4</option>
      </select>

      <button
        onClick={handleJoinQueue}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md"
      >
        🔍 Join Matchmaking
      </button>
    </div>
  );
}
