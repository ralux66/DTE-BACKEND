const { numeroALetrasConDecimales, uuid, dateFormat } = require('../utility');
module.exports = {
  ObjectBillDte(customer, elementBill) {
    const date = new Date();
    const dte = {};

    // Identificacion
    dte.identificacion = {
      version: 1,
      ambiente: '00',
      tipoDte: '01',
      numeroControl: 'DTE-' + elementBill.RecLoc + uuid(),
      codigoGeneracion: 'DTE-' +uuid(),
      tipoModelo: 1,
      tipoOperacion: 1,
      fecEmi: dateFormat(date),
      horEmi: date.toLocaleTimeString(),
      tipoMoneda: 'USD',
      tipoContingencia: null,
      motivoContin: null,
    };

    dte.documentoRelacionado = null;

    // Emisor
    dte.emisor = {
      nit: customer.nit,
      nrc: customer.nrc,
      nombre: customer.nombre,
      codActividad: customer.codActividad,
      descActividad: customer.descActividad,
      nombreComercial: customer.nombreComercial,
      tipoEstablecimiento: customer.tipoEstablecimiento,
      direccion: {
        'departamento': '06',
        'municipio': '14',
        'complemento': 'Calle El Mirador Entre 87 y 89 Av. Nte. Col. Escalón Edif. Quatro, Niveles 11 y 12 San Salvador'
      },
      telefono: customer.telefono,
      correo: customer.correo,
      codEstableMH: customer.codEstableMH,
      codEstable: customer.codEstable,
      codPuntoVentaMH: customer.codPuntoVentaMH,
      codPuntoVenta: customer.codPuntoVenta,
    };

    // Receptor
    dte.receptor = {
      tipoDocumento: '01',
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
      totalLetras: numeroALetrasConDecimales(elementBill.Base), //funcion convierte a letras
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

    dte.apendice = null;
    dte.ventaTercero = null;
    dte.otrosDocumentos = null;

    return dte;
  },
}
