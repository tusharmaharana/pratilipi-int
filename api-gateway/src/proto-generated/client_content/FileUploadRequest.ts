// Original file: proto/client_content.proto


export interface FileUploadRequest {
  'chunkBuffer'?: (Buffer | Uint8Array | string);
}

export interface FileUploadRequest__Output {
  'chunkBuffer'?: (Buffer);
}
