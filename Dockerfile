FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm i
EXPOSE 3000
CMD [ "node", "server.js" ]
