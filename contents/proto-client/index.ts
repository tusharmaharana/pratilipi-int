import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import { ProtoGrpcType } from '../proto/content_user';

const PORT = 4000;
const PROTO_FILE = '../proto/content_user.proto';

const packageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
export const client = new grpcObj.content_user.ContentToUser(`0.0.0.0:${PORT}`, credentials.createInsecure());

// const deadline = new Date();
// deadline.setSeconds(deadline.getSeconds() + 5);
/**
 * wait for the client to be ready
 * the callback will be called when the client is successfully connected to the server
 * if the attempt to connect to the server has unrecoverablly failed or if the deadline expires
 * the callback will be called with an error
 */
// client.waitForReady(deadline, err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   onClientReady();
// });

// const onClientReady = () => {
//   client.ValidateUser({ id: '620369595a5fa316f13aa576' }, (err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(result);
//   });
//   client.SetLikes({ userId: '620369595a5fa316f13aa576', contentId: '6200e7ab89c135165d632059' }, (err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(result);
//   });
// };
