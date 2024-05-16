const { BulkCreateBill, createOneBill, findBillByCompany, findOrCreateBill,
    findAndCountAllBill, createBill, submitBill, submitAllBill } = require('./bill.controller');
const { createCustomer, listCustomer, findCustomer } = require('./customer.controller');
const { listlogsbycompanyguid } = require('./logs.controller');
module.exports = {
    BulkCreateBill,
    createOneBill,
    findBillByCompany,
    findOrCreateBill,
    createBill,
    submitBill,
    createCustomer,
    listCustomer,
    findCustomer,
    findAndCountAllBill,
    submitAllBill,
    listlogsbycompanyguid
}