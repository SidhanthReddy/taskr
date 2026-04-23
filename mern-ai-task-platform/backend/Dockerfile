# Stage 1: build deps
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: production image
FROM node:18-alpine

WORKDIR /app

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app ./

RUN npm prune --production

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]