FROM node:16.20-alpine3.17

RUN mkdir -p /var/www/dockerize-nuxt/newsgator
WORKDIR /var/www/dockerize-nuxt/newsgator

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

CMD [ "npm", "dev" ]