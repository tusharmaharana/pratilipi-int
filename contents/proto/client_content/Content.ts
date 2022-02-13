// Original file: proto/client_content.proto

import type { Long } from '@grpc/proto-loader';

export interface Content {
  '_id'?: (string);
  'title'?: (string);
  'story'?: (string);
  'likes'?: (number | string | Long);
  'publishedDate'?: (string);
}

export interface Content__Output {
  '_id'?: (string);
  'title'?: (string);
  'story'?: (string);
  'likes'?: (Long);
  'publishedDate'?: (string);
}
