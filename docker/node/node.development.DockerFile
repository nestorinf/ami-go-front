FROM node:latest

COPY ["./package.json", "/usr/src/"]

RUN cd /usr/src/; npm install -g npm@7.14.0

WORKDIR /usr/src

RUN npm install

#RUN npm install --only=development


COPY ["./", "/usr/src/"]

EXPOSE 8081

CMD ["npm", "run", "serve"]

