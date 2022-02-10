FROM node:12.22.10-alpine
WORKDIR /usr/pratilipi-int/user-api
EXPOSE 4000
EXPOSE 5001
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN npm install -g concurrently
CMD ["concurrently","yarn:start:grpc","yarn:start"]