const generarCodigoControlnumeroControl = ()=> {
    // Se verifica que el patrón sea válido.

    /*   if (!patron.match(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/)) {
        throw new Error("El patrón de caracteres no es válido.");
      } */

    // Se genera el código de control.

    let codigoControl = codigoGeneracion();

    // Si el código de control tiene más de 36 caracteres, se genera un nuevo código de control.

    while (codigoControl.length > 31) {
        codigoControl = codigoGeneracion();
    }

    return codigoControl;
}

const generarCodigoControlcodigoGeneracion =()=> {
    // Se verifica que el patrón sea válido.

    /*   if (!patron.match(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/)) {
        throw new Error("El patrón de caracteres no es válido.");
      } */

    // Se genera el código de control.

    let codigoControl = codigoGeneracion();

    // Si el código de control tiene más de 36 caracteres, se genera un nuevo código de control.

    while (codigoControl.length > 31) {
        codigoControl = codigoGeneracion();
    }

    return codigoControl;
}



const numeroControl = () => {
    // Se verifica que el patrón sea válido.

    /* if (!patron.match(/^DTE-01-[A-Z0-9]{8}-[0-9]{15}$/)) {
        throw new Error("El patrón de caracteres no es válido.");
    } */

    // Se generan los primeros 8 caracteres del código de control, que son alfanuméricos.

    const caracteresAlfanumericos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codigoAlfanumerico = caracteresAlfanumericos.substring(0, 8).split("").map(
        (c) => Math.floor(Math.random() * caracteresAlfanumericos.length)
    ).join("");

    // Se generan los últimos 15 caracteres del código de control, que son numéricos.

    const codigoNumerico = Math.floor(Math.random() * 999999999999);

    // Se concatenan los dos grupos de caracteres para formar el código de control completo.

    const codigoControl = `DTE-01-${codigoAlfanumerico}-${codigoNumerico}`;

    return codigoControl;
}

const codigoGeneracion = () => {
    // Se verifica que el patrón sea válido.
    /* 
      if (!patron.match(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/)) {
        throw new Error("El patrón de caracteres no es válido.");
      }
     */
    // Se generan los primeros 8 caracteres del código de control, que son alfanuméricos.

    const caracteresHexadecimales = "0123456789ABCDEF";
    const codigoHexadecimal = caracteresHexadecimales.substring(0, 8).split("").map(
        (c) => Math.floor(Math.random() * caracteresHexadecimales.length)
    ).join("");

    // Se generan los últimos 12 caracteres del código de control, que son numéricos.

    const codigoNumerico = Math.floor(Math.random() * 999999999999);

    // Se concatenan los dos grupos de caracteres para formar el código de control completo.

    const codigoControl = `${codigoHexadecimal}-${codigoNumerico}`;

    return codigoControl;
}

module.exports = {
    generarCodigoControlcodigoGeneracion,
    codigoGeneracion
}
