# Etapa 1: Construcción de la aplicación
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Servir la aplicación
FROM nginx:alpine

COPY --from=build /app/dist/app-anime/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
