import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import { ProtoGrpcType } from '../proto-generated/client_user';

const PORT = 9000;
const PROTO_FILE = '../../proto/client_user.proto';

const packageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
export const clientUser = new grpcObj.client_user.ClientToUser(`user_api:${PORT}`, credentials.createInsecure());
