// const bookM = require('../models/book.model.js');

// exports.getHome = async (req, res, next) => {



//     const listbook = await bookM.getAll();

//     //trả màn hình quản lý
//     if (req.session.user.Permission === 1){
//         return res.render('viewTest/search', {
//             books: listbook,
//             empty: listbook.length===0,
           
//             layout: 'ContainerSearch.hbs'
//         });
//     }

//     //trả màn hình nhân viên
//     else if (req.session.user.Permission === 2){
//         return res.render('viewEmployee/search', {
//             books: listbook,
//             empty: listbook.length===0,
            
//             layout: 'ContainerSearchEmployee.hbs'
//         });
//     }
// }



// exports.search = async (req, res) =>{
//     const keySearch = req.body.search;
    
//     const listBook = await bookM.search(keySearch);

//     res.render('viewTest/search',{
//         listBook: listBook,
//         empty: listBook.length===0,
//         layout: 'ContainerSearch.hbs'
//     })
// }

const bookM = require('../models/book.model.js');

exports.getHome = async (req, res, next) => {



    const listbook = await bookM.getAll();

    //trả màn hình quản lý
    if (req.session.user.Permission === 1){
        return res.render('viewHome/search', {
            books: listbook,
            empty: listbook.length===0,
           
            layout: 'ContainerSearch.hbs'
        });
    }

    //trả màn hình nhân viên
    else if (req.session.user.Permission === 2){
        return res.render('viewHome/searchBook', {
            books: listbook,
            empty: listbook.length===0,
            
            layout: 'ContainerSearchEmployee.hbs'
        });
    }
}



exports.search = async (req, res) =>{
    const keySearch = req.body.search;
    
    const listBook = await bookM.search(keySearch);

    res.render('viewHome/search',{
        listBook: listBook,
        empty: listBook.length===0,
        layout: 'ContainerSearch.hbs'
    })
}
