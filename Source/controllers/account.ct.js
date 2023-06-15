const cryptoJS = require('crypto-js');
const accountM = require('../models/account.model.js');
const hashLength = 64;

exports.getLogin = (req, res, next) => {
    res.render('viewLogin/login', {
        layout: 'login.hbs'
    });
}

exports.postLogin = async (req, res, next) => {

    const user = await accountM.findByUsername(req.body.Username);
    if (user === null) {
        return res.render('viewLogin/login', {
            errMessage: "Tên tài khoản hoặc mật khẩu sai.",
            layout: 'login.hbs'
        });
    }

    const pw = req.body.Password;
    const salt = user.Password.slice(hashLength);
    const pwS = pw + salt;
    const pwH = cryptoJS.SHA3(pwS, { outputLength: hashLength * 4 }).toString(cryptoJS.enc.Hex);
    if ((pwH + salt) !== user.Password) {
        return res.render('viewLogin/login', {
            errMessage: "Tên tài khoản hoặc mật khẩu sai.",
            layout: 'login.hbs'
        });
    }

    // req.session.auth = true;
    // req.session.user = user;
    // if (req.session.user.Permission === 1) {
    //     req.session.permission = 'quanly';
    // } else {
    //     req.session.permission = 'nhanvien';
    // }
    res.redirect('/');
}


exports.isAvailable = async (req, res) => {
    const username = req.query.user;
    const user = await accountM.findByUsername(username);
    if (user === null) {
        return res.json(false);
    }
    res.json(true);
}


exports.getResetPw = (req, res, next) => {
    res.render('viewAccount/resetPW', {
        layout: 'containerResetPW.hbs'
    });
}

exports.postResetPw = async (req, res) => {
    //const user = await accountM.findByUsername(req.body.Username);
    const pwN = req.body.PasswordNew;
    const saltN = Date.now().toString(16);//dob.toString(16);
    const pwNS = pwN + saltN;
    const pwNH = cryptoJS.SHA3(pwNS, { outputLength: hashLength * 4 }).toString(cryptoJS.enc.Hex);
    const password = pwNH + saltN;

    const username = req.body.Username;
    await accountM.update(username, password);

    res.redirect('/');
}