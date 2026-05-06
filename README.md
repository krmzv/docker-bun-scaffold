# Notes App

Bun + Fastify API with React UI and Postgres.

**Stack:** Bun · Fastify · Drizzle ORM · Zod · React 19 · TanStack Query · Vite · TypeScript

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Bun](https://bun.sh) — optional, only needed to run outside containers

## Scripts

Premade scripts at the root (requires Bun installed locally):

| Command | Description |
|---|---|
| `bun run dev:docker` | Start dev containers with hot reload |
| `bun run prod:docker` | Start production containers |
| `bun run down` | Stop and remove containers |
| `bun run test` | Run all tests (api + ui) |

Without Bun, use the Docker commands directly — see sections below.

## Development

Runs everything in containers with hot reload.

```sh
bun run dev:docker
# or
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

API on `localhost:3000`, UI on `localhost:5173`.

## Production

Runs optimized production builds in containers.

```sh
bun run prod:docker
# or
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

UI served via Nginx, API and Postgres in containers. DB migrations run automatically on startup.

## Stop containers

```sh
bun run down
# or
docker compose down
```

## Testing

- **API** — `bun test` (Bun's built-in test runner)
- **UI** — `vitest run`

Run both at once:

```sh
bun run test
```

Or individually:

```sh
cd api && bun test
cd ui && bun test   # runs vitest
```

## Database

Drizzle ORM with Postgres. Useful commands (run inside `api/`):

```sh
bun run db:generate   # generate migrations from schema
bun run db:migrate    # apply migrations (Drizzle Kit)
bun run db:studio     # open Drizzle Studio
```
