// Original file: proto/content_user.proto

import type { Status as _content_user_Status } from '../content_user/Status';

export interface UserValidationResponse {
  'code'?: (_content_user_Status | keyof typeof _content_user_Status);
}

export interface UserValidationResponse__Output {
  'code'?: (_content_user_Status);
}
