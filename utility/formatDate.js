
const moment = require('moment-timezone');


const dateFormat = (date) => {
    //let partes = date.split('/');
    //var dec = moment(date).getHours();

    var d = moment.tz(date, 'YYYY-MM-DD', 'America/Mexico_City').format('YYYY-MM-DD');//new Date(date),

     /*    month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
 */
    //return [year, month, day].join('-');
    return d;
};

const obtenerHoraConFormato = (date) => {
    var dec = moment(date);

    var fecha = moment.tz(date, 'YYYY-MM-DD', 'America/Mexico_City').format('HH:mm:ss');
    // Obtener la hora actual
    //var fecha = date;
  /*   var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    // Agregar ceros a la izquierda si es necesario
    if (hora < 10) hora = '0' + hora;
    if (minutos < 10) minutos = '0' + minutos;
    if (segundos < 10) segundos = '0' + segundos; */

    // Crear la cadena de hora con el formato especificado
    //var horaConFormato = hora + ':' + minutos + ':' + segundos;
    var horaConFormato = fecha;

    return horaConFormato;
}


module.exports = {
    dateFormat,
    obtenerHoraConFormato
}


