FROM node:18

WORKDIR /ecommerse-ngiulianonissero

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","start" ]