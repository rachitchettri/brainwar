// File: app/battle/[roomId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSocket from "@/lib/socket/useSocket";

interface Question {
  id: string;
  content: string;
  options: string[];
  correct: number;
}

export default function BattleRoomPage() {
  const { roomId } = useParams();
  const socket = useSocket();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!socket || !roomId) return;
    socket.emit("join_room", { roomId, category: "Math" });

    socket.on("game_start", ({ questions }) => {
      setQuestions(questions);
    });

    socket.on("answer_received", ({ userId, questionId, answerIndex }) => {
      // Handle opponent's answer if needed
    });
  }, [socket, roomId]);

  const handleAnswer = (i: number) => {
    if (!socket || !questions[currentIndex]) return;
    setSelected(i);
    setSubmitted(true);
    socket.emit("submit_answer", {
      roomId,
      userId: JSON.parse(localStorage.getItem("user") || '{}').email,
      questionId: questions[currentIndex].id,
      answerIndex: i,
    });
    setTimeout(() => {
      setSelected(null);
      setSubmitted(false);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
      <div className="max-w-3xl mx-auto mt-12 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Room ID: {roomId}</h1>

        {current ? (
          <div>
            <h2 className="text-xl font-semibold mb-6">{current.content}</h2>
            <div className="grid grid-cols-1 gap-4">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => handleAnswer(i)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition font-medium
                    ${selected === i ? "bg-yellow-400 text-black" : "bg-white/20 hover:bg-white/30"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <h2 className="text-xl text-white/70 text-center">{questions.length > 0 ? "Loading next..." : "Waiting for game to start..."}</h2>
        )}
      </div>
    </div>
  );
}
