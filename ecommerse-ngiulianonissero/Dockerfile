FROM node:18

WORKDIR /app/ecommerse-ngiulianonissero

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD [ "npm","run","start" ]