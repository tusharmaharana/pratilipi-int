import { Metadata } from '@grpc/grpc-js';
import { Request, Response, Router } from 'express';
import { clientContent } from '../gateway/contentService';
import { Content__Output } from '../proto-generated/client_content/Content';
import { LikeRequest } from '../proto-generated/client_content/LikeRequest';

export const router = Router();

//@ts-ignore
const setMetadata = (req): Metadata => {
  const { headers } = req;
  const metadata = new Metadata();
  metadata.add('userid', headers?.userid);
  return metadata;
};

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
  const metadata = setMetadata(req);

  const topContents: Content__Output[] = [];

  try {
    const stream = clientContent.TopContents({}, metadata);

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
type ContentLikeReq = Request<{ id: LikeRequest }, null, Liked>;
type ContentLikeRes = Response<Content__Output | Message>;
interface Liked {
  action: 'like' | 'unlike';
}

/**
 * Update likes Handler
 */

router.get('/:id/like', async (req: ContentLikeReq, res: ContentLikeRes): Promise<ContentLikeRes | void> => {
  const metadata = setMetadata(req);
  const { id } = req.params;
  try {
    clientContent.LikeContent({ contentId: id as unknown as string }, metadata, (err, result) => {
      if (err) {
        console.log('api-gateway', err);
        return;
      }
      console.log(result);
      res.status(200).send(result?.content);
    });
    // res.status(500).send({ message: 'Internal Service Error' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Something went wrong' });
  }
});

router.get('/:id/unlike', async (req: ContentLikeReq, res: ContentLikeRes): Promise<ContentLikeRes | void> => {
  const metadata = setMetadata(req);
  const { id } = req.params;
  try {
    clientContent.UnLikeContent({ contentId: id as unknown as string }, metadata, (err, result) => {
      if (err) {
        console.log('api-gateway', err);
        return;
      }
      console.log(result);
      res.status(200).send(result?.content);
    });
    // res.status(500).send({ message: 'Internal Service Error' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Something went wrong' });
  }
});
