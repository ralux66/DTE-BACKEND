const dteFacturaAnular = (customer,elementBill, dateFormat, obtenerHoraConFormato, GenerateCodigoR) => {
  let dte = {};
  const date = new Date();
  const baseMont = Number(elementBill.Base.toFixed(2));
  const ivaMont = Number(elementBill.SV.toFixed(2));
  const montoTotalStr = (baseMont + ivaMont).toFixed(2);
  const montoTotal = Number((baseMont + ivaMont).toFixed(2));

  // Identificacion
  dte.identificacion = {
    version: 2,
    ambiente: process.env.AMBIENTE_SYS,
    codigoGeneracion: elementBill.CodigoGeneracion, //codigoGeneracion() ,   
    fecAnula: dateFormat(date),
    horAnula: obtenerHoraConFormato(date),//date.toLocaleTimeString(), 
  };

  // Emisor
  dte.emisor = {
    nit: customer.nit,
    nombre: customer.nombreComercial,
    tipoEstablecimiento: customer.tipoEstablecimiento,
    nomEstablecimiento: customer.nombreComercial,
    codEstableMH: customer.codEstableMH,
    codEstable: customer.codEstable,
    codPuntoVentaMH: customer.codPuntoVentaMH,
    codPuntoVenta: customer.codPuntoVenta,
    telefono: customer.telefono,
    correo: customer.correo,
  };

  // Cuerpo documento
  dte.documento = {
    tipoDte: '01', //FACTURA
    codigoGeneracion: elementBill.CodigoGeneracion, 
    selloRecibido: elementBill.selloRecibido,
    numeroControl: elementBill.NumeroControl,
    fecEmi: dateFormat(elementBill.SubmitDte),
    montoIva: ivaMont,
    codigoGeneracionR: null,//elementBill.CodigoGeneracion,//GenerateCodigoR(),
    tipoDocumento: '36', //nit
    numDocumento: '014783212',
    nombre: elementBill.FirstName + " " + elementBill.LastName,
    telefono: null,
    correo: null,
  };

  // motivo
  dte.motivo = {
    tipoAnulacion: 2,
    motivoAnulacion: 'Anulacion factura: '+elementBill.NumeroControl,
    nombreResponsable: customer.nombreComercial,
    tipDocResponsable: '36', //nit 
    numDocResponsable: '014783212',
    nombreSolicita: customer.nombre,
    tipDocSolicita: '36',//nit
    numDocSolicita: customer.nit,
  };
  return dte;
};

module.exports = {
  dteFacturaAnular
}
