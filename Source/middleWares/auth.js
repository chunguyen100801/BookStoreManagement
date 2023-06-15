exports.authQL =  function (req, res, next) {
    if (req.session.auth === false) {
        return res.redirect('/login');
    }
    if(req.session.user.Permission != 1)
    {
        return res.redirect('/login');
    }
    next();
}

exports.authNV =  function (req, res, next) {
    if (req.session.auth === false) {
        return res.redirect('/login');
    }
    if(req.session.user.Permission != 2)
    {
        return res.redirect('/login');
    }
    next();
}

exports.auth = (req, res, next)=>{
    if (req.session.auth === false) {
        return res.redirect('/login');
    }
    next();
}