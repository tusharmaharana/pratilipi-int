import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import mongoose from 'mongoose';
import path from 'path';
import { ProtoGrpcType } from '../proto/content_user';
import contentToUserMethods from './contentToUserMethods';

const PORT = 4000;
const PROTO_FILE = '../proto/content_user.proto';

const packageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const content_user = grpcObj.content_user;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    server.bindAsync(`0.0.0.0:${PORT}`, ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`GRPC server started on port ${port}`);
      server.start();
    });
  })
  .catch(err => console.log('Error while connecting to MongoDB', err));

const server = new Server();
server.addService(content_user.Users.service, contentToUserMethods());
