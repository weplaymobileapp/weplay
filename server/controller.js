const Sequelize = require('sequelize');
const models = require('../database/models.js');
const helper = require('../database/helpers.js');
const Op = Sequelize.Op

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
  profileUpdateOne: (req, res) => {
    const { name, phone, heightFeet, heightInches, weight, age, favoriteSports1, favoriteSports2, favoriteSports3, events, facebookID, id } = req.body;
    models.Profile.update({ name, phone, heightFeet, heightInches, weight, age, favoriteSports1, favoriteSports2, favoriteSports3, events }, { where: { facebookID } })
      .then(() => res.status(201).send('successful update'))
      .catch(err => res.status(404).send(err));
  },
  profileDeleteAll: (req, res) => {
    models.Profile.deleteMany({})
      .then(() => res.status(204).send('Deleted All'))
      .catch(err => res.status(404).send(err));
  },
  eventFindAll: (req, res) => {
    let { sport, zip, month, day, monthEnd, dayEnd } = req.query;
    if (monthEnd) {
      if (sport) {
        models.Event.findAll({
          where: {
            sport, zip, month: {
              [Op.between]: [month, monthEnd]
            }, day: {
              [Op.between]: [day, dayEnd]
            }
          },
          order: [
            ['month', 'ASC'],
            ['day', 'ASC']
          ]
        })
          .then(data => {
            res.status(200).send(data)
          })
      } else {
        models.Event.findAll({
          where: {
            zip, month: {
              [Op.between]: [month, monthEnd]
            }, day: {
              [Op.between]: [day, dayEnd]
            }
          },
          order: [
            ['month', 'ASC'],
            ['day', 'ASC']
          ]
        })
          .then(data => {
            res.status(200).send(data)
          })
      }
    } else {
      if (sport) {
        models.Event.findAll({
          where: { sport, zip, month, day },
          order: [
            ['month', 'ASC'],
            ['day', 'ASC']
          ]
        })
          .then(data => {
            res.status(200).send(data)
          })
      } else {
        models.Event.findAll({
          where: { zip, month, day },
          order: [
            ['month', 'ASC'],
            ['day', 'ASC']
          ]
        })
          .then(data => {
            res.status(200).send(data)
          })
      }
    }
  },
  findMembers: (req, res) => {
    let { id } = req.query;
    models.Profile.findOne({ where: { id } })
      .then(profile => {
        res.status(200).send(profile);
      })
  },
  eventPostOne: (req, res) => {
    let { name, sport, month, day, time, street,
      city, state, zip, maxPlayersEnabled, minPlayersEnabled,
      maxPlayers, minPlayers, evenOnly, details, members, owner } = req.body;

    let months = ['January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'];

    month = months.indexOf(month) + 1;

    if (day.length === 4) {
      day = day.slice(0, 2)
    }
    else {
      day = day.slice(0, 1)
    }

    models.Event.create({
      name, sport, month, day, time, street,
      city, state, zip, maxPlayersEnabled, minPlayersEnabled,
      maxPlayers, minPlayers, evenOnly, details, members, owner
    })
      .then(() => res.status(201).send('Success posting one event to database'))
      .catch(err => res.status(404).send(err));
  },
  eventPutOne: (req, res) => {
    let { eventID, profileID } = req.body;
    models.Event.findOne({ id: eventID })
      .then(item => {
        let { members, currentPlayers } = item;
        console.log(members);
        let updatedMembers = members;
        updatedMembers.push(profileID);
        console.log(updatedMembers);
        models.Event.update({ members: updatedMembers, currentPlayers: currentPlayers + 1 }, { where: { id: eventID } })
          .then(() => {
            res.status(200).send('updated')
          })
      })
  },
  eventDeleteAll: (req, res) => {
    models.Event.deleteMany({})
      .then(() => res.status(204).send('Deleted All'))
      .catch(err => res.status(404).send(err));
  },
  updateEvent: (req, res) => {
    let id = JSON.parse(req.query.id);
    let { events, members, currentPlayers } = req.body;
    if (events) {
      models.Profile.update({ events: events }, { where: { id: id } })
        .then((item) => {
          console.log(item)
          res.send(item.data + ' was found')
        })
        .catch(err => res.status(404).send(err))
    } else if (members) {
      models.Event.update({ members, currentPlayers }, { where: { id: id } })
        .then((item) => {
          console.log(item)
          res.send(item.data + ' was found')
        })
        .catch(err => res.status(404).send(err))
    }
  },
  eventGetOne: (req, res) => {
    let eventID = JSON.parse(req.query.eventID);
    models.Event.findOne({where: { id: eventID }})
    .then(item => {
      console.log('ONE ITEM: ', item.name)
      res.status(200).send(item);
    })
    .catch(err => res.status(400).send(err))
  }
}