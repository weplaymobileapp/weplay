const sequelize = require('./index.js')
const model = require('./models.js')
const helper = require('./helpers.js');


// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     helper.findEvents('Water Polo', '67890', '5', '30', (items) => {
//       console.log(items);
//     })

//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


    // //        // helper.createEvent();
    //     // helper.createAccount();
    //     model.Event.findAll({where: {sport: 'Laser Tag'}})
    //     .then(data => {
    //         console.log(data[0].ownerID)
    //         model.Profile.findAll({where: {id: data[0].ownerID}})
    //         .then(data => {
    //             console.log('Owner of this event is: ', data[0].name)
    //         })
    //     })