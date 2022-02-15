FROM node:12.22.10-alpine
WORKDIR /usr/pratilipi-int/content-api
EXPOSE 9001
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN npm install -g concurrently
CMD ["concurrently","yarn:start:grpc:client","yarn:start:grpc:server"]