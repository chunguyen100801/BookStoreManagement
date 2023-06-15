const app = require('express')
const router = app.Router();

const accountC = require('../controllers/account.ct');

router.get('/', (req, res, next) => {
    res.redirect('/login')
});

router.get('/login', accountC.getLogin);
router.post('/login', accountC.postLogin);


router.get('/is_available', accountC.isAvailable);

router.get('/reset', accountC.getResetPw);
router.post('/reset', accountC.postResetPw);

module.exports = router;