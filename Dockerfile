FROM node:20 AS base

RUN apt-get update && apt-get install -y sqlite3 openssl

FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

FROM base
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
EXPOSE 3333
CMD ["/app/entrypoint.sh"]
