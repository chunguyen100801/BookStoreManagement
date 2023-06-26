const db = require('./db');


module.exports = {
    
    countCus: async() =>{
        const result =  await db.one('SELECT count(*) FROM "Customer"');
        return result.count;
    },

    findPage: async(offset, limit)=>{
        return await db.any(`SELECT * FROM "Customer" limit ${limit} offset ${offset}`);
    },

    search: async(keySearch)=>{
        const query = `select * from "Customer" where to_tsvector("idEmployee"||' '||"FullName") @@ plainto_tsquery('${keySearch}')`;
        return await db.any(query);
    },

    add: async(cus)=>{
        const query = `INSERT INTO "Customer" ("FullName", "Address", "PhoneNumber", "DateOfBirth", "Email", "DeptMoney")
         VALUES('${cus.FullName}', '${cus.Address}', '${cus.PhoneNumber}', '${cus.DateOfBirth}', '${cus.Email}', ${cus.DeptMoney}) RETURNING *`;
        return db.one(query);
    },

    getCusById: async(id) =>{
        const query =`select * from "Customer" where "idCustomer" = ${id}`;
        return await db.one(query);
    },

    update: async(cus)=>{
        const query = `UPDATE "Customer" SET "FullName" = '${cus.FullName}', "Address" = '${cus.Address}', "PhoneNumber" = '${cus.PhoneNumber}',
         "DateOfBirth" = '${cus.DateOfBirth}', "Email"= '${cus.Email}', "DeptMoney" = ${cus.DeptMoney}  WHERE "idCustomer" = ${cus.idCustomer}`;
       
         return db.none(query);
    },

    getAll: async() =>{
        return await db.any(`SELECT * FROM "Customer" ORDER BY "idCustomer" ASC`);
    },

    getAllReceiptById: async(id) =>{
        const query = `select * from "Receipt" where "Customer_idCustomer" = ${id}`;
        return db.any(query);
    },

    getDetail: async(id)=>{
        const query = `select * from "Detail_Receipt" where "Receipt_idReceipt" = ${id}`;
        return db.any(query);
    },

    getId: async(cus) =>{
        const query = `select "idCustomer" from "Customer" where "FullName" = '${cus.FullName}',  "PhoneNumber" = '${cus.PhoneNumber}'`;
        return db.oneOrNone(query);
    },

    getCusByNameAndPhone: async (FullName, PhoneNumber) =>{
        const query = `select * from "Customer" where "PhoneNumber" = '${PhoneNumber}' and "FullName" = '${FullName}' `;
        return db.oneOrNone(query);
    },

    getCusByPhone: async (PhoneNumber) =>{
        const query = `select * from "Customer" where "PhoneNumber" = '${PhoneNumber}' `;
        return db.oneOrNone(query);
    },

    updateDebt: async(id, debt)=>{
        const query =  `UPDATE "Customer" SET "DeptMoney" = ${debt} WHERE "idCustomer" = ${id}`;
        return db.none(query);
    }
}