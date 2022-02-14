// Original file: proto/content_user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { UpdateDBRequest as _content_user_UpdateDBRequest, UpdateDBRequest__Output as _content_user_UpdateDBRequest__Output } from '../content_user/UpdateDBRequest';
import type { UpdateDBResponse as _content_user_UpdateDBResponse, UpdateDBResponse__Output as _content_user_UpdateDBResponse__Output } from '../content_user/UpdateDBResponse';
import type { UpdateLikeRequest as _content_user_UpdateLikeRequest, UpdateLikeRequest__Output as _content_user_UpdateLikeRequest__Output } from '../content_user/UpdateLikeRequest';
import type { UpdateLikeResponse as _content_user_UpdateLikeResponse, UpdateLikeResponse__Output as _content_user_UpdateLikeResponse__Output } from '../content_user/UpdateLikeResponse';
import type { UserValidationRequest as _content_user_UserValidationRequest, UserValidationRequest__Output as _content_user_UserValidationRequest__Output } from '../content_user/UserValidationRequest';
import type { UserValidationResponse as _content_user_UserValidationResponse, UserValidationResponse__Output as _content_user_UserValidationResponse__Output } from '../content_user/UserValidationResponse';

export interface ContentToUserClient extends grpc.Client {
  SetLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  SetLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  SetLikes(argument: _content_user_UpdateLikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  SetLikes(argument: _content_user_UpdateLikeRequest, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  setLikes(argument: _content_user_UpdateLikeRequest, callback: grpc.requestCallback<_content_user_UpdateLikeResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateUserDB(argument: _content_user_UpdateDBRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  UpdateUserDB(argument: _content_user_UpdateDBRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  UpdateUserDB(argument: _content_user_UpdateDBRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  UpdateUserDB(argument: _content_user_UpdateDBRequest, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  updateUserDb(argument: _content_user_UpdateDBRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  updateUserDb(argument: _content_user_UpdateDBRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  updateUserDb(argument: _content_user_UpdateDBRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  updateUserDb(argument: _content_user_UpdateDBRequest, callback: grpc.requestCallback<_content_user_UpdateDBResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateUser(argument: _content_user_UserValidationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateUser(argument: _content_user_UserValidationRequest, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  validateUser(argument: _content_user_UserValidationRequest, callback: grpc.requestCallback<_content_user_UserValidationResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ContentToUserHandlers extends grpc.UntypedServiceImplementation {
  SetLikes: grpc.handleUnaryCall<_content_user_UpdateLikeRequest__Output, _content_user_UpdateLikeResponse>;
  
  UpdateUserDB: grpc.handleUnaryCall<_content_user_UpdateDBRequest__Output, _content_user_UpdateDBResponse>;
  
  ValidateUser: grpc.handleUnaryCall<_content_user_UserValidationRequest__Output, _content_user_UserValidationResponse>;
  
}

export interface ContentToUserDefinition extends grpc.ServiceDefinition {
  SetLikes: MethodDefinition<_content_user_UpdateLikeRequest, _content_user_UpdateLikeResponse, _content_user_UpdateLikeRequest__Output, _content_user_UpdateLikeResponse__Output>
  UpdateUserDB: MethodDefinition<_content_user_UpdateDBRequest, _content_user_UpdateDBResponse, _content_user_UpdateDBRequest__Output, _content_user_UpdateDBResponse__Output>
  ValidateUser: MethodDefinition<_content_user_UserValidationRequest, _content_user_UserValidationResponse, _content_user_UserValidationRequest__Output, _content_user_UserValidationResponse__Output>
}
