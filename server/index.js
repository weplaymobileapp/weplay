const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const passport = require('passport');
const auth = require('./auth_config');

// Creating server and port number
const app = express();
const port = 3000;

//use google auth configuration
auth(passport);
app.use(passport.initialize());

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router to handle all requests
app.use('/weplay', router);

//authentication routes
app.get('/', (req, res) => {
  res.json({
      status: 'session cookie not set'
  });
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/')
  }
);

// Verifies and sets port on where server is listening at
app.listen(port, () => console.log(`We Play Mobile listening on port ${port}!`));