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