const { readExcel,readExcelByName } = require('./readExcel');
const { validateBillExist } = require('./formatDate');
const { numeroALetrasConDecimales,decimalALetras } = require('./convertAmountToText');
const { httpClient } = require('./httpClient');
const { dateFormat,obtenerHoraConFormato } = require('./formatDate');
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
    GenerateCodigo,
    decimalALetras,
    readExcelByName,
    obtenerHoraConFormato
}