FROM node:18.9.1

WORKDIR /usr/app
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 9092
CMD [ "node", "server.js" ]
