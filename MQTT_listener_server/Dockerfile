FROM node:16.14.2-alpine

LABEL autor1="Mauricio Duran"
ARG PORT=3000

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

ENTRYPOINT [ "npm", "run", "dev" ]