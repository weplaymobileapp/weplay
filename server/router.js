const router = require('express').Router();
const controller = require('./controller');

// Fetch or delete all data 
router.route('/profile')
  .get(controller.profileFindOrCreate)
  .put(controller.profileUpdateOne)
  .delete(controller.profileDeleteAll);

  router.route('/event')
  .get(controller.eventFindAll)
//   .post(controller.eventPostOne)
//   .delete(controller.eventDeleteAll);

module.exports = router;