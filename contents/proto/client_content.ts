import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { CLientToContentClient as _client_content_CLientToContentClient, CLientToContentDefinition as _client_content_CLientToContentDefinition } from './client_content/CLientToContent';
import type { FileServiceClient as _client_content_FileServiceClient, FileServiceDefinition as _client_content_FileServiceDefinition } from './client_content/FileService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  client_content: {
    CLientToContent: SubtypeConstructor<typeof grpc.Client, _client_content_CLientToContentClient> & { service: _client_content_CLientToContentDefinition }
    Content: MessageTypeDefinition
    FileService: SubtypeConstructor<typeof grpc.Client, _client_content_FileServiceClient> & { service: _client_content_FileServiceDefinition }
    FileUploadRequest: MessageTypeDefinition
    FileUploadResponse: MessageTypeDefinition
    LikeRequest: MessageTypeDefinition
    LikeResponse: MessageTypeDefinition
    Status: EnumTypeDefinition
    TopContentRequest: MessageTypeDefinition
    TopContentResponse: MessageTypeDefinition
  }
}

