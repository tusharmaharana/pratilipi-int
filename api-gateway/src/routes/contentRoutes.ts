import { Request, Response, Router } from 'express';
import { clientContent } from '../gateway/contentService';
import { Content__Output } from '../proto-generated/client_content/Content';

export const router = Router();

/**
 * Types
 */

type TopContentRes = Response<Content__Output[] | Message>;
type Message = {
  message: string;
};

/**
 * Top Contents Handler
 */

router.get('/top', async (req: Request, res: TopContentRes): Promise<TopContentRes | void> => {
  const topContents: Content__Output[] = [];
  try {
    const stream = clientContent.TopContents({});

    stream.on('data', chunk => {
      topContents.push(chunk.topContents);
    });

    stream.on('end', () => {
      if (topContents.length === 0) res.status(404).send({ message: 'No content is present' });
      res.status(200).send(topContents);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'something went wrong' });
  }
});

/**
 * Types
 */
// type ContentLikeReq = Request<{ id: Types.ObjectId }, null, Liked>;
// type ContentLikeRes = Response<Record<string, unknown> | Message>;
// interface Liked {
//   action: 'like' | 'unlike';
// }

/**
 * Update likes Handler
 */

// router.post(
//   '/:id/likes',
//   validateUser(),
//   //@ts-expect-error
//   async (req: ContentLikeReq, res: ContentLikeRes, next: NextFunction): Promise<ContentLikeRes | void> => {
//     try {
//       const { id: _id } = req.params;
//       const { action } = req.body;

//       const record = await findOneQuery(Content, { _id });
//       if (!record) res.status(404).send({ message: 'content not found' });

//       let updatedRecord: Record<string, unknown>;
//       if (action === 'like') {
//         updatedRecord = await findOneAndUpdateQuery(Content, { _id }, { likes: +record.likes + 1 }, { new: true });
//       } else {
//         updatedRecord = await findOneAndUpdateQuery(Content, { _id }, { likes: +record.likes - 1 }, { new: true });
//       }

//       res.status(200).send(updatedRecord);
//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({ message: 'Something went wrong' });
//     }
//   },
//   setLikes
// );
