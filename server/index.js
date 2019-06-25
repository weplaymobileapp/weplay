const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const passport = require('passport');
// const local = require('./auth_config');

// Creating server and port number
const app = express();
const port = 3000;

//use local passport configuration imported from ./auth_config
// passport.use(local);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router to handle all requests
app.use('/weplay', router);

//authenticate user
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   }
// );

// Verifies and sets port on where server is listening at
app.listen(port, () => console.log(`We Play Mobile listening on port ${port}!`));