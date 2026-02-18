import "dotenv/config";
import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import prisma from "./lib/prisma.js";
import bcrypt from "bcrypt";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware agar server bisa membaca json
app.use(express.json());

// Jalur utama (Route)
app.use("/api/v1/user", userRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({
      status: "Connected",
      message: "Berhasil terhubung ke tabel user",
      count: userCount,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server meluncur di http://localhost:${PORT}`);
});
