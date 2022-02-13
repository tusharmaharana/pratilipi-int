// Original file: proto/client_user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SignUpRequest as _client_user_SignUpRequest, SignUpRequest__Output as _client_user_SignUpRequest__Output } from '../client_user/SignUpRequest';
import type { SignUpResponse as _client_user_SignUpResponse, SignUpResponse__Output as _client_user_SignUpResponse__Output } from '../client_user/SignUpResponse';

export interface ClientToUserClient extends grpc.Client {
  SignUp(argument: _client_user_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _client_user_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _client_user_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _client_user_SignUpRequest, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _client_user_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _client_user_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _client_user_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _client_user_SignUpRequest, callback: grpc.requestCallback<_client_user_SignUpResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ClientToUserHandlers extends grpc.UntypedServiceImplementation {
  SignUp: grpc.handleUnaryCall<_client_user_SignUpRequest__Output, _client_user_SignUpResponse>;
  
}

export interface ClientToUserDefinition extends grpc.ServiceDefinition {
  SignUp: MethodDefinition<_client_user_SignUpRequest, _client_user_SignUpResponse, _client_user_SignUpRequest__Output, _client_user_SignUpResponse__Output>
}
