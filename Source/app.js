const express = require('express');
const exphbs = require('express-handlebars');
const asyncErr = require('express-async-errors');

const accountR = require('./routers/account.route');

const hbs_sections = require('express-handlebars-sections');
const path = require('path');

const auth = require('./middleWares/auth');
const sessionMDW = require('./middleWares/session');


const app = express();
const port = 3000

app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'containerSearch.hbs',
  layoutsDir: 'views/layouts',
  helpers: {
    section: hbs_sections()
  }
}))

app.use(express.static(__dirname));

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/err', function (req, res) {
  throw new Error('Error!');
});


app.use('/', accountR);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('error/500', { layout: false });
  })


app.use((req, res, next) => {
res.render('error/404', { layout: false });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))