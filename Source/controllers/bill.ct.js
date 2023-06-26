const billM = require('../models/bill.model');
const cusM = require('../models/customer.model');
const moment = require('moment');

exports.getView = async (req, res, next) => {
    res.render('viewBill/bill', {
        layout: 'ContainerBill.hbs'
    });
}

exports.getDept = async(req, res)=>{
    // ten khách hàng, sdt, tiền thu được tách ra từ req.query;
    let user = req.query.user;
    user = user.split("_");
    const FullName = user[0];
    const PhoneNumber = user[1];

    const customer = await cusM.getCusByNameAndPhone(FullName, PhoneNumber);

    let debt = -1;
    if(customer !== null){
        debt = customer.DeptMoney;
    }

    return res.json(debt);
}

exports.postBill = async(req,res)=>{

    const FullName = req.body.FullName;
    const PhoneNumber = req.body.PhoneNumber;
    const money= req.body.Money;
    const customer = await cusM.getCusByNameAndPhone(FullName, PhoneNumber);
    //console.log(customer);
    const debt = customer.DeptMoney - money;

    await cusM.updateDebt(customer.idCustomer, debt);
    const DayCreate = moment().format('YYYY-MM-DD');
    await billM.add(customer.idCustomer, DayCreate, money);

    return res.redirect('/staff/customer');
}
