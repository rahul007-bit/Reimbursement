FROM node:16
WORKDIR /reimbursement
COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN apt-get update && apt-get install -y ghostscript
COPY . .

EXPOSE 8000
CMD [ "yarn", "dev" ]
