import express, { Application, Request, Response } from 'express'
import userRoutes from './routes/userRoutes.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware agar server bisa membaca json
app.use(express.json());

// Jalur utama (Route)
app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server meluncur di http://localhost:${PORT}`);
});
