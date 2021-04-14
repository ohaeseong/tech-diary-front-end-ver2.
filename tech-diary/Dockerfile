FROM node:12.18.3-alpine3.11

RUN mkdir -p /tech-diary-front

WORKDIR /tech-diary-front

COPY package*.json ./
COPY tsconfig.json ./

COPY ./ ./

RUN yarn

ADD . /tech-diary

RUN yarn build

USER node

EXPOSE 3000

CMD ["yarn", "start"];