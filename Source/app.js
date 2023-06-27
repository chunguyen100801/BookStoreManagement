const express = require('express');
const exphbs = require('express-handlebars');
const asyncErr = require('express-async-errors');

const accountR = require('./routers/account.route');
const bookR = require('./routers/book.route');
const employeeR = require('./routers/employee.route');
const billR = require('./routers/bill.route');
const customerR = require('./routers/customer.route');
const homeR = require('./routers/home.route');
const receiptR = require('./routers/receipt.route');
const regulationR = require('./routers/regulation.route');
const reportR = require('./routers/report.route');
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

app.use("/images", express.static(path.join(__dirname, "/public/images")));

// Handlebars.registerHelper('json', function(context) {
//   return JSON.stringify(context);
// });

sessionMDW(app);

app.use(async function (req, res, next) {

  if(typeof (req.session.auth) === "undefined"){
      req.session.auth = false;
      req.session.user = null;
    //   req.session.permission = '';
  }
  res.locals.auth = req.session.auth;
  res.locals.user = req.session.user;
//   pm = req.session.permission;
  next();
});

app.get('/err', function (req, res) {
  throw new Error('Error!');
});


app.use('/', accountR);

// app.use((req, res, next)=>{
//   if (req.session.auth === false)
//   {
//     return res.redirect('/')
//   }
//   next();
// })

app.use('/account', accountR);

// // phân hệ quản lý
app.use('/manager/home', auth.authQL , homeR);
app.use('/manager/book', auth.authQL , bookR);
app.use('/manager/staff', auth.authQL , employeeR);
app.use('/manager/report', auth.authQL , reportR);
// app.use('/manager/customer', auth, customerR);
// lỗi regulation chưa biết nguyên nhân
app.use('/manager/regulation', auth.authQL, regulationR);
app.use('/manager/account', auth.authQL, accountR);


// // phân hệ nhân viên
app.use('/staff/home', auth.authNV , homeR);
app.use('/staff/bill',auth.authNV, billR);
app.use('/staff/receipt',auth.authNV, receiptR);
app.use('/staff/customer',auth.authNV, customerR);
app.use('/staff/account', auth.authNV, accountR);



  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('error/500', { layout: false });
  })


  app.use((req, res, next) => {
    res.render('error/404', { layout: false });
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))