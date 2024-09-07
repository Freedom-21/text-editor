FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_END_POINT=http://192.168.240.10:5000

EXPOSE 3000

CMD ["npm", "start"]
