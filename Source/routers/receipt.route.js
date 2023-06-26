const app = require('express')
const router = app.Router();

const receiptC = require('../controllers/receipt.ct');


router.get('/', receiptC.getView);
router.post('/', receiptC.postReceipt);

router.get('/historyReceip', receiptC.gethisReceipt);

router.get('/is_available', receiptC.checkBook);

module.exports = router;