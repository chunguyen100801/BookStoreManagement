const db = require('./db');

module.exports = {
    getById: async(idCustomer) =>{
        const query = `select * from "Receipt" where "Customer_idCustomer" = ${idCustomer}`;
        return db.any(query);
    },

    add: async(TotalMoney, DayCreate, idCustomer, idEmployee) => {
        const query = `INSERT INTO "Receipt" ("TotalMoney", "DateCreate", "Customer_idCustomer", "Employee_idEmployee") 
                VALUES(${TotalMoney}, '${DayCreate}',  ${idCustomer}, ${idEmployee}) RETURNING "idReceipt" `;
        return db.one(query);
    },

    addDetail: async(idBook, idReceipt, Quantity_Purchase)=>{
        const query =  `INSERT INTO "Detail_Receipt" VALUES(${idBook}, ${idReceipt},  ${Quantity_Purchase}) `;
        return db.none(query);
    },

    findByIdEmployee: async(id)=>{
        const query = `select * from "Receipt", "Customer" where 
        "idCustomer" = "Customer_idCustomer" and "Employee_idEmployee" = ${id} `;
        return db.any(query);
    },

    addHistoryDept: (DateCreate, Dept_Money, Customer_idCustomer) =>{
        const query = `INSERT INTO "Dept_History" ("DateCreate", "Dept_Money", "Customer_idCustomer") 
        VALUES ('${DateCreate}', ${Dept_Money}, ${Customer_idCustomer})`;
        console.log(query);
        return db.none(query);
    }
}