import { model, Schema } from 'mongoose';

export const Like = model(
  'likes',
  new Schema({
    contentId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  })
);