FROM node:16

WORKDIR /usr/src/app

# Copiar todo el contenido primero
COPY . .

# Instalar dependencias
RUN npm install

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]