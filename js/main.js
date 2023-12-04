
document.getElementById("Calculo").addEventListener("click", function () {

    // Obtenemos los valores de los campos de entrada variables
    var Monto = parseFloat(document.getElementById("Monto").value);
    var Interes = parseFloat(document.getElementById("Interes").value) / 100; // Convertimos el interés a decimal
    var Meses = parseInt(document.getElementById("Meses").value);

    // Verificamos que los valores sean válidos
    if ([Monto, Interes, Meses].some(isNaN) || [Monto, Interes, Meses].some((valor) => valor <= 0)) {
        mostrarAlerta("Completar todos los campos");
        return;
    }

    // Limpiamos la alerta de resultados anteriores
    limpiarAlertaResultado();

    // Calculamos la cuota del préstamo
    var cuota = calcularCuotaPrestamo(Monto, Interes, Meses);

    // Calculamos el total de intereses pagados
    var totalInteresPagado = cuota * Meses - Monto;

    // Mostramos los resultados en la alerta de Bootstrap
    var resultadoElement = document.getElementById("Resultado");
    resultadoElement.innerHTML =
        `<strong>Cuota mensual estimada:</strong> $${cuota.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br>` +
        `<strong>Total dei interes pagado:</strong> $${totalInteresPagado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    // Mostramos la alerta de Bootstrap
    resultadoElement.classList.add("alert-primary");
    resultadoElement.style.display = "block";
});

// Función para calcular la cuota del préstamo
function calcularCuotaPrestamo(Monto, Interes, Meses) {
    var TasaMensual = Interes / 12;
    var cuota = (Monto * TasaMensual) / (1 - Math.pow(1 + TasaMensual, -Meses));
    return cuota;
}

// Función para mostrar una alerta de Bootstrap
function mostrarAlerta(mensaje) {
    // Limpiamos la alerta de resultados anteriores
    limpiarAlertaResultado();

    var resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = mensaje;
    resultadoElement.classList.add("alert-danger");
    resultadoElement.style.display = "block";
}

// Función para limpiar la alerta de resultados
function limpiarAlertaResultado() {
    var resultadoElement = document.getElementById("Resultado");
    resultadoElement.innerHTML = "";
    resultadoElement.classList.remove("alert-primary");
    resultadoElement.style.display = "none";
}
