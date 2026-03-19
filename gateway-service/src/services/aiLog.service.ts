import prisma from "../lib/prisma.js";

export const fetchUserHistroy = async (userId: string) => {
  return await prisma.aiLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const fetchUserStats = async (userId: string) => {
  const [totalRequests, lastActivity, allLogs] = await Promise.all([
    prisma.aiLog.count({ where: { userId } }),
    prisma.aiLog.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
    prisma.aiLog.findMany({
      where: { userId },
      select: { prompt: true },
    }),
  ]);

  const totalCharacters = allLogs.reduce((sum: number, log: any) => sum + log.prompt.length, 0);

  return {
    total_queries: totalRequests,
    total_prompt_chars: totalCharacters,
    last_active: lastActivity?.createdAt || "Nothing activity",
  };
};
