const router = require('express').Router();
const controller = require('./controller');

// Fetch or delete all data 
router.route('/profile')
  .get(controller.profileFindAll)
  .post(controller.profilePostOne)
  .delete(controller.profileDeleteAll);


module.exports = router;