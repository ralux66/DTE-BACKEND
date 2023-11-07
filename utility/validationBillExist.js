const bill = require('../models').bills;

module.exports =  (objetRef) => {
    // Query the database to see if the bill exists
    const billExists =  bill.findAll({
        where: {
            CompanyId: objetRef.CompanyId,
            RecLoc: objetRef.RecLoc            
        }
    });
    //console.log(billExists.isNewRecord);
    // Return true if the bill exists, false otherwise
    //return billExists;
    return billExists !== null;
    //return billExists.isnuew
};