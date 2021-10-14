const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const flash = require('connect-flash')
const morgan = require('morgan');
const auth0 = require('./auth/auth0');
require('dotenv').config();

const port = process.env.PORT;

// Requiring Routes
const indexRouter = require('./api/index/index.router')

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
app.use('/', indexRouter)

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${port}...`);
});
