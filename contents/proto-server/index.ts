import { Server, ServerCredentials } from '@grpc/grpc-js';
import mongoose from 'mongoose';
import { clientToContentMethods, client_content } from './clientToContentMethods';

const PORT = 8080;
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

server.addService(client_content.CLientToContent.service, clientToContentMethods());
