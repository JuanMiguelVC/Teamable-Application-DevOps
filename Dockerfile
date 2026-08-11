# ==========================================
# ETAPA 1: Construcción (Frontend Vue.js + Backend Node.js)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos los manifiestos de dependencias
COPY package*.json ./

# Instalamos TODAS las dependencias (necesarias para compilar Vue)
RUN npm install

# Copiamos todo el código fuente (HTML, CSS, JS, Vue, Node)
COPY . .

# Compilamos el frontend de Vue.js (genera la carpeta dist/ o build/ con HTML/CSS/JS estático)
# Nota: Asegúrate de que este comando coincide con el de tu package.json
RUN npm run build 

# ==========================================
# ETAPA 2: Producción (Entorno ligero para Node.js)
# ==========================================
FROM node:20-alpine AS production

WORKDIR /app

# Añadimos usuario no privilegiado por seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiamos manifiestos e instalamos SOLO dependencias de producción para Node.js
COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos el código del backend de Node.js
# (Ajusta "./server" si tu código backend está en otra carpeta, o usa "." si está en la raíz)
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/validator.js ./validator.js

# Copiamos los archivos estáticos compilados de Vue.js
# (Ajusta "./dist" según la carpeta de salida de tu build de Vue)
COPY --from=builder /app/dist ./dist 

# Configuramos variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Cambiamos al usuario seguro
USER appuser

EXPOSE 3000

# Comando para arrancar el servidor Node.js
CMD ["npm", "start"]