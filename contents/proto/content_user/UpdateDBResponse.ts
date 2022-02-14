// Original file: proto/content_user.proto

import type { Status as _content_user_Status } from '../content_user/Status';

export interface UpdateDBResponse {
  'code'?: (_content_user_Status | keyof typeof _content_user_Status);
}

export interface UpdateDBResponse__Output {
  'code'?: (_content_user_Status);
}
