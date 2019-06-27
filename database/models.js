const Sequelize = require('sequelize');
const sequelize = require('./index.js');


class Event extends Sequelize.Model {};
Event.init({
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sport: {
    type: Sequelize.STRING,
    allowNull: false
  },
  details: {
    type: Sequelize.STRING,
    allowNull: false
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false
  },
  day: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  maxPlayersEnabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  minPlayersEnabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  maxPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  minPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  currentPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  evenOnly: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  // owner: { //FOREIGN KEY
  //   type: Sequelize.STRING,
  //   allowNull: false
  // }
}, {
  // options
  sequelize,
  modelName: 'event',
  timestamps: false
});

//================================================================================================================================================//
class Profile extends Sequelize.Model {};
Profile.init({
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    //unique: true
  },
  facebookID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  heightFeet: {
    type: Sequelize.STRING,
    allowNull: true
  },
  heightInches: {
    type: Sequelize.STRING,
    allowNull: true
  },
  weight: {
    type: Sequelize.STRING,
    allowNull: true
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  favoriteSports1: {
    type: Sequelize.JSON,
    allowNull: true
  },
  favoriteSports2: {
    type: Sequelize.JSON,
    allowNull: true
  },
  favoriteSports3: {
    type: Sequelize.JSON,
    allowNull: true
  },
  events: { //a bunch of IDs to events
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
    defaultValue: []
  }
}, {
  // options
  sequelize,
  modelName: 'profile',
  timestamps: false
});

const Sport = sequelize.define('sports', {
  // attributes
  name: {
    type: Sequelize.JSON,
    allowNull: false
  }
}, {
  // options
});

Event.belongsTo(Profile, { as: 'owner', foreignKey: 'ownerID', constraints: false });
// Event.belongsToMany(Profile, { as: 'events' });
Profile.hasMany(Event, { as: 'inEvents', foreignKey: 'id', constraints: false })

sequelize.sync({ force: true });

module.exports = { Profile, Event, Sport }
