import { Request, Response } from "express";

export const getHealthStatus = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Nexus-Bridge Gateway is Running!",
    status: "Healthy",
    timestamp: new Date().toISOString(),
  });
};
