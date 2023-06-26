const app = require('express')
const router = app.Router();

const auth = require('../middleWares/auth')

const cusC = require('../controllers/customer.ct');


router.get('/', cusC.getView);

router.post('/search',cusC.search);

router.get('/add', auth.authNV, cusC.getAdd);

router.post('/add', cusC.postAdd);

router.get('/edit', auth.authNV, cusC.getEdit);

router.post('/edit', cusC.postEdit);

router.get('/is_available', cusC.isAvailable);

router.get('/history', cusC.history);

// router.get('check', cusC.checkExist);

module.exports = router;