const { dteFactura, dteCreditoFiscal, dteFacturaAnular } = require('../Entitys');


module.exports = {
    ObjectBillDte(customer, elementBill, typeProcess, dateFormat, obtenerHoraConFormato, decimalALetras) {

        let dte = {};
        switch (typeProcess) {
            case 'Factura':
                dte = dteFactura(elementBill, customer, dateFormat, obtenerHoraConFormato, decimalALetras);
                break;
             case 'CreditoFiscal':
                 dte = dteCreditoFiscal(elementBill, customer, dateFormat, obtenerHoraConFormato, decimalALetras);
                 break;
             case 'Anuarl':
                 dte = dteFacturaAnular(customer,elementBill, dateFormat, obtenerHoraConFormato, decimalALetras);
                 break;
            default:
                break;
        }
        return dte;
    },
}