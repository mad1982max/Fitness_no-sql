FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm update
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]