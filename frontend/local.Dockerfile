FROM node:20-slim

RUN npm i -g corepack@latest

RUN corepack enable

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN pnpm install

EXPOSE 3000

ENTRYPOINT ["pnpm", "dev"]