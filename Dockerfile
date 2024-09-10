FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]