# Usa una imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del frontend
COPY ./ /app

# Instala las dependencias
RUN npm install

# Expone el puerto de la aplicación React
EXPOSE 3000

# Comando para iniciar la app de React
CMD ["npm", "start"]
