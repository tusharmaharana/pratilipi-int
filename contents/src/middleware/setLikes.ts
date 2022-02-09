import { Request, Response } from 'express';
import { client } from '../../proto-client';

export const setLikes = () => {
  return (req: Request, res: Response) => {
    const { headers } = req;
    const { id: contentId } = req.params;
    client.SetLikes({ contentId, userId: headers?.userId as string }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    });
  };
};
