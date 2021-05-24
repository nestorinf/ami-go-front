FROM nginx:1.20-alpine

RUN apk update && apk upgrade && apk add bash

WORKDIR /var/www
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]