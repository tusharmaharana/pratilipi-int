import Papa from 'papaparse';
import { client } from '../proto-client';
import { FileServiceHandlers } from '../proto/client_content/FileService';
import { FileUploadRequest__Output } from '../proto/client_content/FileUploadRequest';
import { Status } from '../proto/client_content/Status';
import { UpdateDBResponse__Output } from '../proto/content_user/UpdateDBResponse';
import { Content } from '../src/models/Content';
import { omitWrapper, pickWrapper, toLowerCase } from '../src/utils/commonHelpers';
import { createDocumentQuery } from '../src/utils/generalQueries';

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
        /**
         * File parsing
         */
        const result = Papa.parse(arr1.toString(), {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true
        });
        const res = toLowerCase(result.data);
        res.map(entry => {
          updateContentDB(entry);
          UpdateUserDB(entry);
        });
        callback(null, {
          status: Status.SUCCESS
        });
      });
    }
  };
};

const updateContentDB = async (obj: Record<string, TestContent>) => {
  const params = omitWrapper(obj, ['email', 'password']);
  try {
    await createDocumentQuery(Content, params);
  } catch (error) {
    console.log(error);
  }
};
const UpdateUserDB = (obj: Record<string, TestContent>): UpdateDBResponse__Output | void => {
  const { email, password } = pickWrapper(obj, ['email', 'password']);
  client.UpdateUserDB({ email: email as string, password: password as string }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    return result;
  });
};

interface TestContent {
  title: string;
  story: string;
  publishedDate: Date;
  userId: string;
  likes?: number;
}
