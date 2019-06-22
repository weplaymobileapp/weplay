const express = require('express');
const morgan = require('morgan');
const router = require('./router');

// Creating server and port number
const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router to handle all requests
app.use('/weplay', router);

// Verifies and sets port on where server is listening at
app.listen(port, () => console.log(`Example app listening on port ${port}!`));