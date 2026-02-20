import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { callPythonAI } from "../services/aiService.js";;

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

    const aiResult = await callPythonAI(prompt, userId);

    res.status(200).json({
      message: "Respon dari AI Engine berhasil didapat",
      dat: aiResult
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}