import { model, Schema } from 'mongoose';

export const Content = model(
  'contents',
  new Schema({
    title: {
      type: String,
      trim: true,
      required: true
    },
    story: {
      type: String,
      trim: true,
      required: true
    },
    publishingDate: {
      type: Date,
      required: true
    },
    likes: { type: Number, default: 0 },
    userId: {
      type: String,
      required: true
    }
  })
);
