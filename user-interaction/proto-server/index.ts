import { Server, ServerCredentials } from '@grpc/grpc-js';
import mongoose from 'mongoose';
import { clientToUserMethods, client_user } from './clientToUserMethods';
import { contentToUserMethods, content_user } from './contentToUserMethods';

const PORT = 4000;
const server = new Server();

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

server.addService(content_user.ContentToUser.service, contentToUserMethods());
server.addService(client_user.ClientToUser.service, clientToUserMethods());
