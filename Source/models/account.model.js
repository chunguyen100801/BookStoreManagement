const pgPromise = require('pg-promise');
const db = require('./db');


module.exports = {
    findAll: async () => {
        const result = await db.any('select * from "Users"');
        return result;
    },
    findByUsername: async (username) => {
        const result = await db.oneOrNone(`select * from "Account" where "Username" = '${username}'`);

        //const result = await db.oneOrNone(`select * from "Users" where "f_Username" = '${username}'`);
        return result;
    },
    getMaxId: async () => {
        const result = await db.one('select max("f_ID") from "Users"');

        return result;
    },
    add: async (acc) => {
        const reuslt =  await
            db.one(`INSERT INTO "Account"("Username", "Password", "Permission") VALUES('${acc.Username}','${acc.Password}',${acc.Permission}) RETURNING "idAccount" `);

        return reuslt.idAccount;
    },

    update: async(username, password) =>{
        const query = `UPDATE "Account" SET "Password" = '${password}'  where "Username" = '${username}'`;
        return db.none(query);
    }
}