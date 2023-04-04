// File: app.js
require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const signUpController = require('./models/signUpModel');
const User = require('./models/userModel');
const db = require('./config/database');
const createDB = require('./config/createDataBase');
const session = require('express-session');

const app = express();
const server = http.createServer(app);

// https://github.com/users/linnnux/projects/23?pane=issue&itemId=24756533
const traceUtils = require('./utils/trace-utils.js');

function myDebug(msg)
{
  const debugInfo = traceUtils.getFileInfoFromStackTrace();
  console.log(`fileName : ${debugInfo.fileName}, Ligne : ${debugInfo.lineNumber} : ${msg} `);
}


app.use(session({
    secret: process.env.SESSION_SECRET, // a secret key used to sign the session ID cookie
    resave: false, // forces the session to be saved even when unmodified
    saveUninitialized: false // forces a session that is "uninitialized" to be saved to the store
}));


app.use(bodyParser.urlencoded({
   extended: false
}));


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  if (!req.session.user)
  {
    myDebug('pas de session. redirectto user/signup');
    res.redirect('/user/signup');
  }
  else
  {
    myDebug('session found'+req.session.user.username);
    res.redirect('/user/dashboard');

  }
});

app.set('view engine', 'ejs');
app.use('/user/',userRoutes);


server.listen(process.env.PORT, () => {
    console.log(`Server running on port : http://localhost:${process.env.PORT}`);
});
