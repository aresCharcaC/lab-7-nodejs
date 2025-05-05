FROM node:16

WORKDIR /usr/src/app

# Verificar contenido (para diagnóstico)
RUN ls -la

# Copiar TODOS los archivos primero
COPY . .

# Verificar contenido después de copiar
RUN ls -la

# Instalar dependencias
RUN npm install

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]