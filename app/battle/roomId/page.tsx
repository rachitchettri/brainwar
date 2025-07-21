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
  const [players, setPlayers] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState(1);
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!socket || !roomId) return;

    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const userId = user.email || user.username || "anonymous";
    const isHostFromStorage = localStorage.getItem("isHost") === "true";

    setIsHost(isHostFromStorage);

    socket.emit("join_room", { roomId, category: "Math", userId, teamSize });

    socket.on("waiting_room_update", ({ players }) => {
      setPlayers(players || []);
    });

    socket.on("game_start", ({ questions, players }) => {
      setQuestions(questions);
      setPlayers(players || []);
      setGameStarted(true);
    });

    socket.on("answer_received", ({ userId, questionId, answerIndex }) => {
      // Handle opponent's answer if needed
    });
  }, [socket, roomId, teamSize]);

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

  const handleStartGame = () => {
    socket?.emit("host_start_game", { roomId });
  };

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
      <div className="max-w-3xl mx-auto mt-12 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Room ID: {roomId}</h1>

        {/* Pre-game lobby */}
        {questions.length === 0 && (
          <>
            <div className="mb-6">
              <label className="block mb-2 text-white/80">Select Team Size:</label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="bg-white/20 text-white rounded px-4 py-2"
              >
                <option value={1}>1v1</option>
                <option value={2}>2v2</option>
                <option value={3}>3v3</option>
                <option value={4}>4v4</option>
              </select>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">Players in Room</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                <div>
                  <h4 className="font-bold mb-1">Team A</h4>
                  {players.filter((_, i) => i % 2 === 0).map((p, i) => (
                    <div key={i}>👤 {p}</div>
                  ))}
                </div>
                <div>
                  <h4 className="font-bold mb-1">Team B</h4>
                  {players.filter((_, i) => i % 2 !== 0).map((p, i) => (
                    <div key={i}>👤 {p}</div>
                  ))}
                </div>
              </div>
            </div>

            {isHost && (
              <button
                onClick={handleStartGame}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded font-semibold shadow"
              >
                Start Game
              </button>
            )}
          </>
        )}

        {/* Game view */}
        {questions.length > 0 && (
          <>
            <div className="mb-4 text-sm text-white/60">
              Question {currentIndex + 1} of {questions.length}
            </div>

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
              <h2 className="text-xl text-white/70 text-center">Loading next...</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
}
