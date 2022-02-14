import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ContentToUserClient as _content_user_ContentToUserClient, ContentToUserDefinition as _content_user_ContentToUserDefinition } from './content_user/ContentToUser';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  content_user: {
    ContentToUser: SubtypeConstructor<typeof grpc.Client, _content_user_ContentToUserClient> & { service: _content_user_ContentToUserDefinition }
    Status: EnumTypeDefinition
    UpdateDBRequest: MessageTypeDefinition
    UpdateDBResponse: MessageTypeDefinition
    UpdateLikeRequest: MessageTypeDefinition
    UpdateLikeResponse: MessageTypeDefinition
    UserValidationRequest: MessageTypeDefinition
    UserValidationResponse: MessageTypeDefinition
  }
}

