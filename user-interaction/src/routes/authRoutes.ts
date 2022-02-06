import { Request, Response, Router } from 'express';

const router = Router();

/**
 * Types
 */
type SignUpReq = Request<{}, null, Pick<User, 'email' | 'password'>>;
type SignUpRes = Response<{ email: string } | Message>;
type Message = {
  message: string;
};
interface User {
  email: string;
  password: string;
}

router.post('/signUp', async (req: SignUpReq, res: SignUpRes): Promise<SignUpRes | void> => {});

export default router;
