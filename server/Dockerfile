FROM node:16
WORKDIR /usr/src/app/reimbursement
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

EXPOSE 8000
CMD [ "node", "index.js" ]
