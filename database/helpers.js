const { Profile, Event, Sports } = require('./models.js');

module.exports = {
  createEvent: (object, callback) => {
    Event.create(object);
    callback();

  },
  createAccount: (object, callback) => {
    Profile.create(object);
    callback()
  },
  findEvents: (sport, zip, month, day, callback) => {
    Event.findAll({where: { sport, zip, month, day }})
    .then((items) => {
      callback(items);
    })
  }
}