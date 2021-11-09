FROM node:16.10

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm i nodemon -g

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]