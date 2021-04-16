FROM node:12.18.3-alpine3.11 AS build

RUN mkdir -p /tech-diary-front

WORKDIR /tech-diary-front

COPY package*.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

COPY . .

RUN yarn build

FROM node:12.18.3-alpine3.11

ENV NODE_ENV=production

COPY package*.json ./
COPY package-lock*.json ./
RUN yarn install --production

COPY --from=build /tech-diary-front .
# ADD . /tech-diary

EXPOSE 3000
CMD ["yarn", "start"];