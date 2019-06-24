const fs = require('fs');
const write = fs.createWriteStream('./eventsExample.json');
const faker = require('faker');

const sports = ['Ping Pong', 'Pickle Ball', 'Basketball', 'Volleyball', 'Hacky Sack', 'Laser Tag', 'Mini Golf'];
const names = ["Angela's", "Calvin's", "Dustin's", "Gaby's", "James'", "Wendy's", "Ufuk's", "Ramin's", "Kathleen's", "Jeff's",
  "Wayne's", "Mark's", "Matt's", "Matthew's", "Victor's", "Morgan's", "Adam's", "Anthony's", "Uttej's", "Nate's",
  "Charlie's", "Albert's", "Tracy's", "Liezel's", "Jesse's", "Daniel's", "Fred's", "Tommy's", "Brian's", "Paul's", "Snoopy's",
  "Viv's", "Semira's", "Eva's", "Eti's", "Billy's"];
const numberEnds = ['00', '15', '30', '45'];
const booleans = [true, false];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createEvent = () => {
  let sport = sports[getRandomInt(0, sports.length - 1)];
  let justName = names[getRandomInt(0, names.length - 1)];
  let name = justName + ' ' + sport + ' Event';
  let description = faker.lorem.paragraph();
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  let date = JSON.stringify(faker.date.between(startDate, endDate)).substring(1, 11);
  let time = JSON.stringify(getRandomInt(1,12)) + ':' + numberEnds[getRandomInt(0,numberEnds.length-1)];
  let address = faker.address.zipCode();
  let maxPlayers = getRandomInt(2, 16);
  let minPlayers = getRandomInt(1, 2);
  let currentPlayers = getRandomInt(minPlayers, maxPlayers);
  let evenOnly = booleans[getRandomInt(0,1)];
  let owner = justName.substring(0, justName.length - 2);
  
  let object = { name, sport, description, date, time, address, maxPlayers, minPlayers, currentPlayers, evenOnly, owner };
  return object;
}

let arrayToWrite = [];

for(var i = 0; i < 300; i++) {
  let itemToWrite = createEvent();
  arrayToWrite.push(itemToWrite);
}

write.write(JSON.stringify(arrayToWrite, null, 2));

