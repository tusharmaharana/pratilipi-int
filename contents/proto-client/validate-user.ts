import { UserValidationRequest } from '../proto/content_user_pb';
import { client } from './utils';

export default function validate_user(id: string) {
  return new Promise((resolve, reject) => {
    const request = new UserValidationRequest();
    request.setId(id);

    client.validateUser(request, (error, obj) => {
      if (error) reject(error);
      else resolve(obj);
    });
  });
}
