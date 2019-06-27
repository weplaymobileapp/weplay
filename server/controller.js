const models = require('../database/models');
const helper = require('../database/helpers.js');

module.exports = {
  profileFindAll: (req, res) => {
    models.Profile.find({}) 
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  profilePostOne: (req, res) => {
    const { name } = req.body;
    models.Profile.create({ name }) 
      .then(data => res.status(201).send(data))
      .catch(err => res.status(404).send(err));
  },
  profileDeleteAll: (req, res) => {
    models.Profile.deleteMany({}) 
      .then(() => res.status(204).send('Deleted All'))
      .catch(err => res.status(404).send(err));
  },
  eventFindAll: (req, res) => {
    let { sport, zip, month, day} = req.query;
    console.log(req.params)
    helper.findEvents(sport, zip, month, day, (data) => {
      res.status(200).send(data);
    })
    // models.Event.find({}) 
    //   .then(data => res.status(200).send(data))
    //   .catch(err => res.status(404).send(err));
  },
  eventPostOne: (req, res) => {
    const { name } = req.body;
    models.Event.create({ name }) 
      .then(data => res.status(201).send(data))
      .catch(err => res.status(404).send(err));
  },
  eventDeleteAll: (req, res) => {
    models.Event.deleteMany({}) 
      .then(() => res.status(204).send('Deleted All'))
      .catch(err => res.status(404).send(err));
  },
}