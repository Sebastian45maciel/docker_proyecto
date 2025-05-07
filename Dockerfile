# Usa Node 18, requerido por tu proyecto
FROM node:18

# Crear usuario sin privilegios
RUN addgroup appgroup && adduser --disabled-password --ingroup appgroup appuser

# Crear el directorio de trabajo con permisos correctos
RUN mkdir -p /app && chown -R appuser:appgroup /app
WORKDIR /app

# Cambiar a usuario no root
USER appuser

# Copiar e instalar dependencias
COPY --chown=appuser:appgroup package*.json ./
RUN npm install

# Copiar el resto del código
COPY --chown=appuser:appgroup . .

# Exponer el puerto
EXPOSE 3000

# Iniciar la app
CMD ["npm", "start"]
