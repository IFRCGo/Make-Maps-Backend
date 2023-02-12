FROM node:18.9.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9092
CMD [ "node", "server.js" ]
