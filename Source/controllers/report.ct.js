const reportM = require('../models/report.model');




exports.getTurnover = async (req, res, next) => {
    // const Months = reportM.getListMonth();
    const table = "Receipt"
    const Years = await reportM.getListYear(table);
    res.render('viewReport/turnover', {
        Year: Years,
        layout: 'ContainerTurnover.hbs'
    });
}

exports.postTurnover = async (req, res) => {
    const year = req.body.year;

    let report = [];
    var totalMoney = 0;
    var amountBook = 0;

    for(var i = 1; i<=12; i++){
        const reportAmonth = await reportM.reportTurnover(i, year);
        if(reportAmonth !==null){
            report = report.concat(reportAmonth);
            totalMoney = +totalMoney + +reportAmonth.money;
            amountBook = +amountBook + +reportAmonth.numberbook;
        }
    }
    const table = "Receipt";
    const Years = await reportM.getListYear(table);
    title = `Báo cáo năm ${year}`
    res.render('viewReport/turnover', {
        report: report,title,
        Year: Years,
        check: report.length === 0,
        totalMoney, amountBook,
        layout: 'ContainerTurnover.hbs'
    });
}


exports.getDebt = async (req, res, next) => {
    const table = "Receipt"
    const Years = await reportM.getListYear(table);
    res.render('viewReport/debt', {
        Year: Years,
        layout: 'ContainerDebt.hbs'
    });
}

exports.postDebt = async (req, res) => {
    const month = req.body.month;
    const year = req.body.year;
    const table = "Receipt"
    const Years = await reportM.getListYear(table);
    const report = await reportM.reportDebt(month, year);
    title = `Báo cáo tháng ${month}-${year}`
    res.render('viewReport/debt', {
        report: report,
        Year: Years,
        title,
        check: report.length === 0,
        layout: 'ContainerDebt.hbs'
    });
}

exports.getInventory = async (req, res, next) => {
    const Months = [];
    for (var i = 1; i <= 12; i++) {
        Months.push(i);
    }
    //console.log(Months);
    const table = "Import_History"
    const Years = await reportM.getListYear(table);
    res.render('viewReport/inventory', {
        Year: Years, 
        layout: 'ContainerInventory.hbs'
    });
}


exports.postInventory = async (req, res) => {
    const month = req.body.month;
    const year = req.body.year;
    console.log(month, year);
    const table = "Import_History"
    const Years = await reportM.getListYear(table);
    const report = await reportM.reportInventory(month, year);
    //console.log(Months);
    title = `Báo cáo tháng ${month}-${year}`
    res.render('viewReport/inventory', {
        report: report, title,
        Year: Years,
        check: report.length === 0,
        layout: 'ContainerInventory.hbs'
    });
}


