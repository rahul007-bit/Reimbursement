FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
# RUN node index
EXPOSE 8080
CMD [ "node", "index.js" ]
