import { client } from './utils';

export default function set_likes(contentId: string, userId: string) {
  return new Promise((resolve, reject) => {
    const request = new UpdateLikeRequest();
    request.setContentid(contentId);
    request.setUserid(userId);

    client.setLikes(request, (error, obj) => {
      if (error) reject(error);
      else resolve(obj);
    });
  });
}
