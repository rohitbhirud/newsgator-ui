FROM node:16.11.0-alpine

RUN mkdir -p /var/www/dockerize-nuxt/newsgator
WORKDIR /var/www/dockerize-nuxt/newsgator

COPY package*.json ./

RUN npm install

COPY . .

RUN npm ci && npm cache clean --force
RUN npm run build

EXPOSE 3005

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3005

CMD [ "node", ".output/server/index.mjs" ]