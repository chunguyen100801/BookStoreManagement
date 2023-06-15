const app = require('express')
const router = app.Router();
const authP = require('../middleWares/auth');

const homeC = require('../controllers/home.ct');

router.get('/',  homeC.getHome);

router.post('/search', homeC.search);

module.exports = router;