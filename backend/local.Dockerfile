FROM node:20.10-alpine

RUN npm i -g corepack@latest

RUN apk add --no-cache curl

RUN corepack enable

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN pnpm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["pnpm", "start:dev"]
