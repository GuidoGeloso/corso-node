#invece di FROM node che usa la versione latest, ne uso una più piccola
FROM node:14-alpine

#Install production deps only
ENV NODE_ENV=production

#Install some dependencies

WORKDIR /usr/app
COPY ./ /usr/app

# Install dependencies first, as they change less often than code.
COPY ./package.json ./package-lock.json* ./
RUN npm i
RUN npm cache clean --force
COPY ./ ./

EXPOSE 3000

COPY app.js .

CMD node app.js