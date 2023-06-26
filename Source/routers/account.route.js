// const app = require('express')
// const router = app.Router();

// const accountC = require('../controllers/account.ct');

// router.get('/', (req, res, next) => {
//     res.redirect('/login')
// });

// router.get('/login', accountC.getLogin);
// router.post('/login', accountC.postLogin);


// router.get('/is_available', accountC.isAvailable);

// router.get('/reset', accountC.getResetPw);
// router.post('/reset', accountC.postResetPw);

// module.exports = router;

const app = require('express')
const router = app.Router();

const accountC = require('../controllers/account.ct');

router.get('/', (req, res, next) => {
    if (req.session.user === null) { 
        res.redirect('/login'); }
    else if (req.session.user.Permission === 1){
        res.redirect('/manager/home');
    }
    else if (req.session.user.Permission === 2){
        res.redirect(`/staff/home`);
    }
});

router.get('/login', accountC.getLogin);
router.post('/login', accountC.postLogin);

// router.get('/register', accountC.getRegister);
// router.post('/register', accountC.postRegister);

router.post('/logout', accountC.postLogout);

router.get('/is_available', accountC.isAvailable);

router.get('/reset', accountC.getResetPw);
router.post('/reset', accountC.postResetPw);

router.get('/change_password', accountC.getChangePw);
router.post('/change_password', accountC.postChangePw);

//thiếu profile

module.exports = router;