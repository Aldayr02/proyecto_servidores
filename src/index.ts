import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { swaggerConfig } from './../swagger.config';
import { googleAuth } from './middlewares/google_auth';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';

require('dotenv').config();

const app = express();

let port = process.env.PORT || 4000;
const db_url = process.env.DB_URL;

app.use('/assets', express.static(path.join(__dirname, '../public')));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
googleAuth(app);
app.use(routes);

const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/api-docs', serve, setup(swaggerDocs));

async function start() {
  try {
    await mongoose.connect(db_url);
    console.log('Connected to database');
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    const io = new Server(server);

    io.on('connection', (socket) => {
      console.log('A new user connected');
    });
  } catch (e) {
    console.log('failed to connect to database ', e);
  }
}

start();
