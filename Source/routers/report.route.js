const app = require('express')
const router = app.Router();

const reportC = require('../controllers/report.ct');


// router.get('/', reportC.getView);

router.get('/turn_over', reportC.getTurnover);
router.post('/turn_over', reportC.postTurnover);

router.get('/debt', reportC.getDebt);
router.post('/debt', reportC.postDebt);

router.get('/inventory', reportC.getInventory);
router.post('/inventory', reportC.postInventory);


module.exports = router;