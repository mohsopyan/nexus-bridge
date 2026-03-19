# Gunakan node versi LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files untuk install dependencies dulu (biar cache Docker efisien)
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Copy seluruh source code
COPY . .

# Generate Prisma Client di dalam container
RUN npx prisma generate

# Build TypeScript ke JavaScript
RUN npm run build

# Expose port sesuai app.ts
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]