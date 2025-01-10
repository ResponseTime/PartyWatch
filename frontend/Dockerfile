FROM node:18

WORKDIR /app

EXPOSE 5173

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm","run","build" ]