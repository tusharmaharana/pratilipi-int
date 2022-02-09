import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { UsersClient as _content_user_UsersClient, UsersDefinition as _content_user_UsersDefinition } from './content_user/Users';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  content_user: {
    Status: EnumTypeDefinition
    UpdateLikeRequest: MessageTypeDefinition
    UpdateLikeResponse: MessageTypeDefinition
    UserValidationRequest: MessageTypeDefinition
    UserValidationResponse: MessageTypeDefinition
    Users: SubtypeConstructor<typeof grpc.Client, _content_user_UsersClient> & { service: _content_user_UsersDefinition }
  }
}

