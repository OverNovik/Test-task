
FROM node:18-alpine as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli.json ./

RUN npm i

COPY src/ src/
COPY config/ config/
COPY migrations/ migrations/

RUN npm run build

FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./

RUN npm ci --omit=dev

COPY --from=development /app/dist/ ./dist/

RUN rm $HOME/.npmrc

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]
