import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import bcrypt from 'bcryptjs';
import path from 'path';
import { ProtoGrpcType } from '../proto/content_user';
import { ContentToUserHandlers } from '../proto/content_user/ContentToUser';
import { Like } from '../src/models/Like';
import { User } from '../src/models/User';
import { isNotEmptyObject } from '../src/utils/commonHelpers';
import { createDocumentQuery, findOneAndDeleteQuery, findOneQuery, saveQuery } from '../src/utils/generalQueries';

const PROTO_FILE = '../proto/content_user.proto';

const contentPackageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const contentGrpcObj = loadPackageDefinition(contentPackageDef) as unknown as ProtoGrpcType;
export const content_user = contentGrpcObj.content_user;

export const contentToUserMethods = (): ContentToUserHandlers => {
  return {
    ValidateUser: async (call, callback) => {
      const userId = call.request.id;
      // const id = JSON.parse(userId);
      if (userId.match(/^[0-9a-fA-F]{24}$/)) console.log(userId);
      else console.log(false);
      try {
        const existingUser = await findOneQuery(User, { _id: userId });
        if (!isNotEmptyObject(existingUser)) {
          const error = {
            code: 5,
            name: 'Not Found',
            message: `User with ID ${userId} does not exist.`
          };
          callback(error, null);
          return;
        }
        callback(null, { code: 'OK' });
      } catch (err) {
        const error = {
          code: 7,
          name: 'Denied',
          message: `Permission is Denied`
        };
        callback(error, null);
        console.error(err);
      }
    },

    SetLikes: async (call, callback) => {
      const userId = call.request.userId;
      const contentId = call.request.contentId;
      console.log(userId, contentId);

      const params = { contentId, userId };
      let record: Record<string, unknown> = await findOneQuery(Like, params);
      try {
        record = record ? await findOneAndDeleteQuery(Like, params) : await createDocumentQuery(Like, params);

        callback(null, { code: 'OK' });
      } catch (err) {
        const error = {
          code: 13,
          name: 'Server Error',
          message: `Something went wrong`
        };
        console.log(err);
        callback(error, null);
        return;
      }
    },
    UpdateUserDB: async (call, callback) => {
      try {
        const user = new User(call.request);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await saveQuery(user);
      } catch (error) {
        console.log(error);
        callback(error, null);
      }
    }
  };
};
