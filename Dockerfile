# syntax=docker/dockerfile:1

FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN ls
RUN npm install --production

COPY . .


RUN ls
CMD [ "node", "./server/index.js" ]