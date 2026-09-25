import { defineConfig } from "prisma/config";

// Natively load .env for Node 20+ so the CLI can read it
try {
  process.loadEnvFile();
} catch (e) {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
