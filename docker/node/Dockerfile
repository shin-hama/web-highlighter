FROM node:18-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY . /app/

RUN pnpm install
