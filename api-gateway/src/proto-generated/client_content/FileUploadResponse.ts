// Original file: proto/client_content.proto

import type { Status as _client_content_Status } from '../client_content/Status';

export interface FileUploadResponse {
  'status'?: (_client_content_Status | keyof typeof _client_content_Status);
}

export interface FileUploadResponse__Output {
  'status'?: (_client_content_Status);
}
