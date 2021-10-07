FROM node:alpine

WORKDIR /home/service

COPY . .

RUN yarn

CMD yarn start:docker:dev
