import { loadPackageDefinition, sendUnaryData, ServerUnaryCall, status } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import { client } from '../proto-client';
import { ProtoGrpcType } from '../proto/client_content';
import { CLientToContentHandlers } from '../proto/client_content/CLientToContent';
import { LikeRequest__Output } from '../proto/client_content/LikeRequest';
import { LikeResponse } from '../proto/client_content/LikeResponse';
import { Content } from '../src/models/Content';
import { isNotEmptyObject, omitWrapper } from '../src/utils/commonHelpers';
import { createDocumentQuery, findOneAndUpdateQuery, findOneQuery, findQuery } from '../src/utils/generalQueries';

const PROTO_FILE = '../proto/client_content.proto';

const clientPackageDef = loadSync(path.resolve(__dirname, PROTO_FILE), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const clientGrpcObj = loadPackageDefinition(clientPackageDef) as unknown as ProtoGrpcType;
export const client_content = clientGrpcObj.client_content;

export const clientToContentMethods = (): CLientToContentHandlers => {
  return {
    AddContent: async (call, callback) => {
      const val = call.metadata.get('userid');
      client.ValidateUser({ id: val[0] as string }, async (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        if (result.code === 0) {
          try {
            const params = omitWrapper(call.request.params as unknown as Record<string, unknown>, ['_id']);
            console.log(params);
            const newPost = await createDocumentQuery(Content, params);
            callback(null, { newPost });
          } catch (error) {
            console.log(error);
            callback(error, null);
          }
        }
      });
    },

    TopContents: async call => {
      const val = call.metadata.get('userid');
      client.ValidateUser({ id: val[0] as string }, async (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        if (result.code === 0) {
          try {
            const topContents = await findQuery(Content, {
              sortOrder: -1,
              sortKey: 'likes'
            });

            if (topContents.length === 0) {
              call.end();
              return;
            }

            topContents.forEach(content => {
              call.write({ topContents: content });
            });
            call.end();
          } catch (error) {
            console.log(error);
            call.end();
          }
        }
      });
    },

    LikeContent: async (call, callback) => {
      const val = call.metadata.get('userid');
      client.ValidateUser({ id: val[0] as string }, async (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        if (result.code === 0) {
          client.SetLikes({ userId: val[0] as string, contentId: call.request.contentId }, async (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            if (result.code === 0) {
              try {
                await updateLike(call, callback, 'Like');
              } catch (err) {
                console.log(err);
              }
            }
          });
        }
      });
    },

    UnLikeContent: async (call, callback) => {
      const val = call.metadata.get('userid');
      client.ValidateUser({ id: val[0] as string }, async (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        if (result.code === 0) {
          client.SetLikes({ userId: val[0] as string, contentId: call.request.contentId }, async (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            if (result.code === 0) {
              try {
                await updateLike(call, callback, 'UnLike');
              } catch (err) {
                console.log(err);
              }
            }
          });
        }
      });
    }
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
    callback(null, { content: updatedRecord });
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
};
