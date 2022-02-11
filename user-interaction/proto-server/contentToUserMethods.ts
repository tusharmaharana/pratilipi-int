import { UsersHandlers } from '../proto/content_user/Users';
import { Like } from '../src/models/Like';
import { User } from '../src/models/User';
import { isNotEmptyObject } from '../src/utils/commonHelpers';
import { createDocumentQuery, findOneAndDeleteQuery, findOneQuery } from '../src/utils/generalQueries';

const contentToUserMethods = (): UsersHandlers => {
  return {
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
  };
};

export default contentToUserMethods;
