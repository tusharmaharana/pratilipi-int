// Original file: proto/content_user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { UpdateLikeRequest as _content_user_UpdateLikeRequest, UpdateLikeRequest__Output as _content_user_UpdateLikeRequest__Output } from '../content_user/UpdateLikeRequest';
import type { UpdateLikeResponse as _content_user_UpdateLikeResponse, UpdateLikeResponse__Output as _content_user_UpdateLikeResponse__Output } from '../content_user/UpdateLikeResponse';
import type { UserValidationRequest as _content_user_UserValidationRequest, UserValidationRequest__Output as _content_user_UserValidationRequest__Output } from '../content_user/UserValidationRequest';
import type { UserValidationResponse as _content_user_UserValidationResponse, UserValidationResponse__Output as _content_user_UserValidationResponse__Output } from '../content_user/UserValidationResponse';

export interface UsersClient extends grpc.Client {
  SetLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  SetLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  SetLikes(argument: _content_user_UpdateLikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  SetLikes(argument: _content_user_UpdateLikeRequest, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateUser(argument: _content_user_UserValidationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateUser(argument: _content_user_UserValidationRequest, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UsersHandlers extends grpc.UntypedServiceImplementation {
  SetLikes: grpc.handleUnaryCall<_content_user_UpdateLikeRequest__Output, _content_user_UpdateLikeResponse>;
  
  ValidateUser: grpc.handleUnaryCall<_content_user_UserValidationRequest__Output, _content_user_UserValidationResponse>;
  
}

export interface UsersDefinition extends grpc.ServiceDefinition {
  SetLikes: MethodDefinition<_content_user_UpdateLikeRequest, _content_user_UpdateLikeResponse, _content_user_UpdateLikeRequest__Output, _content_user_UpdateLikeResponse__Output>
  ValidateUser: MethodDefinition<_content_user_UserValidationRequest, _content_user_UserValidationResponse, _content_user_UserValidationRequest__Output, _content_user_UserValidationResponse__Output>
}
