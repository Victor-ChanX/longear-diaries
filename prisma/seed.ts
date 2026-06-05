import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set. See .env.example.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: url }),
});

async function main() {
  // No seed data — animals are managed entirely through the admin panel.
  console.log("Seed: nothing to insert. Use /admin/animals to add records.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
