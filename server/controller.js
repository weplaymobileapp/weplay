const models = require('../database/models');
const helper = require('../database/helpers.js');

module.exports = {
  profileFindOrCreate: (req, res) => {
    models.Profile.findOrCreate({
      where: {
        facebookID: req.query.facebookID
      },
      defaults: {
        name: req.query.name
      }
    }) 
    .then((data) => res.status(200).send(data))
    .catch(err => res.status(404).send(err))
  },
  profilePostOne: (req, res) => {
    const { name, facebookID } = req.query;
    models.Profile.create({ name, facebookID }) 
      .then(() => res.status(201).send('successful post'))
      .catch(err => res.status(404).send(err));
  },
  profileDeleteAll: (req, res) => {
    models.Profile.deleteMany({}) 
      .then(() => res.status(204).send('Deleted All'))
      .catch(err => res.status(404).send(err));
  },
  eventFindAll: (req, res) => {
    let { sport, zip, month, day } = req.query;
    if(sport) {
      models.Event.findAll({where: { sport, zip, month, day}})
      .then(data => {
        res.status(200).send(data)
      })
    } else {
      models.Event.findAll({where: { zip, month, day}})
      .then(data => {
        res.status(200).send(data)
      })
    }
  },
  findMembers: (req, res) => {
    let { id } = req.query;
    models.Profile.findOne({where: { id }})
    .then(profile => {
      res.status(200).send(profile);
    })
  },
  eventPostOne: (req, res) => {
    let { name, sport, month, day, time, street, 
      city, state, zip, maxPlayersEnabled, minPlayersEnabled, 
      maxPlayers, minPlayers, evenOnly, details } = req.body;

    let months = ['January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'];

    month = months.indexOf(month) + 1;

    if (day.length === 4) {
      day = day.slice(0,2)
    }
    else {
      day = day.slice(0,1)
    }

    models.Event.create({name, sport, month, day, time, street, 
      city, state, zip, maxPlayersEnabled, minPlayersEnabled, 
      maxPlayers, minPlayers, evenOnly, details})
      .then( () => res.status(201).send('Success posting one event to database'))
      .catch(err => res.status(404).send(err));
  },
  eventDeleteAll: (req, res) => {
    models.Event.deleteMany({}) 
      .then(() => res.status(204).send('Deleted All'))
      .catch(err => res.status(404).send(err));
  },
}