FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 50100
RUN chmod 777 /app
CMD ["npm", "start"]