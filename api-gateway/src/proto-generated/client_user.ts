import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ClientToUserClient as _client_user_ClientToUserClient, ClientToUserDefinition as _client_user_ClientToUserDefinition } from './client_user/ClientToUser';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  client_user: {
    ClientToUser: SubtypeConstructor<typeof grpc.Client, _client_user_ClientToUserClient> & { service: _client_user_ClientToUserDefinition }
    SignUpRequest: MessageTypeDefinition
    SignUpResponse: MessageTypeDefinition
  }
}

