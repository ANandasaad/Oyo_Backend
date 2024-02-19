FROM node:latest
RUN npm install -g nodemon
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3003
CMD npm run server
