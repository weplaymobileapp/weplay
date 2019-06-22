const models = require('../database/models');

module.exports = {
  profileFindAll: (req, res) => {
    models.Profile.find({}) 
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  profilePostOne: (req, res) => {
    const { test } = req.body;
    models.Profile.create({test }) 
      .then(data => res.status(201).send(data))
      .catch(err => res.status(404).send(err));
  },
  profileDeleteAll: (req, res) => {
    models.Profile.deleteMany({}) 
      .then(() => res.status(204).send('Deleted All'))
      .catch(err => res.status(404).send(err));
  },

}