
const db = require('./db');


module.exports = {
    getAll: () =>{
        const query = 'select * from "Employee" ORDER BY "idEmployee" ASC';
        return db.any(query);
    },

    countEmp: async () => {
        const result = await db.one('SELECT count(*) FROM "Employee"');
        return result.count;
    },

    findPage: async (offset, limit) => {
        return await db.any(`SELECT * FROM "Employee" ORDER BY "idEmployee" ASC limit ${limit} offset ${offset}`);
    },

    // search: async(keySearch, offset, limit)=>{
    //     const query =  ``;
    //     return await db.any(query);
    // },

    // countEmpSearch: async(keySearch) =>{
    //     const result =  await db.one(`SELECT count(*) FROM "Employee" where `);
    //     return result.count;
    // },

    getEmp: async (PhoneNumber) => {
        const query = ``;
        return await db.oneOrNone(query);
    },

    add: async (emp, idAcc) => {
        const query = `INSERT INTO "Employee" ("FullName", "PhoneNumber", "Email", "Type", "Address", "DateOfBirth", "Account_idAccount")
        VALUES('${emp.FullName}', '${emp.PhoneNumber}', '${emp.Email}','${emp.Type}','${emp.Address}','${emp.DateOfBirth}',${idAcc}) 
        RETURNING *`;
        return db.one(query);
    },

    getEmpById: async (id) => {
        const query = `select * from "Employee" where "idEmployee" = ${id}`;
        return await db.one(query);
    },

    getPhone: async (phone) => {
        const query = `select * from "Employee" where "PhoneNumber" = '${phone}'`;
        return db.oneOrNone(query);
    },

    update: async (emp) => {
        const query = `UPDATE "Employee" SET "FullName" = '${emp.FullName}', 
        "PhoneNumber" = '${emp.PhoneNumber}' , "Email" = '${emp.Email}', "Type" = '${emp.Type}'
         ,"Address" = '${emp.Address}', "DateOfBirth" = '${emp.DateOfBirth}' 
         WHERE "idEmployee" = ${emp.idEmployee}`;
        return db.none(query);
    },
    findIdAccount: async(idEmployee) =>{
        const query = `select "Account_idAccount" from "Employee" where "idEmployee" = ${idEmployee}`;
        return db.one(query);
    },

    getEmpByIdAcc: async (id) => {
        const query = `select * from "Employee" where "Account_idAccount" = ${id}`;
        return await db.one(query);
    },
}