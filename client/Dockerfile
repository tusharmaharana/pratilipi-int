FROM node:16.14.0-alpine
WORKDIR /usr/pratilipi-int/frontend
EXPOSE 3000
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .