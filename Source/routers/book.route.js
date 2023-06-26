const app = require('express')
const router = app.Router();

const bookC = require('../controllers/book.ct');


// router.get('/', bookC.getHome);

// router.post('/search', bookC.search);

router.get('/add_book_new', bookC.getViewAddNew);

router.post('/add_book_new', bookC.postAddNew);

router.get('/add_book_exist', bookC.getViewAddExist);

router.post('/add_book_exist', bookC.postAddExist);

router.get('/edit', bookC.getEdit);

router.post('/edit', bookC.postEdit);

router.get('/is_available', bookC.check);
module.exports = router;