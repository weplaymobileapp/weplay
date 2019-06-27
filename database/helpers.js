const { Profile, Event, Sports } = require('./models.js');

module.exports = {
  createEvent: (object, callback) => {
    Event.create(object);
    callback();

  },
  createAccount: (object, callback) => {
    Profile.create(object);
    callback()
  }
}