const mongoose = require('mongoose');

// need to insert mongoDB Atlas URL here
let DB_URL = 'INSERT URL HERE'

// Connecting our storage db to our application
const db = mongoose.connect(DB_URL, {useNewUrlParser: true});

module.exports = db;