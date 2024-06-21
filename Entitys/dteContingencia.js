const dteContingencia = (customer, elementBill, dateFormat, obtenerHoraConFormato) => {
  let dte = {};
  const date = new Date();
  const baseMont = Number(elementBill.Base.toFixed(2));
  const ivaMont = Number(elementBill.SV.toFixed(2));
  const montoTotalStr = (baseMont + ivaMont).toFixed(2);
  const montoTotal = Number((baseMont + ivaMont).toFixed(2));

  // Identificacion
  dte.identificacion = {
    version: 3,
    ambiente: process.env.AMBIENTE_SYS,
    codigoGeneracion: elementBill.CodigoGeneracion, //codigoGeneracion() ,   
    fTransmision: dateFormat(date),
    hTransmision: obtenerHoraConFormato(date),//date.toLocaleTimeString(), 
  };

  // Emisor
  dte.emisor = {
    nit: customer.nit,
    nombre: customer.nombreComercial,
    
    tipoDocResponsable: '36',
    numeroDocResponsable: '014783212',
    nombreResponsable:customer.nombreComercial,
    tipoEstablecimiento: customer.tipoEstablecimiento,
    codEstableMH: customer.codEstableMH,   
    codPuntoVenta: customer.codPuntoVenta,
    telefono: customer.telefono,
    correo: customer.correo,
  };

  // Cuerpo documento
  dte.detalleDTE = [{
    noItem: 1,
    codigoGeneracion: elementBill.CodigoGeneracion,
    tipoDoc: '01' //Factura  
  }];

  // motivo
  dte.motivo = {
    fInicio: dateFormat(date),
    fFin: dateFormat(date),
    hInicio: obtenerHoraConFormato(date),
    hFin: obtenerHoraConFormato(date),
    tipoContingencia: 2, //No disponibilidad de sistema del emisor
    motivoContingencia: 'Contingencia de factura :' + elementBill.NumeroControl,
  };
  return dte;
};

module.exports = {
  dteContingencia
}
