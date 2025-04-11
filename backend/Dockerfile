FROM node:20.17-alpine3.20 AS build

RUN npm i -g corepack@latest

RUN corepack enable

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20.17-alpine3.20 AS production

RUN npm i -g corepack@latest

RUN apk add --no-cache curl

RUN corepack enable

WORKDIR /app

COPY --from=build /app ./
COPY --from=build /app/prisma ./prisma

RUN pnpm install --prod

RUN pnpm add prisma @prisma/client

EXPOSE 3001

CMD ["pnpm", "run", "start:prod"]
