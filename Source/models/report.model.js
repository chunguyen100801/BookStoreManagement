const db = require('./db');


module.exports = {

    // getListMonth: async() =>{
    //     return await db.any();
    // },

    getListYear: async(table) =>{
        const query = `select distinct date_part('year', "DateCreate") from "${table}"`;
        return await db.any(query);
    },

    reportTurnover: async(month, year)=>{
        const query = `
        SELECT date_part('month', R."DateCreate") monthly, 
                SUM(R."TotalMoney") money, 
                SUM(DR."Quantity_Purchase") numberBook 
        FROM "Receipt" R, "Detail_Receipt" DR
        WHERE EXTRACT(MONTH FROM R."DateCreate") = ${month}
            AND EXTRACT(YEAR FROM R."DateCreate") = ${year}
            AND R."idReceipt" = DR."Receipt_idReceipt"
        GROUP BY date_part('month', R."DateCreate")
        `;

        return db.oneOrNone(query);
    },

    reportDebt: async(month, year)=>{
        
        const query = `
            SELECT C."FullName", C."PhoneNumber", DHC."dept_money", BC."paid",
	            DHC."dept_money" - BC."paid" last_money
            FROM "Customer" C, 
	            (SELECT B."Customer_idCustomer", SUM(B."Money") paid
	            FROM "Bill" B
	            WHERE EXTRACT(MONTH FROM B."DateCreate") = ${month}
	                AND EXTRACT(YEAR FROM B."DateCreate") = ${year}
	            GROUP BY B."Customer_idCustomer") AS BC,
	            (SELECT DH."Customer_idCustomer", SUM(DH."Dept_Money") dept_money
	            FROM "Dept_History" DH
	            WHERE EXTRACT(MONTH FROM DH."DateCreate") = ${month}
		            AND EXTRACT(YEAR FROM DH."DateCreate") = ${year}
	            GROUP BY DH."Customer_idCustomer") AS DHC
            WHERE BC."Customer_idCustomer" = C."idCustomer" AND DHC."Customer_idCustomer" = C."idCustomer"
        `;
        
        return db.any(query);
    },

    reportInventory: async(month, year)=>{
        const query = `
        SELECT B."BookName", B."Author", IP."quantity_import", Purchase."incurred", 
            IP."quantity_import" - Purchase."incurred" Quantity_Stock
        FROM "Book" B, 
            (SELECT IHD."Book_idBook", sum(IHD."Quantity_Import") AS quantity_import
            FROM "Import_History" IH INNER JOIN "Import_Detail" IHD ON IH."idImport_History" = IHD."Import_History_idImport_History"
            WHERE EXTRACT(MONTH FROM IH."DateCreate") = ${month}
                AND EXTRACT(YEAR FROM IH."DateCreate") = ${year}
            GROUP BY IHD."Book_idBook") AS IP,
            (SELECT DR."Book_idBook", sum(DR."Quantity_Purchase") AS incurred
            FROM "Detail_Receipt" DR INNER JOIN "Receipt" R ON R."idReceipt" = DR."Receipt_idReceipt"
            WHERE EXTRACT(MONTH FROM R."DateCreate") = ${month}
                AND EXTRACT(YEAR FROM R."DateCreate") = ${year}
            GROUP BY DR."Book_idBook") AS Purchase
        WHERE IP."Book_idBook" = B."idBook" AND Purchase."Book_idBook" = B."idBook"
    `;
        return db.any(query);
    }
    
}
