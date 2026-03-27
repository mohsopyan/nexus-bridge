import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { callPythonAI } from "../services/aiService.js";
import * as aiLogService from "../services/aiLog.service.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Proses menyimpan ke database PostgreSQL lewat Prisma
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User berhasil terdaftar di database!",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Gagal mendaftar user",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({
        message: "Password salah!",
      });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login berhasil!",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

export const askAI = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const userId = (req as any).user.userId;

    // Validasi input
    if (!prompt || prompt.trim().length < 3) {
      return res.status(400).json({
        message: "Berikan pertanyaan yang lebih jelas."
      })
    }

    const aiResult = await callPythonAI(prompt, userId);

    await prisma.aiLog.create({
      data: {
        prompt: prompt,
        aiResponse: aiResult.ai_response,
        modelUsed: aiResult.model_used || "gemini-pro",
        userId: userId,
        latency: aiResult.latency,
      },
    });

    res.status(200).json({
      message: "Respon dari AI Engine berhasil didapat dan disimpan keriwayat",
      data: aiResult,
    });
  } catch (error: any) {
    // error handling
    console.log("AI Service Error:", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        message: "AI Engine sedang sibuk atau tidak aktif"
      })
    }

    res.status(500).json({
      message: "Terjadi kesalahan internal pada sistem.",
      error: error.message
    });
  }
};

export const getAiHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User payload missing" })
    }
    const userId = req.user.userId;
    const { page, limit, search, model } = req.query;

    const history = await aiLogService.fetchUserHistroy(
      userId,
      Number(page) || 1,
      Number(limit) || 10,
      String(search || ""),
      String(model || "")
    );

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch audit logs" });
  }
};

export const getAiStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const [userAiStats, totalUserCount, dailyTrend] = await Promise.all([
      aiLogService.fetchUserStats(userId),
      prisma.user.count(), // Mengambil jumlah user asli dari DB
      aiLogService.fetchDailyAnalytics(userId)
    ]);

    // Gabungkan data dari Service dan Prisma
    const statsResponse = {
      ...userAiStats,
      total_users: totalUserCount,
      dataset_size: "1.2 TB",    // Sementara hardcoded atau bisa dihitung dari table vector
      last_active: new Date().toISOString(),
      dailyTrend: dailyTrend
    };

    res.status(200).json({
      message: "Statistik berhasil diambil",
      stats: statsResponse // Pastikan dibungkus dalam properti 'stats' agar sinkron dengan Frontend
    });

  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};