# Longear Diaries

Endangered animal field notes on an interactive cobe globe, built with Next.js
16, Tailwind CSS, and shadcn-style UI primitives.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Docker

```bash
docker build -t longear-diaries .
docker run --rm -p 3000:3000 longear-diaries
```

## Dokploy

Use Dockerfile deployment.

- Repository: `git@github.com:Victor-ChanX/longear-diaries.git`
- Branch: `main`
- Dockerfile path: `Dockerfile`
- Port: `3000`
- Build command: handled by Dockerfile
- Start command: handled by Dockerfile

No runtime environment variables are required for the current static frontend.
