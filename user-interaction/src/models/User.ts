import { model, Schema } from 'mongoose';

export const User = model(
  'users',
  new Schema({
    email: { type: String, minlength: 5, required: true },
    password: {
      type: String,
      minlength: 10,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      required: true
    }
  })
);
