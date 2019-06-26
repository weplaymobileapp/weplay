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
  owner: { //FOREIGN KEY
    type: Sequelize.STRING,
    allowNull: false
  },
  members: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
    defaultValue: []
  }
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
    allowNull: false
  },
  facebookID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  heightFeet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  heightInches: {
    type: Sequelize.STRING,
    allowNull: false
  },
  weight: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  favoriteSports1: {
    type: Sequelize.JSON,
    allowNull: false
  },
  favoriteSports2: {
    type: Sequelize.JSON,
    allowNull: false
  },
  favoriteSports3: {
    type: Sequelize.JSON,
    allowNull: false
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

const Sports = sequelize.define('sports', {
  // attributes
  name: {
    type: Sequelize.JSON,
    allowNull: false
  }
}, {
  // options
});

Event.belongsTo(Profile, { as: 'Owner', sourceKey:'owner', foreignKey: 'id', constraints: false });
Profile.hasMany(Event, {as: 'Events', sourceKey: 'events', foreignKey: 'id', constraints: false})
//, { as: 'events', foreignKey: 'id', constraints: false }
Event.hasMany(Profile, {as: 'Members', sourceKey: 'members', foreignKey: 'id', constraints: false})
//, { as: 'members', foreignKey: 'id', constraints: false }

sequelize.sync({ force: true });

module.exports = { Profile, Event, Sports }