import { Router } from 'express';
import { loginUser, registerUser, askAI } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "Selamat datang di area rahasia Nexus Bridge!",
        userData: (req as any).user
    })
})

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/ask-ai', authenticateToken, askAI);

export default router;