const { numeroALetrasConDecimales } = require('../utility');
module.exports = {
  ObjectBillDte(customer, elementBill) {
  
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
      tipoDocumento: 13,
      numDocumento: null,
      nrc: null,
      nombre: elementBill.FirstName + " " + elementBill.LastName,
      codActividad: null,
      descActividad: null,
      telefono: null,
      correo: null,
      direccion: null,
    };

    /*
     customerguid: DataTypes.STRING,
    RecLoc: DataTypes.STRING,
    SegSeqNbr: DataTypes.INTEGER,
    NbrOfPax: DataTypes.INTEGER,
    ArcIata: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    BookingDate: DataTypes.DATE,
    FlightDate: DataTypes.DATE,
    SegmentOrigin: DataTypes.STRING,
    SegmentDest: DataTypes.STRING,
    Base: DataTypes.DOUBLE,
    CurrencyBase: DataTypes.STRING,
    SV: DataTypes.DOUBLE,
    Status: DataTypes.CHAR
    */
    // Otros documentos
    dte.otrosDocumentos = null;

    // Venta tercero
    dte.ventaTercero = null;

    // Cuerpo documento
    dte.cuerpoDocumento =
      [{
        numItem: 1,
        numeroDocumento: elementBill.RecLoc,
        tipoItem: 1,
        codigo: elementBill.RecLoc,
        codTributo: null,
        descripcion: elementBill.RecLoc,
        cantidad: 1,
        uniMedida: 59,
        precioUni: elementBill.Base,
        montoDescu: 0,
        ventaGravada: elementBill.Base,
        ventaNoSuj: 0,
        ventaExenta: 0,
        tributos: null,
        psv: 0,
        noGravado: 0,
        ivaItem: elementBill.SV,
      }];


    // Resumen
    dte.resumen = {
      totalNoSuj: 0,
      totalExenta: 0,
      totalGravada: elementBill.Base,
      subTotalVentas: elementBill.Base,
      descuNoSuj: 0,
      descuExenta: 0,
      descuGravada: 0,
      porcentajeDescuento: 0,
      totalDescu: 0,
      tributos: [],
      subTotal: elementBill.Base,
      ivaRete1: elementBill.SV,
      reteRenta: 0,
      montoTotalOperacion: elementBill.Base,
      totalNoGravado: 0,
      totalPagar: elementBill.Base,
      totalLetras: numeroALetrasConDecimales(elementBill.Base *-1), //funcion convierte a letras
      saldoFavor: 0,
      totalIva: elementBill.SV,
      condicionOperacion: 1,
      pagos: [{
        codigo: '03',
        montoPago: elementBill.Base,
        referencia: null,
        periodo: null,
        plazo: null
      }],
      numPagoElectronico: null,
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
