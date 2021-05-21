FROM node:14

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 433

EXPOSE 8080

CMD node ./dist/main.js