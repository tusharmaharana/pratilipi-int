import { sendUnaryData, ServerUnaryCall, ServiceError, StatusObject } from '@grpc/grpc-js';
import { UsersHandlers } from '../proto/content_user/Users';
import { Like } from '../src/models/Like';
import { User } from '../src/models/User';
import { isNotEmptyObject } from '../src/utils/commonHelpers';
import { createDocumentQuery, findOneAndDeleteQuery, findOneQuery } from '../src/utils/generalQueries';

export class UsersServer implements IUsersServer {
  async validateUser(call: ServerUnaryCall<UserValidationRequest, null>, callback: sendUnaryData<Empty>) {
    const userId = call.request.getId();

    const existingUser = await findOneQuery(User, { _id: userId });

    if (!isNotEmptyObject(existingUser)) {
      const error: ServiceError = {
        code: 400,
        details: 'User not Authorized',
        metadata: null,
        name: 'Unauthorized',
        message: `User with ID ${userId} does not exist.`
      };
      callback(error, null);
      return;
    }
    const res: StatusObject = {
      code: 200,
      details: 'User is Authorized',
      metadata: null
    };
    callback(null, res);
  }

  async setLikes(call: ServerUnaryCall<UpdateLikeRequest, null>, callback: sendUnaryData<null | StatusObject>) {
    const userId = call.request.getUserid();
    const contentId = call.request.getContentid();

    const params = { contentId, userId };
    let record;
    try {
      record = record ? await findOneAndDeleteQuery(Like, params) : await createDocumentQuery(Like, params);

      const res: StatusObject = {
        code: 200,
        details: 'Update Like Successful',
        metadata: null
      };
      callback(null, res);
    } catch (err) {
      const error: ServiceError = {
        code: 500,
        details: 'Internal Server Error',
        metadata: null,
        name: 'Server Error',
        message: `Something went wrong`
      };
      callback(error, null);
      return;
    }
  }
}

export class UserComServers implements UsersHandlers {
  ValidateUser: (req, res) => {
    console.log(req.request.id)
  },
  SetLikes: (req, res) => {}
}
