const fs = require('fs');
const write = fs.createWriteStream('./profiles.json');
const faker = require('faker');
const helper = require('../database/helpers.js')

const sports = ['Basketball', 'Football', 'Baseball', 'Soccer', 'Hockey', 'Tennis', 'Water Polo', 'Volleyball', 'Ultimate Frisbee', 'Softball',
 'Dodgeball', 'Lacrosse', 'Ping Pong', 'Pickle Ball', 'Hacky Sack', 'Laser Tag', 'Golf', 'Mini Golf', 'Rugby', 'Badminton']
const names = ["Angela", "Calvin", "Dustin", "Gaby", "James'", "Wendy", "Ufuk", "Ramin", "Kathleen", "Jeff",
  "Wayne", "Mark", "Matt", "Matthew", "Victor", "Morgan", "Adam", "Anthony", "Uttej", "Nate",
  "Charlie", "Albert", "Tracy", "Liezel", "Jesse", "Daniel", "Fred", "Tommy", "Brian", "Paul", "Snoopy",
  "Viv", "Semira", "Eva", "Eti", "Billy"];
const numberEnds = ['00 AM', '15 AM', '30 AM', '45 AM','00 PM', '15 PM', '30 PM', '45 PM'];
const booleans = [true, false];
let zips = ['12345', '23456', '34567', '45678', '56789', '67890']

let createdIDs = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const makeOneProfileWithSomeEvents = () => {
  let id = getRandomInt(0,100000);
  createdIDs.push(id);
  let name = names[getRandomInt(0, names.length - 1)];
  let facebookID = JSON.stringify(getRandomInt(0,10000));
  let username = name + JSON.stringify(getRandomInt(0,1000));
  let password = 'password';
  let phone = '1234567890';
  let heightFeet = JSON.stringify(getRandomInt(4,6));
  let heightInches = JSON.stringify(getRandomInt(0,11));
  let weight = JSON.stringify(getRandomInt(100,250)) + 'lbs';
  let age = getRandomInt(16,30);
  let favoriteSports1 = { value: sports[getRandomInt(0, sports.length - 1)]}
  let favoriteSports2 = { value: sports[getRandomInt(0, sports.length - 1)]}
  let favoriteSports3 = { value: sports[getRandomInt(0, sports.length - 1)]}
  let account = { id, facebookID, name, username, password, phone, heightFeet, heightInches, weight, age, favoriteSports1, favoriteSports2, favoriteSports3, events: [] };
  helper.createAccount(account, () => {
    for(var i = 0; i < getRandomInt(2,4); i++) {
      createEvent(id);
    }
  });

}

const createEvent = (id) => {
  let justName = names[getRandomInt(0, names.length - 1)];
  let sport = sports[getRandomInt(0, sports.length - 1)];
  let name = justName + "'s " + sport + ' Event';
  let details = faker.lorem.paragraph().substring(0,255);
  let startDate = new Date();
  let endDate = new Date();
  startDate.setDate(startDate.getDate() + 1)
  endDate.setDate(endDate.getDate() + 8);
  let date = faker.date.between(startDate, endDate);
  let month = JSON.stringify(date.getMonth() + 1);
  let day = JSON.stringify(date.getDate());
  let time = JSON.stringify(getRandomInt(1,12)) + ':' + numberEnds[getRandomInt(0,numberEnds.length-1)];
  // let address = faker.address.zipCode();
  let street = faker.address.streetAddress();
  let city = faker.address.city();
  let state = faker.address.state();
  let zip = zips[getRandomInt(0, zips.length)]
  let maxPlayers = getRandomInt(2, 16);
  let minPlayers = getRandomInt(1, 2);
  let maxPlayersEnabled = booleans[getRandomInt(0,1)];
  let minPlayersEnabled = booleans[getRandomInt(0,1)];
  let currentPlayers = getRandomInt(minPlayers, maxPlayers);
  let evenOnly = booleans[getRandomInt(0,1)];
  let owner = id;
  let members = [id];
  for(var i = 0; i < currentPlayers; i++) {
    let randomID = createdIDs[getRandomInt(0, createdIDs.length - 1)];
    if(!members.includes(randomID)) {
      members.push(randomID);
    }
  }
  currentPlayers = members.length;
  if(currentPlayers > maxPlayers) {
    maxPlayers = currentPlayers;
  }
  
  let insert = { name, sport, details, month, day, time, street, city, state, zip, maxPlayers, minPlayers, maxPlayersEnabled, minPlayersEnabled, currentPlayers, evenOnly, owner, members  };
  helper.createEvent(insert,() => {})
}

for(var i = 0;i < 3000; i++) {
  makeOneProfileWithSomeEvents();
}