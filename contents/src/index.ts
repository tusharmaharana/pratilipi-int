import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import Papa from 'papaparse';
import { router as contentRoutes } from './routes/contentRoutes';
const app = express();
const upload = multer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Mongoose Initialization
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server is running at port 5000');
    });
  })
  .catch(err => console.log('Error while connecting to MongoDB', err));

app.use('/api/content', contentRoutes);
app.post('/test', upload.single('File'), (req, res) => {
  console.log(req.file);
  // fs.readFile(req.file, 'utf-8', (err, data) => console.log(data));
  const data = Papa.parse(req.file.buffer.toString(), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  });

  res.send(data.data);
});
