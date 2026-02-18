# Nexus-Bridge 🚀
A High-Performance Hybrid Backend Architecture.

## 📌 Overview
Nexus-Bridge is a modern backend system designed for scalability and efficiency. It leverages a hybrid approach by combining **Node.js (TypeScript)** for its high-concurrency API Gateway and **Python (FastAPI)** for AI-driven processing heavy data computation.

## 🏗️ Architecture
- **Gateway Service**: Built with Node.js & TypeScript. Handles Routing, Authentication and User Management.
- **Engine Service**: Built with Python & FastAPI. Handles AI Integration and Data Analytics.

## 🛠️ Tech Stack (In Progress)
- **Languages**: TypeScript, Python
- **Frameworks**: Express.js, FastAPI
- **ORM**: Prisma v7.4.0 (Using Driver Adapters)
- **Database**: PostgreSQL (Prisma ORM)
- **Security**: Bcrypt for password hashing
- **DevOps**: Docker, Git

## Prasyarat
- Node.js & NPM
- Docker (untuk PostgreSQL)

## 🚦Getting Started
Currently in the development phase.
1. `cd gateway-service/clone repository`
2. `npm install`
3. Salin `.env.example` ke `.env` dan sesuaikan `DATABASE_URL`.
4. Jalankan migrasi: `npx prisma generate`.
5. Run development: `npm run dev`.

## API Endpoints (v1)
- `POST /api/v1/user/register` - Mendaftarkan user baru.
- `POST /api/v1/user/login` - Masuk ke sistem.