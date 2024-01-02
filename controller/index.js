const { BulkCreateBill, createOneBill, findBill, findOrCreateBill, 
    findAndCountAllBill,createBill,submitBill } = require('./bill.controller');
const { createCustomer, listCustomer, findCustomer} =require('./customer.controller');
module.exports = {
    BulkCreateBill,
    createOneBill,
    findBill,
    findOrCreateBill,     
    createBill,
    submitBill,
    createCustomer,
    listCustomer,
    findCustomer,
    findAndCountAllBill
}