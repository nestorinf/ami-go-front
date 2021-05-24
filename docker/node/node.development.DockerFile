FROM node:latest

COPY ["./package.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

#RUN npm install --only=development


COPY ["./", "/usr/src/"]

EXPOSE 8081

CMD ["npm", "run", "serve"]

