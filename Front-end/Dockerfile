FROM node:lts-alpine

WORKDIR /app

RUN apk update && \
    apk add --update git && \
    apk add --update openssh


RUN git clone https://github.com/zaferdrn0/Car-WorkShop-React-Express.js.git /app

WORKDIR /app/Front-end

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
