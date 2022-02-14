// Original file: proto/client_content.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { FileUploadRequest as _client_content_FileUploadRequest, FileUploadRequest__Output as _client_content_FileUploadRequest__Output } from '../client_content/FileUploadRequest';
import type { FileUploadResponse as _client_content_FileUploadResponse, FileUploadResponse__Output as _client_content_FileUploadResponse__Output } from '../client_content/FileUploadResponse';

export interface FileServiceClient extends grpc.Client {
  Upload(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  Upload(metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  Upload(options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  Upload(callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  upload(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  upload(metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  upload(options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  upload(callback: grpc.requestCallback<_client_content_FileUploadResponse__Output>): grpc.ClientWritableStream<_client_content_FileUploadRequest>;
  
}

export interface FileServiceHandlers extends grpc.UntypedServiceImplementation {
  Upload: grpc.handleClientStreamingCall<_client_content_FileUploadRequest__Output, _client_content_FileUploadResponse>;
  
}

export interface FileServiceDefinition extends grpc.ServiceDefinition {
  Upload: MethodDefinition<_client_content_FileUploadRequest, _client_content_FileUploadResponse, _client_content_FileUploadRequest__Output, _client_content_FileUploadResponse__Output>
}
