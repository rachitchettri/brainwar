// File: app/(dashboard)/page.tsx
"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400 drop-shadow">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Total Matches */}
          <div className="bg-white/10 rounded-lg p-6 shadow-lg backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">Total Matches</h2>
            <p className="text-3xl font-bold text-yellow-300">24</p>
          </div>

          {/* Current ELO */}
          <div className="bg-white/10 rounded-lg p-6 shadow-lg backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">Current ELO</h2>
            <p className="text-3xl font-bold text-green-400">1375</p>
          </div>

          {/* Rank Position */}
          <div className="bg-white/10 rounded-lg p-6 shadow-lg backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">Leaderboard Rank</h2>
            <p className="text-3xl font-bold text-blue-300">#7</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Recent Battles</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto bg-white/10 rounded-lg overflow-hidden text-sm">
              <thead className="bg-white/20">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Opponent</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Result</th>
                  <th className="px-4 py-3">ELO Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="px-4 py-2">July 18</td>
                  <td className="px-4 py-2">@quizKing</td>
                  <td className="px-4 py-2">Math</td>
                  <td className="px-4 py-2 text-green-300 font-semibold">Win</td>
                  <td className="px-4 py-2">+24</td>
                </tr>
                <tr className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="px-4 py-2">July 17</td>
                  <td className="px-4 py-2">@brainyNerd</td>
                  <td className="px-4 py-2">GK</td>
                  <td className="px-4 py-2 text-red-300 font-semibold">Loss</td>
                  <td className="px-4 py-2">-17</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Link
            href="/matchmaking"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            🔥 Start New Match
          </Link>
          <Link
            href="/"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}