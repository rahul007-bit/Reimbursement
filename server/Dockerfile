FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache ghostscript
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 8000
CMD ["yarn", "start"]
