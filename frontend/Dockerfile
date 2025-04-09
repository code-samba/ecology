FROM node:20.17-alpine3.20

RUN npm i -g corepack@latest

RUN corepack enable

RUN apk add \
  tzdata

RUN ls /usr/share/zoneinfo && \
  cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
  echo "America/Sao_Paulo" >  /etc/timezone

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN pnpm install

COPY . /app

RUN pnpm build

EXPOSE 3000

ENTRYPOINT ["pnpm", "start"]