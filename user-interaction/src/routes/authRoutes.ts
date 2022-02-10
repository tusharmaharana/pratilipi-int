import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import * as Yup from 'yup';
import { User } from '../models/User';
import { omitWrapper } from '../utils/commonHelpers';
import { findOneQuery, saveQuery } from '../utils/generalQueries';

export const router = Router();
/**
 * Types
 */
type SignUpReq = Request<{}, null, User>;
type SignUpRes = Response<{ email?: string; userId?: Types.ObjectId } | Message>;
type Message = {
  message: string;
};
interface User {
  email: string;
  password: string;
}

/**
 * SignUp Handler
 */
router.post('/signUp', async (req: SignUpReq, res: SignUpRes): Promise<SignUpRes | void> => {
  try {
    await SignUpSchema.validate(req.body, { abortEarly: false });

    const { email } = req.body;
    const existingUser = await findOneQuery(User, { email });
    if (existingUser) return res.status(400).send({ email: 'Email already registered' });
    else {
      const user = new User(req.body);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      let userDoc = await saveQuery(user);
      userDoc = omitWrapper(userDoc, ['password', '__v']);

      //@ts-expect-error
      req.user = userDoc;
      //@ts-expect-error
      return res.status(200).send({ userId: userDoc._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something went wrong!' });
  }
});

/**
 * Validation Schema
 */
const SignUpSchema = Yup.object()
  .strict(true)
  .noUnknown()
  .shape({
    email: Yup.string().email('Invalid Email!').required('Required'),
    password: Yup.string()
      .min(10, 'Too Short!')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, 'password is not valid')
      .required('Required')
  });
