import prisma from "../lib/prisma.js";

export const fetchUserHistroy = async (userId: string) => {
  return await prisma.ailog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const fetchUserStats = async (userId: string) => {
  const [totalRequests, lastActivity, allLogs] = await Promise.all([
    prisma.ailog.count({ where: { userId } }),
    prisma.ailog.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
    prisma.ailog.findMany({
      where: { userId },
      select: { prompt: true },
    }),
  ]);

  const totalCharacters = allLogs.reduce((sum, log) => sum + log.prompt.length, 0);

  return {
    total_queries: totalRequests,
    total_prompt_chars: totalCharacters,
    last_active: lastActivity?.createdAt || "Nothing activity",
  };
};
