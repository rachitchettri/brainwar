// File: server/matchmaking.ts

import { Server, Socket } from "socket.io";
import { enqueuePlayer, dequeuePlayers } from "@/lib/matchmaking/queue";

export function handleMatchmaking(io: Server, socket: Socket) {
  socket.on("join_queue", async ({ category, elo, teamSize }) => {
    await enqueuePlayer(category, { id: socket.id, elo, teamSize });
    await tryMatch(io, category, teamSize);
  });
}

async function tryMatch(io: Server, category: string, teamSize: number) {
  const totalPlayers = teamSize * 2;
  const players = await dequeuePlayers(category, totalPlayers);

  if (players.length === totalPlayers) {
    const roomId = `room-${Date.now()}`;
    const teamA = players.slice(0, teamSize);
    const teamB = players.slice(teamSize);

    for (const p of teamA) {
      io.to(p.id).emit("match_found", {
        roomId,
        team: "A",
        teammates: teamA.map(p => p.id),
        opponents: teamB.map(p => p.id),
      });
    }

    for (const p of teamB) {
      io.to(p.id).emit("match_found", {
        roomId,
        team: "B",
        teammates: teamB.map(p => p.id),
        opponents: teamA.map(p => p.id),
      });
    }
  }
}
