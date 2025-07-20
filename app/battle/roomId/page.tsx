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
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (!socket || !roomId) return;
    socket.emit("join_room", { roomId, category: "Math" });

    socket.on("game_start", ({ questions, players }) => {
      setQuestions(questions);
      setPlayers(players || []);
    });

    socket.on("answer_received", ({ userId, questionId, answerIndex }) => {
      // Optional: handle other player answer
    });
  }, [socket, roomId]);

  const handleAnswer = (i: number) => {
    if (!socket || !questions[currentIndex]) return;
    setSelected(i);
    setSubmitted(true);

    const currentQ = questions[currentIndex];
    if (i === currentQ.correct) setScore((s) => s + 1);

    socket.emit("submit_answer", {
      roomId,
      userId: JSON.parse(localStorage.getItem("user") || '{}').email,
      questionId: currentQ.id,
      answerIndex: i,
    });

    setTimeout(() => {
      setSelected(null);
      setSubmitted(false);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
      <div className="max-w-3xl mx-auto mt-12 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Room ID: {roomId}</h1>

        {players.length > 0 && (
          <div className="mb-4 text-sm text-white/70">
            Players in this room: {players.join(", ")}
          </div>
        )}

        <div className="mb-4 text-sm text-white/60">
          Question {currentIndex + 1} of {questions.length} | Score: {score}
        </div>

        {gameOver ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Game Over!</h2>
            <p className="text-lg">Your Final Score: {score}/{questions.length}</p>
          </div>
        ) : current ? (
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
