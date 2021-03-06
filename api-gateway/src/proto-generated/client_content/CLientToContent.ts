// Original file: proto/client_content.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddContentRequest as _client_content_AddContentRequest, AddContentRequest__Output as _client_content_AddContentRequest__Output } from '../client_content/AddContentRequest';
import type { AddContentResponse as _client_content_AddContentResponse, AddContentResponse__Output as _client_content_AddContentResponse__Output } from '../client_content/AddContentResponse';
import type { LikeRequest as _client_content_LikeRequest, LikeRequest__Output as _client_content_LikeRequest__Output } from '../client_content/LikeRequest';
import type { LikeResponse as _client_content_LikeResponse, LikeResponse__Output as _client_content_LikeResponse__Output } from '../client_content/LikeResponse';
import type { TopContentRequest as _client_content_TopContentRequest, TopContentRequest__Output as _client_content_TopContentRequest__Output } from '../client_content/TopContentRequest';
import type { TopContentResponse as _client_content_TopContentResponse, TopContentResponse__Output as _client_content_TopContentResponse__Output } from '../client_content/TopContentResponse';

export interface CLientToContentClient extends grpc.Client {
  AddContent(argument: _client_content_AddContentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  AddContent(argument: _client_content_AddContentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  AddContent(argument: _client_content_AddContentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  AddContent(argument: _client_content_AddContentRequest, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  addContent(argument: _client_content_AddContentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  addContent(argument: _client_content_AddContentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  addContent(argument: _client_content_AddContentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  addContent(argument: _client_content_AddContentRequest, callback: grpc.requestCallback<_client_content_AddContentResponse__Output>): grpc.ClientUnaryCall;
  
  LikeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  LikeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  LikeContent(argument: _client_content_LikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  LikeContent(argument: _client_content_LikeRequest, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  likeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  likeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  likeContent(argument: _client_content_LikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  likeContent(argument: _client_content_LikeRequest, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  
  TopContents(argument: _client_content_TopContentRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_client_content_TopContentResponse__Output>;
  TopContents(argument: _client_content_TopContentRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_client_content_TopContentResponse__Output>;
  topContents(argument: _client_content_TopContentRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_client_content_TopContentResponse__Output>;
  topContents(argument: _client_content_TopContentRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_client_content_TopContentResponse__Output>;
  
  UnLikeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  UnLikeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  UnLikeContent(argument: _client_content_LikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  UnLikeContent(argument: _client_content_LikeRequest, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  unLikeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  unLikeContent(argument: _client_content_LikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  unLikeContent(argument: _client_content_LikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  unLikeContent(argument: _client_content_LikeRequest, callback: grpc.requestCallback<_client_content_LikeResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CLientToContentHandlers extends grpc.UntypedServiceImplementation {
  AddContent: grpc.handleUnaryCall<_client_content_AddContentRequest__Output, _client_content_AddContentResponse>;
  
  LikeContent: grpc.handleUnaryCall<_client_content_LikeRequest__Output, _client_content_LikeResponse>;
  
  TopContents: grpc.handleServerStreamingCall<_client_content_TopContentRequest__Output, _client_content_TopContentResponse>;
  
  UnLikeContent: grpc.handleUnaryCall<_client_content_LikeRequest__Output, _client_content_LikeResponse>;
  
}

export interface CLientToContentDefinition extends grpc.ServiceDefinition {
  AddContent: MethodDefinition<_client_content_AddContentRequest, _client_content_AddContentResponse, _client_content_AddContentRequest__Output, _client_content_AddContentResponse__Output>
  LikeContent: MethodDefinition<_client_content_LikeRequest, _client_content_LikeResponse, _client_content_LikeRequest__Output, _client_content_LikeResponse__Output>
  TopContents: MethodDefinition<_client_content_TopContentRequest, _client_content_TopContentResponse, _client_content_TopContentRequest__Output, _client_content_TopContentResponse__Output>
  UnLikeContent: MethodDefinition<_client_content_LikeRequest, _client_content_LikeResponse, _client_content_LikeRequest__Output, _client_content_LikeResponse__Output>
}
