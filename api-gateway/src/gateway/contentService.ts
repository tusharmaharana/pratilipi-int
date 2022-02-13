import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import { ProtoGrpcType } from '../proto-generated/client_content';

const PORT = 8080;
const PROTO_FILE = '../../proto/client_content.proto';

const packageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
export const clientContent = new grpcObj.client_content.CLientToContent(
  `0.0.0.0:${PORT}`,
  credentials.createInsecure()
);
