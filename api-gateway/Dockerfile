FROM node:12.22.10-alpine
WORKDIR /usr/pratilipi-int/api-gateway
EXPOSE 5000
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN npm install -g concurrently
CMD ["concurrently","yarn:dev:grpc:user","yarn:dev:grpc:content","yarn:dev"]