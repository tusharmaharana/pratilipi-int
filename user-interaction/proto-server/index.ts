import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import mongoose from 'mongoose';
import path from 'path';
import { ProtoGrpcType } from '../proto/content_user';
import { UsersHandlers } from '../proto/content_user/Users';
import { Like } from '../src/models/Like';
import { User } from '../src/models/User';
import { isNotEmptyObject } from '../src/utils/commonHelpers';
import { createDocumentQuery, findOneAndDeleteQuery, findOneQuery } from '../src/utils/generalQueries';

const PORT = 4000;
const PROTO_FILE = '../proto/content_user.proto';

const packageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const content_user = grpcObj.content_user;

const main = () => {
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
};

const getServer = () => {
  const server = new Server();
  server.addService(content_user.Users.service, {
    ValidateUser: async (req, res) => {
      const userId = req.request.id;
      try {
        const existingUser = await findOneQuery(User, { _id: userId });
        if (!isNotEmptyObject(existingUser)) {
          const error = {
            code: 5,
            name: 'Not Found',
            message: `User with ID ${userId} does not exist.`
          };
          res(error, null);
          return;
        }
        res(null, { code: 'OK' });
      } catch (err) {
        const error = {
          code: 7,
          name: 'Denied',
          message: `Permission is Denied`
        };
        res(error, null);
        console.error(err);
      }
    },

    SetLikes: async (req, res) => {
      const userId = req.request.userId;
      const contentId = req.request.contentId;

      const params = { contentId, userId };
      let record: Record<string, unknown>;
      try {
        record = record ? await findOneAndDeleteQuery(Like, params) : await createDocumentQuery(Like, params);

        res(null, { code: 'OK' });
      } catch (err) {
        const error = {
          code: 13,
          name: 'Server Error',
          message: `Something went wrong`
        };
        console.log(err);
        res(error, null);
        return;
      }
    }
  } as UsersHandlers);

  return server;
};

main();
