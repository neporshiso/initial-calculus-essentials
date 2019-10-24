const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

require('dotenv').config();

const indexController = require('./routes/index-controller'),
    usersController = require('./routes/users-controller'),
    testController = require('./routes/test-controller');

const app = express();

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//     // store: new FileStore(),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     is_logged_in: false
// }))

app.use('/', indexController);
app.use('/users', usersController);
app.use('/test', testController);

module.exports = app;
