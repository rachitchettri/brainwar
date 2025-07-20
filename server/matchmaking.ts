import { Server, Socket } from "socket.io";
import { enqueuePlayer, dequeuePlayers } from "@/lib/matchmaking/queue";

export function handleMatchmaking(io: Server, socket: Socket) {
  socket.on("join_queue", async ({ category, elo }) => {
    await enqueuePlayer(category, { id: socket.id, elo });
    await tryMatch(io, category);
  });
}

async function tryMatch(io: Server, category: string) {
  const players = await dequeuePlayers(category, 2);
  if (players.length === 2) {
    const roomId = `room-${Date.now()}`;
    for (const p of players) io.to(p.id).emit("match_found", { roomId });
  }
}
