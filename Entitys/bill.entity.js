module.exports = {
  crearBillDte(customer, elementBill) {

    const dte = {};

    // Identificacion
    dte.identificacion = {
      version: 1,
      ambiente: '00',
      tipoDte: '01',
      numeroControl: 1,
      codigoGeneracion: '13BF1073-8D3F-4FA1-9238-154E0E6029C8',
      tipoModelo: 1,
      tipoOperacion: 1,
      fecEmi: Date.now(),
      horEmi: Date.now(),
      tipoMoneda: 'USD',
      tipoContingencia: null,
      motivoContin: null,
    };

    // Emisor
    dte.emisor = {
      nit: customer.nit,
      nrc: customer.nrc,
      nombre: customer.nombre,
      codActividad: customer.codActividad,
      descActividad: customer.descActividad,
      nombreComercial: customer.nombreComercial,
      tipoEstablecimiento: customer.tipoEstablecimiento,
      direccion: customer.direccion,
      telefono: customer.telefono,
      correo: customer.correo,
      codEstableMH: customer.codEstableMH,
      codEstable: customer.codEstable,
      codPuntoVentaMH: customer.codPuntoVentaMH,
      codPuntoVenta: customer.codPuntoVenta,
    };

    // Receptor
    dte.receptor = {
      tipoDocumento: elementBill.tipoDocumento,
      numDocumento: elementBill.numDocumento,
      nrc: elementBill.nrc,
      nombre: elementBill.nombre,
      codActividad: elementBill.codActividad,
      descActividad: elementBill.descActividad,
      telefono: elementBill.telefono,
      correo: elementBill.correo,
      direccion: elementBill.direccion,
    };

    // Otros documentos
    dte.otrosDocumentos = null;

    // Venta tercero
    dte.ventaTercero = null;

    // Cuerpo documento
    dte.cuerpoDocumento =
      [{
        numItem: elementBill.numelementBill,
        numeroDocumento: elementBill.numeroDocumento,
        tipoItem: elementBill.tipoItem,
        codigo: elementBill.codigo,
        codTributo: elementBill.codTributo,
        descripcion: elementBill.descripcion,
        cantidad: elementBill.cantidad,
        uniMedida: elementBill.uniMedida,
        precioUni: elementBill.precioUni,
        montoDescu: elementBill.montoDescu,
        ventaGravada: elementBill.ventaGravada,
        ventaNoSuj: elementBill.ventaNoSuj,
        ventaExenta: elementBill.ventaExenta,
        tributos: elementBill.tributos,
        psv: elementBill.psv,
        noGravado: elementBill.noGravado,
        ivaItem: elementBill.ivaItem,
      }];


    // Resumen
    dte.resumen = {
      totalNoSuj: elementBill.totalNoSuj,
      totalExenta: elementBill.totalExenta,
      totalGravada: elementBill.totalGravada,
      subTotalVentas: elementBill.subTotalVentas,
      descuNoSuj: elementBill.descuNoSuj,
      descuExenta: elementBill.descuExenta,
      descuGravada: elementBill.descuGravada,
      porcentajeDescuento: elementBill.porcentajeDescuento,
      totalDescu: elementBill.totalDescu,
      tributos: elementBill.tributos,
      subTotal: elementBill.subTotal,
      ivaRete1: elementBill.ivaRete1,
      reteRenta: elementBill.reteRenta,
      montoTotalOperacion: elementBill.montoTotalOperacion,
      totalNoGravado: elementBill.totalNoGravado,
      totalPagar: elementBill.totalPagar,
      totalLetras: elementBill.totalLetras,
      saldoFavor: elementBill.saldoFavor,
      totalIva: elementBill.totalIva,
      condicionOperacion: elementBill.condicionOperacion,
      pagos: elementBill.pagos,
      numPagoElectronico: elementBill.numPagoElectronico,
    };

    // extension
    dte.extension = {
      nombEntrega: null,
      docuEntrega: null,
      nombRecibe: null,
      docuRecibe: null,
      observaciones: null,
      placaVehiculo: null,
    };

    return dte;
  },
}
