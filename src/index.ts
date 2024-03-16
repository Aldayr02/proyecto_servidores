import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes';

require('dotenv').config();

const app = express();

let port = process.env.PORT || 4000;
const db_url = process.env.DB_URL;

app.use(express.json());
app.use(routes);

async function start() {
  try {
    await mongoose.connect(db_url);
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log('failed to connect to database ', e);
  }
}

start();
