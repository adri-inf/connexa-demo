# Crear imagen: docker build -t connexa/next .
# Crear contenedor a partir de imagen: docker run -it -d -p 3000:3000 connexa/next (usar docker-compose.yml en su lugar)

FROM node:22.13-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
