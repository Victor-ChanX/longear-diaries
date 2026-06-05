import { config as loadEnv } from "dotenv";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma CLI doesn't read .env.local automatically (Next.js does, but not the
// Prisma binary). Load it explicitly so `npm run db:migrate` etc. work.
loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv(); // also load plain .env if present

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  schema: path.join("prisma", "schema.prisma"),
});
