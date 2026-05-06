FROM oven/bun:1-alpine AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM base AS dev
COPY --from=install /usr/src/app/node_modules node_modules
COPY . .
CMD ["bun", "--watch", "src/index.ts"]

FROM base AS prod
COPY --from=install /usr/src/app/node_modules node_modules
COPY . .
EXPOSE 3000
USER bun
CMD ["bun", "src/index.ts"]
