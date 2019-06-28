const router = require('express').Router();
const controller = require('./controller');

// Fetch or delete all data 
router.route('/profile')
  .get(controller.profileFindOrCreate)
  .put(controller.profileUpdateOne)
  .delete(controller.profileDeleteAll);

  router.route('/event')
  .get(controller.eventFindAll)
  .post(controller.eventPostOne)
  .put(controller.eventPutOne)
//   .delete(controller.eventDeleteAll);

  router.route('/members')
  .get(controller.findMembers)

module.exports = router;