import "dotenv/config";
import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import prisma from "./lib/prisma.js";
import cors from "cors";
import helmet from "helmet";


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());

// Middleware agar server bisa membaca json
app.use(express.json({ limit: "10kb" }));

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

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ status: "Error", message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server meluncur di http://localhost:${PORT}`);
});

export default app;

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("🔌 Prisma disconnected. Server shutting down...");
  process.exit(0);
});