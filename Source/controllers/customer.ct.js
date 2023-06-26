const cusM = require('../models/customer.model');
const moment = require('moment');
const receiptM = require('../models/receipt.model');
exports.getView = async (req, res, next) => {

    const list = await cusM.getAll();
    list.forEach(element => {
        element.DateOfBirth = moment(element.DateOfBirth).format('DD-MM-YYYY')
    });

    if (req.session.user.Permission === 1) {
        return res.render('viewCustomer/home', {
            list: list,
            empty: list.length === 0,
        });
    }
    else if (req.session.user.Permission === 2) {
        return res.render('viewCustomer/customer', {
            list: list,
            empty: list.length === 0,
            layout: 'ContainerCustomer.hbs'
        });
    }
    // điều kiện trả về màn hỉnh của ql hoặc nv
}


exports.search = async (req, res) => {

    const keySearch = req.body.search;
    const list = await cusM.search(keySearch);

    res.render('viewCustomer/customer', {
        list: list,
        empty: list.length === 0,
        layout: 'ContainerCustomer.hbs'
    })
}


exports.getAdd = async (req, res) => {
    res.render('viewCustomer/addCustomer',{
        layout: 'ContainerAddCustomer.hbs'
    });
}

exports.postAdd = async (req, res) => {
    const cus = req.body;

    cus.DeptMoney = 0;
    console.log(cus);
    await cusM.add(cus);

    res.render('viewCustomer/addCustomer',{
        layout: 'ContainerAddCustomer.hbs'
    });
}

exports.isAvailable = async (req, res) => {
    let cus = req.query.phone;
    cus = cus.split("|");
    const name = cus[0];
    const phone = cus[1];
    const user = await cusM.getCusByNameAndPhone(name, phone);

    var DeptMoney = -1;
    if (user !== null) {
        DeptMoney = user.DeptMoney;
    }
    return res.json(DeptMoney);
}

exports.getEdit = async (req, res) => {

    const list = await cusM.getAll();
    list.forEach(element => {
        element.DateOfBirth = moment(element.DateOfBirth).format('DD-MM-YYYY')
    });

    res.render('viewCustomer/editCustomer', {
        // cus : cus,
        list : list,
        layout: 'ContainerEditCustomer.hbs'
    })
}

exports.postEdit = async (req, res, next) => {
    const cus = req.body;
    console.log(cus);

    console.log(moment(cus.DateOfBirth, "MM-DD-YYYY"));
    cus.DateOfBirth =  moment(cus.DateOfBirth, 'DD-MM-YYYY').format('YYYY-MM-DD');
    await cusM.update(cus);
    return res.redirect('/staff/customer/edit');
}


exports.history = async (req, res) => {



    return res.render('viewCustomer/hisPurcharse', {
        // history: history,
        layout: 'ContainerHisPurcharse.hbs'
    });

}