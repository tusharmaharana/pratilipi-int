import Papa from 'papaparse';
import { FileServiceHandlers } from '../proto/client_content/FileService';
import { FileUploadRequest__Output } from '../proto/client_content/FileUploadRequest';
import { Status } from '../proto/client_content/Status';

export const fileServiceMethods = (): FileServiceHandlers => {
  return {
    Upload: async (call, callback) => {
      let arr = [] as unknown as Buffer[];
      let arr1: Buffer;
      call.on('data', (chunk: FileUploadRequest__Output) => {
        arr.push(chunk.chunkBuffer);
      });
      call.on('end', () => {
        arr1 = Buffer.concat(arr);
        const data = Papa.parse(arr1.toString(), {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true
        });
        console.log(data);
        callback(null, {
          status: Status.SUCCESS
        });
      });
    }
  };
};
