# Nexus-Bridge 🚀
A High-Performance Hybrid Backend Architecture with AI Integration & Persistence.

## 📌 Overview
Nexus-Bridge is a modern backend system designed for scalability and efficiency. It leverages a hybrid approach by combining **Node.js (TypeScript)** for its high-concurrency API Gateway and **Python (FastAPI)** for AI-driven processing and LLM integration.

## 🏗️ Architecture
Nexus-Bridge menggunakan pola **Microservices** dengan alur kerja sebagai berikut:
1. **Gateway Service (Node.js)**: Bertindak sebagai orkestrator, menangani Autentikasi (JWT), dan melakukan manajemen database (Prisma 7).
2. **Engine Service (Python)**: Bertindak sebagai otak komputasi yang terhubung langsung ke Google Gemini AI.
3. **Database (PostgreSQL)**: Menyimpan data pengguna dan riwayat interaksi AI secara permanen.



## 🛠️ Tech Stack
- **Languages**: TypeScript, Python
- **Frameworks**: Express.js, FastAPI
- **AI Engine**: Google Gemini AI (Generative AI SDK)
- **ORM**: Prisma v7.4.0 (Using Driver Adapters for modern environment support)
- **Database**: PostgreSQL
- **Security**: JWT, Bcrypt, Dotenv (Secure Environment Management)

## 🚦 Getting Started

### 1. Database Setup (Docker)
Pastikan Docker Desktop berjalan, lalu jalankan PostgreSQL.

### 2. Engine Service (Python)
1. `cd engine-service`
2. Aktifkan venv: `.\venv\Scripts\activate`
3. Install dependencies: `pip install fastapi uvicorn google-generativeai python-dotenv`
4. Buat `.env` dan tambahkan `GEMINI_API_KEY=your_key`
5. Jalankan: `uvicorn main:app --reload --port 8000`

### 3. Gateway Service (Node.js)
1. `cd gateway-service`
2. `npm install`
3. Sesuaikan `.env` (`DATABASE_URL`, `JWT_SECRET`, `ENGINE_URL`).
4. **Prisma Sync**: 
   - Karena menggunakan Prisma 7 + Driver Adapter, gunakan flag URL untuk migrasi:
   - `npx prisma migrate dev --url="your_postgresql_url"`
5. Run development: `npm run dev` (Port 3000).

## 📡 API Endpoints (v1)
### User & Auth
- `POST /api/v1/user/register` - Mendaftarkan user baru.
- `POST /api/v1/user/login` - Login & mendapatkan JWT Token.

### AI Service (Protected)
- `POST /api/v1/user/ask-ai` - Mengirim prompt ke AI Engine & Menyimpan log ke database.
- `GET /api/v1/user/ai-history` - Mengambil riwayat percakapan AI milik user yang login.

## 📝 Roadmap & Progress
- [x] Hybrid Connection (Axios Bridge).
- [x] Gemini LLM Integration.
- [x] **Phase V: Database Persistence** (Logging interaksi AI).
- [ ] Phase VI: Analytics Dashboard & Advanced Error Handling.