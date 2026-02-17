import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    // Proses menyimpan ke database PostgreSQL lewat Prisma
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
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
