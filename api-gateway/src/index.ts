import express from 'express';
import multer from 'multer';
import { fileServiceStub } from './gateway/contentService';
import { authRoutes, contentRoutes } from './routes';
const app = express();
const upload = multer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/user/auth', authRoutes);
app.post('/api/test', upload.single('File'), (req, res) => {
  const fileBuffer = req.file?.buffer;
  console.log(req.file?.buffer);
  const length = fileBuffer?.length;
  if (length) {
    const stream = fileServiceStub.Upload((err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(response);
    });

    const view = new Uint8Array(fileBuffer);
    let buf: Buffer;

    //will only stream 4Kb per request to the server
    for (let i = 0; i < view.length; i += 4096) {
      if (i + 4096 < view.length) buf = fileBuffer?.slice(i, i + 4096);
      else buf = fileBuffer?.slice(i);
      stream.write({ chunkBuffer: buf });
    }

    stream.end();
  }

  res.status(200).send();
});
app.use('/api/content', contentRoutes);

app.listen(5000, () => console.log('Server is running at port 5000'));
