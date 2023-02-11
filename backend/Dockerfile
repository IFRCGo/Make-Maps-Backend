FROM node:18.9.1

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


EXPOSE 9092
CMD [ "node", "server.js" ]
