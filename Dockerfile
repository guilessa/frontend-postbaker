FROM node:14.17.4-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json .
RUN yarn 
COPY . .
EXPOSE 3000

CMD ["yarn", "start"]