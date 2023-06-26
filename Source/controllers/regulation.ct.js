const regM = require('../models/regulation.model');

exports.getView = async (req, res, next) => {
    const reg = await regM.getAll();
    // res.render('regulation/reg',{
    //     reg: reg
    // });

    res.render('viewTest/regulation', {
        reg: reg,
        layout: 'ContainerRegulation.hbs'
    });
}

exports.postReg = async(req, res)=>{
    // nhan gia tri tu form
    const reg = req.body;
    // console.log(reg);
    // const idRegulation = await regM.findIdbyName(reg.Detail);
    // console.log(idRegulation);
    await regM.update(reg);
    // res.render('regulation/reg');
    // res.render('viewTest/regulation', {
    //     layout: 'ContainerRegulation.hbs'
    // });
    res.redirect('/manager/regulation')
}


