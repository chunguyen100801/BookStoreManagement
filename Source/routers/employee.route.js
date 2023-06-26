const app = require('express')
const router = app.Router();

const employeeC = require('../controllers/employee.ct');


router.get('/', employeeC.getView);


router.get('/add', employeeC.getAdd);

router.post('/add', employeeC.postAdd);

router.get('/edit', employeeC.getEdit);

router.post('/edit', employeeC.postEdit);

// router.get('/is-available', employeeC.isAvailable);

module.exports = router;