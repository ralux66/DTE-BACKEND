const { BulkCreateBill, createOneBill, findBill, findOrCreateBill, listBill,createBill,submitBill } = require('./bill.controller');
const { createCustomer, listCustomer, findCustomer} =require('./customer.controller');
module.exports = {
    BulkCreateBill,
    createOneBill,
    findBill,
    findOrCreateBill,
    listBill,
    createBill,
    submitBill,
    createCustomer,
    listCustomer,
    findCustomer
}