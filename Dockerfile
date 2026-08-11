# ==========================================
# ETAPA 1: Construcción (Frontend Vue.js + Backend Node.js)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copiamos manifiestos y dependencias
COPY package*.json ./

# 2. Instalamos TODAS las dependencias (incluyendo devDependencies para Vue y Jest)
RUN npm ci

# 3. Copiamos todo el código fuente
COPY . .

# 4. Compilamos el frontend de Vue.js
# Esto normalmente toma src/ e index.html y genera una carpeta dist/
RUN npm run build 

# ==========================================
# ETAPA 2: Producción (Entorno ligero para Node.js)
# ==========================================
FROM node:20-alpine AS production

WORKDIR /app

# 5. Seguridad: Creamos usuario no privilegiado
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 6. Copiamos manifiestos e instalamos SOLO dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# 7. Copiamos los archivos exactos del backend desde la raíz
COPY --from=builder /app/server.js ./
COPY --from=builder /app/validator.js ./

# 8. Copiamos los estáticos generados por Vue.js
# Nota: Si tu build genera la carpeta con otro nombre (como 'build'), cámbialo aquí.
COPY --from=builder /app/dist ./dist 

# 9. Configuramos el entorno
ENV NODE_ENV=production
ENV PORT=3000

# 10. Cambiamos al usuario seguro
USER appuser

EXPOSE 3000

# 11. Arrancamos la aplicación
CMD ["npm", "start"]