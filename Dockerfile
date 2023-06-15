FROM node:16.11.0-alpine

RUN mkdir -p /var/www/dockerize-nuxt/newsgator
WORKDIR /var/www/dockerize-nuxt/newsgator

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

RUN node ./node_modules/esbuild/install.js

EXPOSE 3000

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

CMD [ "node", ".output/server/index.mjs" ]