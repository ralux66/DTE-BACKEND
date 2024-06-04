

const dateFormat = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};

const obtenerHoraConFormato = (fecha)=> {
    // Obtener la hora actual
    //var fecha = date;
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    // Agregar ceros a la izquierda si es necesario
    if (hora < 10) hora = '0' + hora;
    if (minutos < 10) minutos = '0' + minutos;
    if (segundos < 10) segundos = '0' + segundos;

    // Crear la cadena de hora con el formato especificado
    var horaConFormato = hora + ':' + minutos + ':' + segundos;

    return horaConFormato;
}


module.exports = {
    dateFormat,
    obtenerHoraConFormato
}


