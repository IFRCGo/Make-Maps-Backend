FROM node:18.9.1

WORKDIR /usr/app
# Bundle app source
COPY . /usr/app

RUN npm install



EXPOSE 9092
CMD [ "node", "server.js" ]
