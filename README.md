# Nexus-Bridge 🚀
A High-Performance Hybrid Backend Architecture with AI Integration & Persistence.

## 📌 Overview
Nexus-Bridge is a modern backend system designed for scalability and efficiency. It leverages a hybrid approach by combining **Node.js (TypeScript)** for its high-concurrency API Gateway and **Python (FastAPI)** for AI-driven processing and LLM integration.

## 🏗️ Architecture
Nexus-Bridge menggunakan pola **Microservices** dengan alur kerja sebagai berikut:
1. **Gateway Service (Node.js)**: Bertindak sebagai orkestrator, menangani Autentikasi (JWT), dan melakukan manajemen database (Prisma 7).
2. **Engine Service (Python)**: Bertindak sebagai otak komputasi yang terhubung langsung ke Google Gemini AI.
3. **Database (PostgreSQL)**: Menyimpan data pengguna dan riwayat interaksi AI secara permanen.

### 🌐 Service Networking (Docker)
Dalam lingkungan kontainer, layanan berkomunikasi menggunakan **Internal DNS**:
- **Gateway** memanggil Engine melalui: `http://engine-service:8000`
- **Gateway** memanggil Database melalui: `postgresql://db:5432`
- **Engine** memanggil Google Gemini Cloud via HTTPS.

## ✨ Key Features
- **Resilient Error Handling:** Implementasi Fault Tolerance yang mendeteksi kegagalan layanan Engine (HTTP 503) secara elegan tanpa menjatuhkan Gateway.
- **Usage Analytics:** Perhitungan otomatis total query dan akumulasi jumlah karakter prompt untuk monitoring kuota/biaya API.
- **Service-Oriented Design:** Pemisahan logika bisnis (Service Layer) untuk skalabilitas kode yang lebih bersih.


## 🛠️ Tech Stack
- **Languages**: TypeScript, Python
- **Frameworks**: Express.js, FastAPI
- **AI Engine**: Google Gemini AI (Generative AI SDK)
- **ORM**: Prisma v7.4.0 (Using Driver Adapters for modern environment support)
- **Database**: PostgreSQL
- **Security**: JWT, Bcrypt, Dotenv (Secure Environment Management)

## 🚦 Getting Started

### Database Setup (Docker)
Pastikan Docker Desktop sudah berjalan di sistem Anda. Cukup satu perintah untuk menjalankan seluruh ekosistem (Database, Python Engine, & Node.js Gateway):

1. Clone repositori ini.
2. Buat file `.env` di root folder (lihat `.env.example`).
3. Jalankan perintah:
```bash
docker compose up -d --build
```

## 🛠️ Manual Setup (Development Mode)
### 1. Engine Service(Python)
- ``` cd engine-service ```
- Install dependencies: ``` pip install -r requirements.txt ```
- Jalankan: ``` uvicorn main:app --reload --port 8000 ```

### 2. Gateway Servcie(Node.js)
- ```cd gateway-service```
-```npm install```
- Sync Database: ```npx prisma migrate dev```

## 📡 API Endpoints (v1)
### User & Auth
- `POST /api/v1/user/register` - Mendaftarkan user baru.
- `POST /api/v1/user/login` - Login & mendapatkan JWT Token.

### AI Service (Protected)
- `POST /api/v1/user/ask-ai` - Mengirim prompt ke AI Engine & Menyimpan log ke database.
- `GET /api/v1/user/ai-history` - Mengambil riwayat percakapan AI milik user yang login.
- `GET /api/v1/user/ai-stats` - Mengambil statistik penggunaan (total query &  total karakter)

## 📝 Roadmap & Progress
- [x] Hybrid Connection (Axios Bridge).
- [x] Gemini LLM Integration.
- [x] **Phase V: Database Persistence** (Logging interaksi AI).
- [x] **Phase VI: Advanced Error Handling** (503 Service Unavailable).
- [x] **Phase VII: User Analytics** (Character & Query Counter).
- [x] **Phase VIII: Containerization** (Dockerizing & All Services).
- [ ] **Phase IX: API Documentation** (Swagger/OpenAPI Integration).