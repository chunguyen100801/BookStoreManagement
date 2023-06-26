
const db = require('./db');


module.exports = {
    getAll: ()=>{
        const query = 'select * from "Regulation" ORDER BY "idRegulation" ASC';
        return db.any(query);
    },

    update: async (regu) => {
        const query = `UPDATE "Regulation" SET  "Status" = '${regu.Status}', "Value" = '${regu.Value}' WHERE "Detail" = '${regu.Detail}'`;
        
        return db.none(query);
    },
    findIdbyName: async(Detail)=>{
        const query = `select "idRegulation" from "Regulation" where "Detail" = '${Detail}'`;
        return db.one(query);
    }
}