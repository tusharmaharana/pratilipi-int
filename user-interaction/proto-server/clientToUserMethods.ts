import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import bcrypt from 'bcryptjs';
import path from 'path';
import * as Yup from 'yup';
import { ProtoGrpcType } from '../proto/client_user';
import { ClientToUserHandlers } from '../proto/client_user/ClientToUser';
import { User } from '../src/models/User';
import { findOneQuery, saveQuery } from '../src/utils/generalQueries';

const PROTO_FILE = '../proto/client_user.proto';

const clientPackageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const clientGrpcObj = loadPackageDefinition(clientPackageDef) as unknown as ProtoGrpcType;
export const client_user = clientGrpcObj.client_user;

export const clientToUserMethods = (): ClientToUserHandlers => {
  return {
    SignUp: async (call, callback) => {
      try {
        await SignUpSchema.validate(call.request, { abortEarly: false });

        const existingUser = await findOneQuery(User, { email: call.request.email });
        if (existingUser) {
          const error = {
            code: 6,
            message: `User with email ${call.request.email} already exists.`
          };
          callback(error, null);
          return;
        }

        const user = new User(call.request);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        let userDoc = await saveQuery(user);

        callback(null, { userId: userDoc._id as string });
      } catch (error) {
        console.log(error);
        callback(error, null);
      }
    }
  };
};

const SignUpSchema = Yup.object()
  .strict(true)
  .noUnknown()
  .shape({
    email: Yup.string().email('Invalid Email!').required('Required'),
    password: Yup.string()
      .min(10, 'Too Short!')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, 'password is not valid')
      .required('Required')
  });
