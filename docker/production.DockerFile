# etapa de compilación
FROM node:16.5.0-alpine3.11 as build-stage
COPY ["./package*.json", "/usr/src/"]
RUN npm i -g @vue/cli
RUN cd /usr/src/; rm -rf node_modules package-lock.json && npm install --force
WORKDIR /usr/src
COPY ["./", "/usr/src/."]
RUN npm run build

# etapa de producción
FROM nginx:1.21.1-alpine as production-stage
RUN apk update && apk upgrade && apk add bash
WORKDIR /var/www
COPY --from=build-stage /usr/src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]