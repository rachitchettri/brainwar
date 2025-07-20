import { Server } from "socket.io";
import prisma from "@/lib/db/prisma";
import { loadQuestions } from "@/lib/game/questionLoader";

export function registerGameHandlers(io: Server) {
  io.on("connection", (socket) => {
    socket.on("join_room", async ({ roomId, category }) => {
      socket.join(roomId);

      const questions = await loadQuestions(category);
      io.to(roomId).emit("game_start", { questions });
    });

    socket.on("submit_answer", ({ roomId, userId, questionId, answerIndex }) => {
      // TODO: Handle scoring logic
      io.to(roomId).emit("answer_received", { userId, questionId, answerIndex });
    });
  });
}