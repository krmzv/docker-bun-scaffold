# Notes App

Bun + Fastify API with React UI and Postgres.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)

## Development

Runs everything in containers with hot reload.

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

API on `localhost:3000`, UI on `localhost:5173`.

## Production

Runs optimized production builds in containers.

```sh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## Stop containers

```sh
docker compose down
```
