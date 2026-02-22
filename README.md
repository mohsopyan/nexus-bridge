# Nexus-Bridge 🚀
A High-Performance Hybrid Backend Architecture with AI Integration.

## 📌 Overview
Nexus-Bridge is a modern backend system designed for scalability and efficiency. It leverages a hybrid approach by combining **Node.js (TypeScript)** for its high-concurrency API Gateway and **Python (FastAPI)** for AI-driven processing and LLM integration.

## 🏗️ Architecture
- **Gateway Service**: Built with Node.js & TypeScript. Handles Routing, Authentication (JWT) and Service Orchestration. (Port 3000)
- **Engine Service**: Built with Python & FastAPI. Integrated with **Google Gemini Pro/Flash** for advanced AI Analysis. (Port 8000)

## 🛠️ Tech Stack (In Progress)
- **Languages**: TypeScript, Python
- **Frameworks**: Express.js, FastAPI
- **AI Engine**: Google Gemini AI (Generative AI SDK)
- **ORM**: Prisma v7.4.0 (Using Driver Adapters)
- **Database**: PostgreSQL 
- **Security**: JWT (Authentication), Bcrypt (hashing)
- **DevOps**: Docker, Git

## Prasyarat
- Node.js & NPM
- Docker (untuk PostgreSQL)

## 🚦Getting Started

### 1. Engine Service (Python)
1. `cd engine-service`
2. Aktifkan venv: `.\venv\Scripts\activate` (Windows)
3. Install dependencies: `pip install fastapi uvicorn google-generativeai python-dotenv`
4. Buat file `.env` dan tambahkan `GEMINI_API_KEY=your_key_here`
5. Jalankan: `uvicorn main:app --reload --port 8000`

### 2. Gateway Service (Node.js)
1. `cd gateway-service`
2. `npm install`
3. Sesuaikan `.env` (DATABASE_URL & JWT_SECRET).
4. Run development: `npm run dev` (Port 3000).

## API Endpoints (v1)
### User & Auth
- `POST /api/v1/user/register` - Mendaftarkan user baru.
- `POST /api/v1/user/login` - Login & mendapatkan JWT Token.

### AI Service (Protected)
- `POST /api/v1/user/ask-ai` - Mengirim prompt ke Python Engine. 
  - **Logic**: Gateway (Node) -> Engine (Python) -> Gemini AI -> Client.