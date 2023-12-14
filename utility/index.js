const { readExcel } = require('./readExcel');
const { validateBillExist } = require('./formatDate');
const { numeroALetrasConDecimales } = require('./convertAmountToText');
const { httpClient } = require('./httpClient');
const { dateFormat } = require('./formatDate');
const { v4: uuid } = require('uuid');
const { GenerateCorrelativoDTE,GenerateCodigo } = require('./generateCodeWithPattern');

module.exports = {
    readExcel,
    validateBillExist,
    numeroALetrasConDecimales,
    httpClient,
    dateFormat,
    uuid,
    GenerateCorrelativoDTE,
    GenerateCodigo
}