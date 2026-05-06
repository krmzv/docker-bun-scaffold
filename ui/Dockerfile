FROM oven/bun:1-alpine AS install
WORKDIR /usr/src/app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM install AS build
COPY . .
ARG VITE_API_URL
RUN bun run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
