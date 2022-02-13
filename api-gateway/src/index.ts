import express from 'express';
import multer from 'multer';
import { contentRoutes, userRoutes } from './routes';
const app = express();
const upload = multer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/content', contentRoutes);
app.use('/api/user', userRoutes);
app.post('api/content/test', upload.single('File'), (req, res) => {
  console.log(req.file);
  // fs.readFile(req.file, 'utf-8', (err, data) => console.log(data));
  //   const data = Papa.parse(req.file.buffer.toString(), {
  //     header: true,
  //     skipEmptyLines: true,
  //     dynamicTyping: true
  //   });

  //   res.send(data.data);
  res.send(req.file);
});

app.listen(5000, () => console.log('Server is running at port 5000'));
