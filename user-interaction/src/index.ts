import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import likeRoutes from './routes/likeRoutes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Mongoose Initialization
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3001, () => {
      console.log('Server is running at port 3001');
    });
  })
  .catch(err => console.log('Error while connecting to MongoDB', err));

app.use('/api/auth', authRoutes);
app.use('/api/likes', likeRoutes);
