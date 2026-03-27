import prisma from "../lib/prisma.js";

export const fetchUserHistroy = async (
  userId: string,
  page: number = 1,
  limit: number = 10,
  search: string = "",
  model: string = ""
) => {
  const skip = (page - 1) * limit;

  // 1. Definisikan Filter (Where Clause)
  const where: any = {
    userId,
    OR: [
      { prompt: { contains: search, mode: 'insensitive' } },
      { aiResponse: { contains: search, mode: 'insensitive' } },
    ],
  };

  // 2. Tambahkan filter model jika dipilih
  if (model && model !== "all") {
    where.modelUsed = model;
  }

  // 3. Jalankan query paralel (Data + total count untuk Pagination)
  const [logs, total] = await Promise.all([
    prisma.aiLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.aiLog.count({ where }),
  ]);

  return {
    logs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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

export const fetchDailyAnalytics = async (userId: string) => {
  // Kita ambil data 7 hari terakhir sebagai contoh standar dashboard
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const logs = await prisma.aiLog.findMany({
    where: {
      userId,
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      createdAt: true,
      latency: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Proses grouping data di level aplikasi (Node.js) agar lebih fleksibel
  const analytics = logs.reduce((acc: any, log) => {
    const date = log.createdAt.toISOString().split("T")[0]; // Ambil format YYYY-MM-DD
    
    if (!acc[date]) {
      acc[date] = { date, count: 0, totalLatency: 0 };
    }
    
    acc[date].count += 1;
    acc[date].totalLatency += log.latency || 0;
    
    return acc;
  }, {});

  // Ubah object ke array dan hitung rata-rata latency per hari
  return Object.values(analytics).map((item: any) => ({
    date: item.date,
    requests: item.count,
    avgLatency: Math.round(item.totalLatency / item.count),
  }));
};