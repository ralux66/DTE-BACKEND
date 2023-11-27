 


const numeroALetrasConDecimales = (numero) =>
 {
    // Validamos que el número sea un número entero
    /* if (!Number.isInteger(numero)) {
        throw new Error("El número debe ser un número entero");
    } */

    // Convertimos el número a una cadena de texto
    numero = typeof numero == 'string' ? numero : numero.toString();

    // Dividimos el número en dos partes: la parte entera y la parte decimal
    const [parteEntera, parteDecimal] = numero.split(".");

    // Convertimos la parte entera a letras
    const textoEntero = numeroALetras(parteEntera);

    // Convertimos la parte decimal a letras
    const textoDecimal = numeroALetrasDecimal(parteDecimal);

    // Devolvemos la cadena de texto con el número en letras
    return `${textoEntero} CON ${textoDecimal}`;
}

// Función para convertir la parte decimal a letras
function numeroALetrasDecimal(parteDecimal) {
    // Convertimos la parte decimal a un número flotante
    const numeroDecimal = parseFloat(parteDecimal);

    // Si el número decimal es cero, devolvemos la cadena de texto "cero"
    if (numeroDecimal === 0) {
        return "cero";
    }

    // Creamos una matriz con las palabras para los números del 0 al 9
    const palabras = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];

    // Inicializamos la cadena de texto con el número de unidades
    let texto = palabras[numeroDecimal % 10];

    // Si el número decimal tiene una parte decimal no nula, la agregamos a la cadena de texto
    if (numeroDecimal - Math.floor(numeroDecimal) !== 0) {
        texto = texto + " con " + palabras[Math.floor(numeroDecimal * 100) % 100] + "/100";
    }

    return texto;
}

function numeroALetras(numero) {
    // Validamos que el número sea un número entero
    /* if (!Number.isInteger(numero)) {
        throw new Error("El número debe ser un número entero");
    } */

    // Convertimos el número a una cadena de texto
    numero = typeof numero == 'string' ? numero : numero.toString();

    // Creamos una matriz con las palabras para los números del 0 al 9
    const palabras = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];

    // Creamos una matriz con las palabras para los números del 10 al 99
    const decenas = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];

    // Creamos una matriz con las palabras para los números del 20 al 99
    const centenas = ["veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];

    // Creamos una matriz con las palabras para los números del 100 al 999
    const centenasDeUnidades = ["cien", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

    // Creamos una matriz con las palabras para los números del 1000 al 999999
    const miles = ["mil", "millón", "billón", "trillón", "cuatrillón", "quintillón", "sextillón", "septillón", "octillón", "nonillón"];

    // Inicializamos la cadena de texto con el número de unidades
    let texto = palabras[numero % 10];

    // Si el número tiene decenas, las agregamos a la cadena de texto
    if (numero >= 10) {
        texto = decenas[Math.floor(numero / 10) % 10] + " " + texto;
    }

    // Si el número tiene centenas, las agregamos a la cadena de texto
    if (numero >= 100) {
        texto = centenas[Math.floor(numero / 100) % 10] + " " + texto;
    }

    // Si el número tiene miles, las agregamos a la cadena de texto
    if (numero >= 1000) {
        texto = centenasDeUnidades[Math.floor(numero / 1000) % 10] + " " + texto;

        // Si el número es mayor que 999, agregamos el nombre del millón
        if (numero >= 1000000) {
            texto = miles[0] + " " + texto;
        }
    }

    return texto;
}


module.exports ={
    numeroALetrasConDecimales,
  }