import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';


// Mocking Prisma Module (Solusi Hoisting)
vi.mock('../lib/prisma.js', async () => {
    const { prismaMock } = await import('../__mocks__/prisma.js');
    return {
        default: prismaMock,
    }
});

import { prismaMock } from '../__mocks__/prisma.js';

describe('User Registration', () => {
  it('should register a new user successfully', async () => {
    // 1. Atur apa yang dikembalikan Prisma "Palsu" saat dipanggil
    prismaMock.user.create.mockResolvedValue({
      id: "user-123",
      email: "test@example.com",
      name: "Test User",
      password: "hashedpassword123",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // 2. Jalankan request ke API kamu
    const response = await request(app)
      .post('/api/v1/user/register')
      .send({
        email: "test@example.com",
        name: "Test User",
        password: "password123"
      });

    // 3. Verifikasi hasilnya
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User berhasil terdaftar di database!");
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe("test@example.com");

    // 4. Pastikan Prisma benar-benar dipanggil oleh controller
    expect(prismaMock.user.create).toHaveBeenCalled();
  });

  it('should return 400 if email is already taken (Negative Path', async () => {
    // Simulasi erro unique constraint prisma (p2002)
    const prismaError = new Error('Unique constraint failed on the fields: (`email`)') as any;
    prismaError.code = 'P2002';

    prismaMock.user.create.mockRejectedValue(prismaError);

    const response = await request(app)
      .post('/api/v1/user/register')
      .send({
        email: "existing@example.com",
        name: "Old User",
        password: "password123"
      });

      // Validasi response
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toBe('Gagal mendaftar user')
  })
});