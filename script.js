let valorDisplay = '0';
        let valorOperacion = '';
        let operacionPendiente = null;
        let primerOperando = null;
        let esperandoSegundoOperando = false;
        
        const display = document.getElementById('display');
        const operacion = document.getElementById('operacion');
        
        function actualizarDisplay() {
            display.value = valorDisplay;
            operacion.value = valorOperacion;
        }
        
        function agregarNumero(numero) {
            if (esperandoSegundoOperando) {
                valorDisplay = numero;
                esperandoSegundoOperando = false;
            } else {
                valorDisplay = valorDisplay === '0' ? numero : valorDisplay + numero;
            }
            actualizarDisplay();
        }
        
        function agregarOperador(operador) {
            const valorEntrada = parseFloat(valorDisplay);
            if (primerOperando === null) {
                valorOperacion = valorDisplay + ' ' + operador + ' ';
                primerOperando = valorEntrada;
            } else if (operacionPendiente) {
                valorOperacion = primerOperando + ' ' + operador + ' ';
                const resultado = calcularOperacion(primerOperando, valorEntrada, operacionPendiente);
                valorDisplay = String(resultado);
                primerOperando = resultado;
            }
            esperandoSegundoOperando = true;
            operacionPendiente = operador;
            actualizarDisplay();
        }
        
        function calcular() {
            if (!operacionPendiente || esperandoSegundoOperando) {
                return;
            }
            const valorEntrada = parseFloat(valorDisplay);
            valorOperacion = primerOperando + ' ' + operacionPendiente + ' ' + valorEntrada + ' =';
            const resultado = calcularOperacion(primerOperando, valorEntrada, operacionPendiente);
            valorDisplay = String(resultado);
            operacionPendiente = null;
            primerOperando = resultado;
            esperandoSegundoOperando = true;
            actualizarDisplay();
        }
        
        function calcularOperacion(num1, num2, operacion) {
            switch (operacion) {
                case '+': return num1 + num2;
                case '-': return num1 - num2;
                case '*': return num1 * num2;
                case '/': return num2 !== 0 ? num1 / num2 : (alert('No se puede dividir por cero'), limpiar(), 0);
                default: return num2;
            }
        }
        
        function limpiar() {
            valorDisplay = '0';
            valorOperacion = '';
            primerOperando = null;
            operacionPendiente = null;
            esperandoSegundoOperando = false;
            actualizarDisplay();
        }
        
        actualizarDisplay();