const { one } = require('./db');
const db = require('./db');


module.exports = {

    getAll: () =>{
        const query = 'select * from "Book" ORDER BY "idBook" ASC';
        return db.any(query);
    },

    countBook: async () => {
        const result = await db.one('select count(*) from "Book"');
        return result.count;
    },

    findPage: async (offset, limit) => {
        return await db.any(`SELECT * FROM "Book" limit ${limit} offset ${offset}`);
    },

    search: async (keySearch) => {
        const query = `select * from "Book" where to_tsvector("idBook"||' '||"BookName"||' '||"Author"||' '||"Topic") @@ plainto_tsquery('${keySearch}') `;
        return await db.any(query);
    },

    // getId: async (bookName, author, topic) => {
    //     const query = `select "IdBook" from "Book" where "BookName" = '${bookName}' `;
    //     return await db.oneOrNone(query);
    // },

    add: async (book) => {
        const query = `INSERT INTO "Book"("BookName", "Author", "Topic", "Quantity", "Price") VALUES('${book.BookName}', '${book.Author}', '${book.Topic}', ${book.Quantity}, ${book.Price}) RETURNING "idBook" `;
        return db.one(query);
    },

    addBookExist: async (book, QuantityAfter) => {
        const query = `UPDATE "Book" SET "Quantity" = ${QuantityAfter} WHERE "BookName" = '${book.BookName}' and "Author" = '${book.Author}' RETURNING "idBook" `;
        return db.one(query);
    },

    getBookById: async (id) => {
        const query = `select * from "Book" where "idBook" = ${id}`;
        return await db.one(query);
    },

    getQuantity: async (Book) => {
        const query = `select "Quantity" from "Book" where "BookName" = '${Book.BookName}' and "Author" = '${Book.Author}'`;
        const result = await one(query);
        return result.Quantity;
    },

    addHistory: async (DayCreate) => {
        const query = `INSERT INTO "Import_History" ("DateCreate") VALUES('${DayCreate}') RETURNING "idImport_History"`;
        const result = await db.one(query);
        return result.idImport_History;
    },

    adddetail: async(idBook, idImport_History, Quantity) =>{
        const query = `INSERT INTO "Import_Detail" VALUES(${idBook}, ${idImport_History}, ${Quantity})`;
        return db.none(query);
    },

    update: async(book)=>{
        const query = `UPDATE "Book" SET "BookName" = '${book.BookName}', "Topic" = '${book.Topic}', "Author" = '${book.Author}', "Quantity" = '${book.Quantity}', "Price" = '${book.Price}' WHERE "idBook" = ${book.idBook}`;
        return db.none(query);
    },
    getId: async(book) =>{
        const query = `select "idBook" from "Book" where "BookName" = '${book.BookName}' and "Author" ='${book.Author}' and "Topic" = '${book.Topic}'`;
        return await db.oneOrNone(query);
    },

    getBookByNameAndAuthor: async(BookName, Author)=>{
        const query = `select * from "Book" where "BookName" = '${BookName}' and "Author" = '${Author}' `;
        return db.oneOrNone(query);
    }
}