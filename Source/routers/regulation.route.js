const app = require('express')
const router = app.Router();

const regC = require('../controllers/regulation.ct');


router.get('/', regC.getView);

router.post('/', regC.postReg);


module.exports = router;