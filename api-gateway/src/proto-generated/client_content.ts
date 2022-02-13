import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CLientToContentClient as _client_content_CLientToContentClient, CLientToContentDefinition as _client_content_CLientToContentDefinition } from './client_content/CLientToContent';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  client_content: {
    CLientToContent: SubtypeConstructor<typeof grpc.Client, _client_content_CLientToContentClient> & { service: _client_content_CLientToContentDefinition }
    Content: MessageTypeDefinition
    LikeRequest: MessageTypeDefinition
    LikeResponse: MessageTypeDefinition
    TopContentRequest: MessageTypeDefinition
    TopContentResponse: MessageTypeDefinition
  }
}

