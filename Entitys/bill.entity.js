const { decimalALetras, dateFormat, obtenerHoraConFormato } = require('../utility');

module.exports = {
  ObjectBillDte(customer, elementBill, numeroDocumento) {
    const date = new Date();
    const dte = {};
    // const codGenerate = generateRandomCodeWithPattern('^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$');
    //const numeroControlDTE = GenerateCorrelativoDTE(customer.nrc, 2);
    //const numeroCodigoGeneracion = GenerateCodigo();
    const baseMont = Number(elementBill.Base.toFixed(2));
    const ivaMont = Number(elementBill.SV.toFixed(2));
    const montoTotalStr = (baseMont + ivaMont).toFixed(2);
    const montoTotal = Number((baseMont + ivaMont).toFixed(2));
    //const montoTotal = elementBill.Base.toFixed(2);// (elementBill.Base + elementBill.SV).toFixed(2);
    //console.log('Fecha-->'+0+date.toLocaleTimeString().split(' ')[0]);
    console.log('HORA DEL SISTEMA:: -->'+obtenerHoraConFormato());
    // Identificacion
    dte.identificacion = {
      version: 1,
      ambiente: '00',
      tipoDte: '01',
      numeroControl: elementBill.NumeroControl, //numeroControl(),
      codigoGeneracion: elementBill.CodigoGeneracion, //codigoGeneracion() ,
      tipoModelo: 1,
      tipoOperacion: 1,
      fecEmi: dateFormat(date),
      horEmi: obtenerHoraConFormato(date),//date.toLocaleTimeString(),
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
        departamento: customer.departamento,
        municipio: customer.municipio,
        complemento: customer.complemento
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
      tipoDocumento: '36',
      numDocumento: '014783212',
      nrc: null,
      nombre: elementBill.FirstName + " " + elementBill.LastName,
      codActividad: null,
      descActividad: null,
      telefono: '22700227',
      correo: 'ralux.zepeda@gmail.com',
      direccion: null,
    };


    dte.otrosDocumentos = null;

    // Venta tercero
    dte.ventaTercero = null;

    // Cuerpo documento
    dte.cuerpoDocumento =
      [{
        numItem: 1,
        tipoItem: 1,
        numeroDocumento: null,
        cantidad: 1,
        codigo: elementBill.RecLoc,
        codTributo: null,
        uniMedida: 99,
        descripcion: 'Ruta ' + elementBill.SegmentOrigin + '/' + elementBill.SegmentDest,
        precioUni: montoTotal,
        montoDescu: 0,
        ventaGravada: montoTotal,
        ventaNoSuj: 0,
        ventaExenta: 0,
        tributos: null,
        psv: 0,
        noGravado: 0,
        ivaItem: ivaMont,
      }];


    // Resumen
    dte.resumen = {
      totalNoSuj: 0,
      totalExenta: 0,
      totalGravada: montoTotal,
      subTotalVentas: montoTotal,
      descuNoSuj: 0,
      descuExenta: 0,
      descuGravada: 0,
      porcentajeDescuento: 0,
      totalDescu: 0,
      tributos: [],
      subTotal: montoTotal,
      ivaRete1: 0.00,//elementBill.SV,
      reteRenta: 0,
      montoTotalOperacion: montoTotal,
      totalNoGravado: 0,
      totalPagar: montoTotal,
      totalLetras: decimalALetras(parseFloat(montoTotalStr)).toUpperCase(), //funcion convierte a letras
      saldoFavor: 0,
      totalIva: ivaMont,
      condicionOperacion: 1,
      pagos: [{
        codigo: '01',
        montoPago: montoTotal,
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
