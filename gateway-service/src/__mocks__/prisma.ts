import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended';

// Buat 'deep mock' dari PrismaClient
const prismaMock = mockDeep<PrismaClient>()

// Setiap test baru dimulai, reset datanya
beforeEach(() => {
    mockReset(prismaMock)
})

export { prismaMock }