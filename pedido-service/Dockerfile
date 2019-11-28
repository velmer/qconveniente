# The instructions for the first stage
FROM node:10-alpine as builder

RUN apk --no-cache add python make g++

COPY package*.json ./
RUN npm install

# The instructions for second stage
FROM node:10-alpine

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

RUN npm install nodemon -g --quiet

COPY . .

EXPOSE 8082

CMD ["npm", "run", "start-dev"]
