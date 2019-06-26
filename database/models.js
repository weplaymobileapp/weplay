const Sequelize = require('sequelize');
const sequelize = require('./index.js');

const Event = sequelize.define('events', {
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
    type: Sequelize.NUMBER,
    allowNull: false
  },
  minPlayers: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  currentPlayers: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  evenOnly: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  owner: { //FOREIGN KEY
    type: Sequelize.NUMBER,
    allowNull: false
  }
}, {
  // options
  timestamps: false
});

const Profile = sequelize.define('profiles', {
  // attributes
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
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
    type: Sequelize.NUMBER,
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
  events: {
    type: Sequelize.ARRAY,
  }
}, {
  // options
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

Sequelize.sync()

module.exports = {
  Sport,
  Profile,
  Event
}