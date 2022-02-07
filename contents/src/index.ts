import express from 'express';
import mongoose from 'mongoose';
import { router as contentRoutes } from './routes/contentRoutes';
const app = express();

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
