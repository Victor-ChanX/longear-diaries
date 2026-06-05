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

# Public assets + Next.js standalone server entry.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Full node_modules from builder (overwrites the traced subset that the
# standalone output ships with). We need the Prisma CLI and ALL of its
# transitive deps (effect, etc.) at runtime to run `migrate deploy`, and
# cherry-picking specific packages is too fragile across Prisma versions.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Prisma schema + migration SQL + Prisma 7 config (not part of node_modules).
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

USER nextjs

EXPOSE 3000

# Apply pending migrations, then start the Next.js server. Migration failure
# (e.g. DB not yet reachable) falls through to server start so the
# table-missing fallback can render default content.
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy || echo 'WARNING: prisma migrate deploy failed, continuing'; node server.js"]
