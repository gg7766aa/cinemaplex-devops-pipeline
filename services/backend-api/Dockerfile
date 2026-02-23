# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

# Stage 2: Production
FROM node:18-alpine AS production
LABEL maintainer="govinddevopsdocker"
LABEL description="Cinemaplex Backend API"
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --spider http://localhost:3001/health || exit 1
CMD ["node", "src/server.js"]
