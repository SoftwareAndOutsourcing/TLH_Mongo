import 'source-map-support/register';
const express = require('express');
import { MongoClient } from 'mongodb';
const ejs = require('ejs');
const methodOverride = require('method-override');
const flash = require('connect-flash')
const morgan = require('morgan');
const auth0 = require('./auth/auth0');
require('dotenv').config();
import { IndexRouter } from './api/index/index.router';

async function start() {
  const port = process.env.PORT;

  const app = express();

  // Auth0 Config
  auth0.config(app);

  app.use(morgan('short'));

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }))

  app.use(express.static(__dirname + '/../src/public'));

  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/../src/views');

  app.use(methodOverride("_method"));
  app.use(flash());

  // Using Routes ==========================================
  const client = new MongoClient(process.env.MONGODB_CONN as string);
  await client.connect();
  const db = client.db(process.env.DB_NAME);

  app.use('/', await new IndexRouter(db).getRouter());

  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${port}...`);
  });

  process.on('SIGINT', async () => {
    await client.close();
    console.log('Closed MongoDB connections.')
    process.exit();
  });  
}

start();
