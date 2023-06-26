const db = require('./db');

module.exports = {
    add: async (idCus, createDate, money) =>{
        const query = `INSERT INTO "Bill"("Money", "DateCreate", "Customer_idCustomer")
         VALUES(${money},  '${createDate}', ${idCus}) RETURNING *`;
        return db.one(query);
    }
}