const { Profile, Event, Sports } = require('./models.js');

module.exports = {
  createEvent: (object) => {
    Event.create({
      name: "Snoopy's Laser Tag Event",
      sport: "Laser Tag",
      details: "Nisi quas ullam rerum at in delectus ea. Est enim voluptas molestias veniam velit facere. Ea illum qui. Est perferendis quia.",
      month: "August",
      day: "27th",
      time: "5:15",
      street: "swag rd",
      state: "California",
      city: "Santa Monica",
      zip: "91781",
      maxPlayers: 6,
      minPlayers: 2,
      maxPlayersEnabled: true,
      minPlayersEnabled: true,
      currentPlayers: 2,
      evenOnly: false,
      ownerID: 1
    })
  },
  createAccount: () => {
    Profile.create({
      name: 'Matt',
      password: "password",
      email: "matt@gmail.com",
      phone: "1234567",
      heightFeet: "2",
      heightInches: "1",
      weight: "50",
      age: 3,
      favoriteSports1: "Ping Pong",
      favoriteSports2: "Laser Tag",
      favoriteSports3: "Basketball",
      events: [1]
    })
  }
}