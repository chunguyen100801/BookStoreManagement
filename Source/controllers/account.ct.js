
const cryptoJS = require('crypto-js');
const accountM = require('../models/account.model.js');
const employeeM = require('../models/employee.model.js');

const hashLength = 64;
const nodemailer = require("nodemailer");
require('dotenv').config;

exports.getLogin = (req, res, next) => {
    if (req.session.auth === true) {
        return res.redirect('/')
    }

    res.render('viewLogin/login', {
        layout: 'containerLogin.hbs'
    });
}

exports.postLogin = async (req, res, next) => {

    const user = await accountM.findByUsername(req.body.Username);
    if (user === null) {
        return res.render('viewLogin/login', {
            errMessage: "Tên tài khoản hoặc mật khẩu sai.",
            layout: 'containerLogin.hbs'
        });
    }

    const pw = req.body.Password;
    const salt = user.Password.slice(hashLength);
    const pwS = pw + salt;
    const pwH = cryptoJS.SHA3(pwS, { outputLength: hashLength * 4 }).toString(cryptoJS.enc.Hex);
    if ((pwH + salt) !== user.Password) {
        return res.render('viewLogin/login', {
            errMessage: "Tên tài khoản hoặc mật khẩu sai.",
            layout: 'containerLogin.hbs'
        });
    }

    req.session.auth = true;
    req.session.user = user;
    if (req.session.user.Permission === 1) {
        req.session.permission = 'quanly';
    } else {
        req.session.permission = 'nhanvien';
    }
    res.redirect('/');
}

exports.postLogout = async (req, res, next) => {
    req.session.auth = false;
    req.session.user = null;

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



exports.getChangePw = (req, res, next) => {
    return res.render('viewAccount/changePassword', {
        layout: 'containerChangePW.hbs'
    });
}

exports.postChangePw = async (req, res) => {

    const user = await accountM.findByUsername(req.session.user.Username);

    const PasswordOld = req.body.PasswordOld;
    const salt = user.Password.slice(hashLength);
    const pwS = PasswordOld + salt;
    const pwH = cryptoJS.SHA3(pwS, { outputLength: hashLength * 4 }).toString(cryptoJS.enc.Hex);

    var errMessage = "";
    if ((pwH + salt) !== user.Password) {
        errMessage = "Mật khẩu cũ sai.";
        return res.render('viewAccount/changePassword', {
            errMessage: errMessage,
            layout: 'containerChangePW.hbs'
        });
    }

    const pwN = req.body.PasswordNew;

    const saltN = Date.now().toString(16);//dob.toString(16);
    const pwNS = pwN + saltN;
    const pwNH = cryptoJS.SHA3(pwNS, { outputLength: hashLength * 4 }).toString(cryptoJS.enc.Hex);
    const password = pwNH + saltN;

    const username = req.session.user.Username;
    await accountM.update(username, password);

    res.redirect('/');
}

exports.getResetPw = (req, res, next) => {
    res.render('viewAccount/resetPassword', {
        layout: 'containerResetPW.hbs'
    });
}

async function hanldSendEmail(EmailAddress_User, newPassword, username){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.Address_Email,
          pass: process.env.Password_Email
        }
      });
      
    var info = await transporter.sendMail({
        from: process.env.Address_Email,
        to: `${EmailAddress_User}`,
        subject: "Reset Password",
        text: `Mật khẩu mới của tài khoản ${username} là: ${newPassword}`, // plain text body
        html: `Mật khẩu mới của tài khoản ${username} là:<b>${newPassword}</b>`
    });
    return info;
}
      

exports.handleResetPassword = async(req, res) =>{
    const username = req.query.user;
    const user = await accountM.findByUsername(username);

    var check = {checkAvailable: false, checkEmail: false};

    if (user === null) {
        return res.json(check);
    }
    check.checkAvailable = true;

    const employee = await employeeM.getEmpByIdAcc(user.idAccount);
    let newPassword = (Math.random() + 1).toString(36).substring(6);

    // console.log(employee.Email, newPassword);

    var sendEmail = await hanldSendEmail(employee.Email, newPassword, username);

    if(sendEmail.rejected.length == 0){
        check.checkEmail = true;

        const pwN = newPassword;
        const saltN = Date.now().toString(16);//dob.toString(16);
        const pwNS = pwN + saltN;
        const pwNH = cryptoJS.SHA3(pwNS, { outputLength: hashLength * 4 }).toString(cryptoJS.enc.Hex);
        const password = pwNH + saltN;
    
        await accountM.update(username, password);
    }

    // console.log(check);
    res.json(check);
}

exports.postResetPw = async (req, res) => {
    const username = req.body.Username;


    res.redirect('/');
}