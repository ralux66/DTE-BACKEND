const GenerateCorrelativoDTE = (NRCemisor, ultimoBloque) => {
    // Obtenemos la longitud del ultimo bloque
    const longitud = String('000000000000000').length - String(ultimoBloque).length


    const patron = '00000000'
    const rellenoNit = String(patron).length - String(NRCemisor).length;

    // Creamos un arreglo con ceros hasta la longitud del ultimo bloque
    const relleno = Array(longitud).fill(0);
    const rellenoNITemisor = Array(rellenoNit).fill(0);

    // Concatenamos el arreglo de ceros con el ultimo bloque
    const codigoDTE = relleno.join("") + ultimoBloque;
    const nrcEMISOR = rellenoNITemisor.join("") + NRCemisor;
    // Devolvemos el codigo DTE
    //console.log('DTE-01-' + nrcEMISOR + '-' + codigoDTE);
    return 'DTE-01-' + nrcEMISOR + '-' + codigoDTE;
}

const GenerateCodigo = () => {

    const caracteres = '0123456789ABCDEF';
    let numeroGenerado = '';

    for (let i = 0; i < 36; i++) {
        // Insertar guiones en posiciones específicas
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            numeroGenerado += '-';
        } else {
            // Generar un carácter aleatorio
            numeroGenerado += caracteres[Math.floor(Math.random() * 16)];
        }
    }
    //console.log(numeroGenerado);
    return numeroGenerado;
}

const GenerateCodigoR= () =>{
    const caracteres = 'ABCDEF0123456789';
    let codigo = '';

    // Generar las diferentes partes del código
    const partes = [8, 4, 4, 4, 12];
    for (let i = 0; i < partes.length; i++) {
        for (let j = 0; j < partes[i]; j++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        if (i < partes.length - 1) {
            codigo += '-';
        }
    }

    return codigo;
}


module.exports = {
    GenerateCorrelativoDTE,
    GenerateCodigo,
    GenerateCodigoR
}
