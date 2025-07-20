import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL!);

export async function enqueuePlayer(category: string, playerData: object) {
  await redis.lpush(`queue:${category}`, JSON.stringify(playerData));
}

export async function dequeuePlayers(category: string, count: number) {
  const players = await redis.lrange(`queue:${category}`, 0, count - 1);
  await redis.ltrim(`queue:${category}`, count, -1);
  return players.map((p) => JSON.parse(p));
}