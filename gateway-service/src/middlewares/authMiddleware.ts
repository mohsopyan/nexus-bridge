import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Akses ditolak, token tidak ada!"
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        req.user = verified;

        next();
    } catch (error) {
        res.status(403).json({
            message: "Token tidak valid atau sudah kadaluarsa!",
        })
    }
}