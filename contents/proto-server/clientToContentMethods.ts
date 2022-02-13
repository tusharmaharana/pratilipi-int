import { loadPackageDefinition, sendUnaryData, ServerUnaryCall, status } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
// import * as Yup from 'yup';
import { ProtoGrpcType } from '../proto/client_content';
import { CLientToContentHandlers } from '../proto/client_content/CLientToContent';
import { LikeRequest__Output } from '../proto/client_content/LikeRequest';
import { LikeResponse } from '../proto/client_content/LikeResponse';
import { Content } from '../src/models/Content';
import { isNotEmptyObject } from '../src/utils/commonHelpers';
import { findOneAndUpdateQuery, findOneQuery, findQuery } from '../src/utils/generalQueries';

const PROTO_FILE = '../proto/client_content.proto';

const clientPackageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const clientGrpcObj = loadPackageDefinition(clientPackageDef) as unknown as ProtoGrpcType;
export const client_content = clientGrpcObj.client_content;

export const clientToContentMethods = (): CLientToContentHandlers => {
  return {
    TopContents: async call => {
      try {
        const allContents = await findQuery(Content, {
          sortOrder: -1,
          sortKey: 'likes'
        });

        if (allContents.length === 0) {
          const error = {
            code: status.NOT_FOUND,
            message: 'No Content Found'
          };
          call.emit('Error', error);
          return;
        }

        allContents.forEach(content => {
          call.write(content);
        });
        call.end();
      } catch (error) {
        console.log(error);
        call.emit('Error', error);
      }
    },

    LikeContent: async (call, callback) => await updateLike(call, callback, 'Like'),

    UnLikeContent: async (call, callback) => await updateLike(call, callback, 'UnLike')
  };
};

type Action = 'Like' | 'UnLike';

const updateLike = async (
  call: ServerUnaryCall<LikeRequest__Output, LikeResponse>,
  callback: sendUnaryData<LikeResponse>,
  action: Action
): Promise<void> => {
  try {
    const { contentId: _id } = call.request;

    const record = await findOneQuery(Content, { _id });
    if (!isNotEmptyObject(record)) {
      const error = {
        code: status.NOT_FOUND,
        message: `The content with id ${_id} is not present`
      };
      callback(error, null);
      return;
    }

    const likes = action === 'Like' ? +record.likes + 1 : +record.likes - 1;

    const updatedRecord: Record<string, unknown> = await findOneAndUpdateQuery(
      Content,
      { _id },
      { likes },
      { new: true }
    );
    console.log(updatedRecord);
    callback(null, updatedRecord);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
};

// const SignUpSchema = Yup.object()
//   .strict(true)
//   .noUnknown()
//   .shape({
//     email: Yup.string().email('Invalid Email!').required('Required'),
//     password: Yup.string()
//       .min(10, 'Too Short!')
//       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, 'password is not valid')
//       .required('Required')
//   });
