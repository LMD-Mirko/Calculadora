let valorPantalla = '0';
let operacionEnCurso = '';
let operacionActual = null;
let primerNumero = null;
let esperandoSegundoNumero = false;
let operadorPresionado = false;
let numResultado = false;

const pantalla = document.getElementById('pantalla');
const operacion = document.getElementById('operacion');

function actualizarPantalla() {
    pantalla.value = valorPantalla;
    operacion.value = operacionEnCurso;
}

function agregarNumero(numero) {
    if (numResultado) {
        valorPantalla = numero;
        operacionEnCurso = '';
        primerNumero = null;
        operacionActual = null;
        esperandoSegundoNumero = false;
        numResultado = false;
    } else if (esperandoSegundoNumero) {
        valorPantalla = numero;
        esperandoSegundoNumero = false;
    } else {
        valorPantalla = valorPantalla === '0' ? numero : valorPantalla + numero;
    }
    operadorPresionado = false;
    actualizarPantalla();
}

function agregarOperador(operador) {
    if (operadorPresionado) return;
    const numeroEntrada = parseFloat(valorPantalla);
    if (primerNumero === null) {
        primerNumero = numeroEntrada;
    } else if (operacionActual) {
        primerNumero = realizarOperacion(primerNumero, numeroEntrada, operacionActual);
        valorPantalla = String(primerNumero);
    }
    operacionEnCurso = valorPantalla + ' ' + operador;
    operacionActual = operador;
    esperandoSegundoNumero = true;
    operadorPresionado = true;
    numResultado = false;
    actualizarPantalla();
}

function calcular() {
    if (!operacionActual || esperandoSegundoNumero) return;
    const numeroEntrada = parseFloat(valorPantalla);
    operacionEnCurso += ' ' + numeroEntrada + ' =';
    valorPantalla = String(realizarOperacion(primerNumero, numeroEntrada, operacionActual));
    primerNumero = parseFloat(valorPantalla);
    operacionActual = null;
    esperandoSegundoNumero = true;
    numResultado = true;
    actualizarPantalla();
}

function realizarOperacion(num1, num2, operacion) {
    switch (operacion) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': 
            if (num2 === 0) {
                alert('No se puede dividir por cero');
                limpiar();
                return 0;
            }
            return num1 / num2;
        default: return num2;
    }
}

function limpiar() {
    valorPantalla = '0';
    operacionEnCurso = '';
    primerNumero = null;
    operacionActual = null;
    esperandoSegundoNumero = false;
    operadorPresionado = false;
    numResultado = false;
    actualizarPantalla();
}

function borrar() {
    if (esperandoSegundoNumero) return;
    valorPantalla = valorPantalla.length > 1 ? valorPantalla.slice(0, -1) : '0';
    actualizarPantalla();
}

actualizarPantalla();