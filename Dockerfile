FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.js standalone server bundle (includes only the runtime imports of
# @prisma/client, not the prisma CLI used for migrations).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma CLI + engines + schema + migrations, copied separately so we can run
# `prisma migrate deploy` at container start. These aren't pulled in by Next's
# tracer because they're build/release tools, not runtime imports.
# We deliberately skip node_modules/.bin/prisma because cross-stage COPY
# resolves the symlink into a flat file whose internal __dirname-relative
# WASM lookups then break. Invoking node_modules/prisma/build/index.js
# directly avoids that.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/dotenv ./node_modules/dotenv

USER nextjs

EXPOSE 3000

# Apply pending migrations, then start the Next.js server. If migrations fail
# (e.g. DB not yet reachable) the server still starts so the table-missing
# fallback can render defaults instead of 500ing.
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy || echo 'WARNING: prisma migrate deploy failed, continuing'; node server.js"]
