const empM = require('../models/employee.model');
const accM = require('../models/account.model');
const cryptoJS = require('crypto-js');
const hashLength = 64;
const moment = require('moment');


exports.getView = async (req, res, next) => {


    const list = await empM.getAll();
    list.forEach(element => {
        element.DateOfBirth = moment(element.DateOfBirth).format('DD-MM-YYYY')
    });
    res.render('viewEmployee/employee', {
        list: list,
        empty: list.length === 0,
       
        layout: 'ContainerEmployee.hbs'
    });
}


exports.getAdd = async (req, res) => {
    res.render('viewEmployee/addEmployee', {
        layout: 'ContainerAddEmployee.hbs'
    });
}

exports.postAdd = async (req, res) => {
    
    const un = req.body.Username;
    const pw = req.body.Password;

    const salt = Date.now().toString(16);//dob.toString(16);
    const pwS = pw + salt;
    const pwH = cryptoJS.SHA3(pwS, { outputLength: hashLength * 4 }).toString(cryptoJS.enc.Hex);

    
    var permission;
    const emp = req.body;
    if(emp.Type === "Quản lý"){
        permission = 1;
    }
    else{
        permission = 2;
    }
    const user = {
        Username: un,
        Password: pwH + salt,
        Permission: permission
    }

    const idAcc = await accM.add(user);
    await empM.add(emp, idAcc);

    res.redirect('/manager/staff');
    //res.render('viewbook/add');
}



exports.getEdit = async (req, res) => {
    const list = await empM.getAll();
    //const id = req.query.idEmployee;
    // const emp = await empM.getEmpById(id);
    list.forEach(element => {
        element.DateOfBirth = moment(element.DateOfBirth).format('DD-MM-YYYY')
    });
    res.render('viewEmployee/editEmployee', {
        // emp :emp,
        list: list,
        //layout: 'ContainerEmployee.hbs'
        layout: 'ContainerEditEmployee.hbs'
    })
}

exports.postEdit = async (req, res, next) => {
    const emp = req.body;

    emp.DateOfBirth = moment(emp.DateOfBirth, 'DD-MM-YYYY').format('YYYY-MM-DD');
    console.log(emp);
    await empM.update(emp);
    // const url = req.headers.referer;
    res.redirect('/manager/staff/edit');

}
