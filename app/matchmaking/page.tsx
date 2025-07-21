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
  const [teamSize, setTeamSize] = useState(1);
  const [teamA, setTeamA] = useState<string[]>([]);
  const [teamB, setTeamB] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const userId = user.email || user.username || "anonymous";

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("join_room", { roomId, category: "Math", userId, teamSize });

    socket.on("team_update", ({ teamA, teamB }) => {
      setTeamA(teamA || []);
      setTeamB(teamB || []);
    });

    socket.on("game_start", ({ questions }) => {
      setQuestions(questions);
      setGameStarted(true);
    });

    socket.on("answer_received", ({ userId, questionId, answerIndex }) => {
      // Optional: track others' answers
    });
  }, [socket, roomId, teamSize]);

  const handleAnswer = (i: number) => {
    if (!socket || !questions[currentIndex]) return;
    setSelected(i);
    setSubmitted(true);
    socket.emit("submit_answer", {
      roomId,
      userId,
      questionId: questions[currentIndex].id,
      answerIndex: i,
    });
    setTimeout(() => {
      setSelected(null);
      setSubmitted(false);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  const handleJoinTeam = (team: "A" | "B") => {
    socket?.emit("join_team", { roomId, team, userId });
  };

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
      <div className="max-w-3xl mx-auto mt-12 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Room ID: {roomId}</h1>

        {/* Lobby UI */}
        {!gameStarted && (
          <>
            <div className="mb-4">
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

            <div className="flex gap-4 mb-6">
              <button
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded"
                onClick={() => handleJoinTeam("A")}
              >
                Join Team A
              </button>
              <button
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded"
                onClick={() => handleJoinTeam("B")}
              >
                Join Team B
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm text-white/80 mb-6">
              <div>
                <h3 className="text-yellow-300 font-semibold mb-2">Team A</h3>
                {teamA.map((player, i) => (
                  <div key={i}>👤 {player}</div>
                ))}
              </div>
              <div>
                <h3 className="text-yellow-300 font-semibold mb-2">Team B</h3>
                {teamB.map((player, i) => (
                  <div key={i}>👤 {player}</div>
                ))}
              </div>
            </div>

            <p className="text-center text-white/60 italic">Waiting for game to start...</p>
          </>
        )}

        {/* Game UI */}
        {gameStarted && current && (
          <>
            <div className="mb-4 text-sm text-white/60">
              Question {currentIndex + 1} of {questions.length}
            </div>
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
          </>
        )}
      </div>
    </div>
  );
}
