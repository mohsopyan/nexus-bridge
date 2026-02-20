# Nexus-Bridge 🚀
A High-Performance Hybrid Backend Architecture.

## 📌 Overview
Nexus-Bridge is a modern backend system designed for scalability and efficiency. It leverages a hybrid approach by combining **Node.js (TypeScript)** for its high-concurrency API Gateway and **Python (FastAPI)** for AI-driven processing heavy data computation.

## 🏗️ Architecture
- **Gateway Service**: Built with Node.js & TypeScript. Handles Routing, Authentication (JWT) and User Management. (Port 3000)
- **Engine Service**: Built with Python & FastAPI. Handles AI Integration and Data Analytics. (Port 8000)

## 🛠️ Tech Stack (In Progress)
- **Languages**: TypeScript, Python
- **Frameworks**: Express.js, FastAPI
- **ORM**: Prisma v7.4.0 (Using Driver Adapters)
- **Database**: PostgreSQL (Prisma ORM)
- **Security**: JWT (Authentication), Bcrypt (hashing)
- **DevOps**: Docker, Git

## Prasyarat
- Node.js & NPM
- Docker (untuk PostgreSQL)

## 🚦Getting Started

### 1. Engine Service (Python)
1. `cd engine-service`
2. Aktifkan venv: `.\venv\Scripts\activate` (Windows)
3. `pip install -r requirements.txt` (atau manual: fastapi uvicorn)
4. Jalankan: `uvicorn main:app --reload --port 8000`

### 2. Gateway Service (Node.js)
1. `cd gateway-service`
2. `npm install`
3. Sesuaikan `.env` (DATABASE_URL & JWT_SECRET).
4. Run development: `npm run dev` (Port 3000).

## API Endpoints (v1)
- `POST /api/v1/user/register` - Mendaftarkan user baru.
- `POST /api/v1/user/login` - Masuk ke sistem (Mendapatkan JWT).
- `POST /api/v1/user/ask-ai` - (Protected) Mengirim prompt dari Gateway ke Engine Service.