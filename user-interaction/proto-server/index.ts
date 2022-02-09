import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import mongoose from 'mongoose';
import path from 'path';
import { ProtoGrpcType } from '../proto/content_user';
import { UsersHandlers } from '../proto/content_user/Users';
import { User } from '../src/models/User';
import { isNotEmptyObject } from '../src/utils/commonHelpers';
import { findOneQuery } from '../src/utils/generalQueries';

const PORT = 4000;
const PROTO_FILE = '../proto/content_user.proto';

const packageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const content_user = grpcObj.content_user;

const getServer = () => {
  const server = new Server();
  server.addService(content_user.Users.service, {
    ValidateUser: async (req, res) => {
      const userId = req.request.id;
      try {
        const existingUser = await findOneQuery(User, { _id: userId });
        if (!isNotEmptyObject(existingUser)) {
          const error = {
            code: 404,
            name: 'Not Found',
            message: `User with ID ${userId} does not exist.`
          };
          res(error, null);
          return;
        }
        res(null, { code: 'SUCCESSFULL' });
      } catch (err) {
        const error = {
          code: 401,
          name: 'Unauthorized',
          message: `UserID ${userId} is not valid.`
        };
        res(error, null);
        console.error(err);
      }
    },
    SetLikes: (req, res) => {
      console.log(req.request);
      res(null, { code: 'SUCCESSFULL' });
    }
  } as UsersHandlers);

  return server;
};

const server = getServer();

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
