import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createClient = (): PrismaClient => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not set. See .env.example.");
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: url }),
    log:
      process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

// Lazy proxy — `next build` evaluates page modules to collect config; if we
// instantiated Prisma at module load it would throw when DATABASE_URL is
// absent inside the build container. The client is only created the first
// time a property is accessed (i.e. at request time).
const getClient = (): PrismaClient => {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }

  return globalForPrisma.prisma;
};

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getClient() as unknown as Record<string | symbol, unknown>;
    const value = client[prop];

    return typeof value === "function" ? value.bind(client) : value;
  },
}) as PrismaClient;
