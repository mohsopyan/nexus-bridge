import "dotenv/config";
import { defineConfig } from "prisma/config";

console.log("--- DEBUG: prisma.config.ts SEDANG DIEKSEKUSI OLEH SISTEM ---");

export default defineConfig({
    schema: "../prisma/schema.prisma",
    datasource: {
        url: process.env.DATABASE_URL,
    }
})