import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import { Content } from '../models/Content';
import { findOneQuery, findQuery, updateOneQuery } from '../utils/generalQueries';

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

router.get('/top', async (req: Request, res: TopContentRes): Promise<TopContentRes | void> => {
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
type ContentLikeRes = Response<Object | Message>;
interface Liked {
  action: 'like' | 'unlike';
}

/**
 * Update likes Handler
 */

router.post('/:id/likes', async (req: ContentLikeReq, res: ContentLikeRes): Promise<ContentLikeRes | void> => {
  try {
    const { id: _id } = req.params;
    const { action } = req.body;

    const record = await findOneQuery(Content, { _id });
    if (!record) res.status(404).send({ message: 'content not found' });

    if (action === 'like') {
      await updateOneQuery(Content, { _id }, { likes: +record.likes + 1 });
    } else {
      await updateOneQuery(Content, { _id }, { likes: +record.likes - 1 });
    }

    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Something went wrong' });
  }
});
