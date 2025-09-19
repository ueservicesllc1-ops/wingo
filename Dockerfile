# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Construir la app
RUN npm run build

# Etapa 2: production
FROM node:20-alpine

WORKDIR /app

# Copiar dependencias instaladas y build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Exponer puerto
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "start"]
