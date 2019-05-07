FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./
COPY ./_dist .

RUN npm install

EXPOSE 8080
CMD [ "node", "main.js" ]