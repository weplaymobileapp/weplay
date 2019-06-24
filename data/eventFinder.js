const fs = require('fs')

let info = JSON.parse(fs.readFileSync('./eventsExample.json', 'utf-8'));
let toFind = [];
for(var i = 0; i < info.length; i++) {
    if(info[i].date ==='2019-06-26' && info[i].sport === 'Hacky Sack') {
        toFind.push(info[i]);
    }
}

console.log(toFind.length);