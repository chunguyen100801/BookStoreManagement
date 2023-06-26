const receiptM = require('../models/receipt.model');
const bookM = require('../models/book.model');
const cusM = require('../models/customer.model');
const reguM = require('../models/regulation.model');
const EmpM = require('../models/employee.model');
const moment = require('moment');
exports.getView = async (req, res, next) => {
    const listRule = await reguM.getAll();
    const n = listRule.length;
    var minQuantity = -1;
    var maxDept = -1;
    check1 = false;
    check2 = false;
    for (var i = 0; i < n; i++) {
        if (listRule[i].Status === 'Đang sử dụng') {
            if (listRule[i].Detail === 'Lượng tồn tối thiểu sau khi bán') {
                minQuantity = listRule[i].Value;
                check1 = true;
            }
            else if (listRule[i].Detail === 'Số tiền nợ tối đa khách hàng có thể nợ') {
                maxDept = listRule[i].Value;
                check2 = true;
            }
        }
    }
    return res.render('viewEmployee/receipt', {
        minQuantity, maxDept,
        layout: 'ContainerReceipt.hbs'
    });
}

exports.checkDebt = async (req, res) => {
    //ten sdt email, dia chi được lấy từ view
    const FullName = '';
    const Email = '';
    const PhoneNumber = '';
    const Address = '';
    const customer = await cusM.getCusByNameAndPhone(FullName, PhoneNumber);
    var idCustomer;
    var debt = -1;
    const regu = reguM.getAll();

    if (customer === null) {
        const cusNew = {
            FullName: FullName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Address: Address
        }
        idCustomer = await cusM.add(cusNew);
        return res.json({
            debt: debt,
            regu: regu[2]
        });
    }
    debt = customer.debt;
    return res.json({
        debt: debt,
        regu: regu[2]
    });
}


exports.checkBook = async (req, res) => {
    let infoBook = req.query.book;
    infoBook = infoBook.split("|");
    const BookName = infoBook[0];
    const Author = infoBook[1];

    const Book = await bookM.getBookByNameAndAuthor(BookName, Author);
    var Quantity = -1;
    var Price = -1;
    if (Book !== null) {
        Quantity = Book.Quantity;
        Price = Book.Price;
    }
    result = { Quantity: Quantity, Price: Price };
    return res.json(result);
}

exports.postReceipt = async (req, res) => {

    const data = req.body.arr;
    const infoCus = data[0];
    console.log(infoCus);

    const customer = await cusM.getCusByNameAndPhone(infoCus.NameCustomer, infoCus.Phone);
    customer.DateOfBirth = moment(customer.DateOfBirth).format('YYYY-MM-DD');
    const DayCreate = moment().format('YYYY-MM-DD');

    const idAccount = req.session.user.idAccount;
    const Employee = await EmpM.getEmpByIdAcc(idAccount);

    const idReceipt = await receiptM.add(infoCus.totalMoney, DayCreate, customer.idCustomer, Employee.idEmployee);

    const n = data.length;

    for (var i = 1; i < n; i++) {
        const quantity = await bookM.getQuantity(data[i]);

        const quantityAfter = quantity - data[i].Quantity;
        const book = await bookM.addBookExist(data[i], quantityAfter);

        await receiptM.addDetail(book.idBook, idReceipt.idReceipt, data[i].Quantity);
    }

    if(data[0].status == "ghi nợ"){
        customer.DeptMoney = +customer.DeptMoney + +infoCus.totalMoney;
        await cusM.update(customer);
        await receiptM.addHistoryDept(DayCreate, infoCus.totalMoney, customer.idCustomer);
    }
    res.json(true);
}

exports.gethisReceipt = async (req, res, next) => {

    const idAccount = req.session.user.idAccount;
    const Employee = await EmpM.getEmpByIdAcc(idAccount);
    const listHis = await receiptM.findByIdEmployee(Employee.idEmployee);

    listHis.forEach(element => {
        element.DateCreate = moment(element.DateCreate).format('DD-MM-YYYY')
    });
    return res.render('viewEmployee/hisReceipt', {
        listHis: listHis,
        Employee,
        layout: 'ContainerHisReceipt.hbs'
    });
}


