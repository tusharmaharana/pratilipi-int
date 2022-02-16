import { Request, Response, Router } from 'express';
import { clientUser } from '../gateway/userInteractionService';
import { SignUpRequest } from '../proto-generated/client_user/SignUpRequest';
import { SignUpResponse__Output } from '../proto-generated/client_user/SignUpResponse';

export const router = Router();
/**
 * Types
 */
type SignUpReq = Request<{}, null, SignUpRequest>;
type SignUpRes = Response<SignUpResponse__Output | Message>;
type Message = {
  message: string;
};

/**
 * SignUp Handler
 */
router.post('/signUp', async (req: SignUpReq, res: SignUpRes): Promise<SignUpRes | void> => {
  try {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 5);
    clientUser.waitForReady(deadline, err => {
      if (err) {
        console.error(err);
        return;
      }
      clientUser.SignUp({ email: req.body.email, password: req.body.password }, (err, result) => {
        if (err) {
          res.status(400).send({ message: `${err.details}` });
          return;
        }
        console.log(result);
        res.status(200).send(result);
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong!' });
  }
});
