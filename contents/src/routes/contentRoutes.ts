import { NextFunction, Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import { setLikes } from '../middleware/setLikes';
import { validateUser } from '../middleware/validateUser';
import { Content } from '../models/Content';
import { findOneAndUpdateQuery, findOneQuery, findQuery } from '../utils/generalQueries';

export const router = Router();

/**
 * Types
 */

type TopContentRes = Response<Object | Message>;
type Message = {
  message: string;
};

/**
 * Top Contents Handler
 */

router.get('/top', validateUser(), async (req: Request, res: TopContentRes): Promise<TopContentRes | void> => {
  try {
    const allContents = await findQuery(Content, {
      sortOrder: -1,
      sortKey: 'likes'
    });

    res.status(200).send(allContents);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'something went wrong' });
  }
});

/**
 * Types
 */
type ContentLikeReq = Request<{ id: Types.ObjectId }, null, Liked>;
type ContentLikeRes = Response<Record<string, unknown> | Message>;
interface Liked {
  action: 'like' | 'unlike';
}

/**
 * Update likes Handler
 */

router.post(
  '/:id/likes',
  validateUser(),
  //@ts-expect-error
  async (req: ContentLikeReq, res: ContentLikeRes, next: NextFunction): Promise<ContentLikeRes | void> => {
    try {
      const { id: _id } = req.params;
      const { action } = req.body;

      const record = await findOneQuery(Content, { _id });
      if (!record) res.status(404).send({ message: 'content not found' });

      let updatedRecord: Record<string, unknown>;
      if (action === 'like') {
        updatedRecord = await findOneAndUpdateQuery(Content, { _id }, { likes: +record.likes + 1 }, { new: true });
      } else {
        updatedRecord = await findOneAndUpdateQuery(Content, { _id }, { likes: +record.likes - 1 }, { new: true });
      }

      res.status(200).send(updatedRecord);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Something went wrong' });
    }
  },
  setLikes
);
