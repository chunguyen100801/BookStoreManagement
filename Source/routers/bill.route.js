const app = require('express')
const router = app.Router();

const billC = require('../controllers/bill.ct');


router.get('/', billC.getView);
router.post('/', billC.postBill);

router.get('/get_dept', billC.getDept);
//router.get('/lookup', billC.HistoryLookup);

module.exports = router;