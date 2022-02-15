FROM node:12.22.10-alpine
WORKDIR /usr/pratilipi-int/user-api
EXPOSE 9000
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .