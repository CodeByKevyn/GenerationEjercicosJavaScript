// ===== Datos del negocio =====
const HORA_APERTURA = 7;
const HORA_CIERRE = 19;
const MINIMO_DESCUENTO = 30000;
const PORCENTAJE_DESCUENTO = 10;

const productos = [
    { id: 1, nombre: "Tinto campesino", descripcion: "Café filtrado en olla, suave y dulce.", precio: 3500 },
    { id: 2, nombre: "Capuchino de la casa", descripcion: "Espresso de Huila con leche texturizada.", precio: 8500 },
    { id: 3, nombre: "Filtrado de Nariño", descripcion: "Método V60, notas a panela y naranja.", precio: 9000 },
    { id: 4, nombre: "Pandebono recién horneado", descripcion: "Sale del horno cada hora.", precio: 4000 },
];

// ===== Reglas del negocio: reciben datos y devuelven un resultado =====
function estaAbierto(hora) {
    return hora >= HORA_APERTURA && hora < HORA_CIERRE;
}

function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function buscarProducto(id) {
    return productos.find((producto) => producto.id === id);
}

function resumirPedido(lineas) {
    const resumen = [];
    for (const linea of lineas) {
        resumen.push({ id: linea.producto.id, cantidad: linea.cantidad });
    }
    return resumen;
}

function reconstruirPedido(resumen) {
    const lineas = [];
    for (const item of resumen) {
        const producto = buscarProducto(item.id);
        if (producto && item.cantidad > 0) {
            lineas.push({ producto: producto, cantidad: item.cantidad });
        }
    }
    return lineas;
}

function calcularTotal(lineas) {
    let total = 0;
    for (const linea of lineas) {
        total += linea.producto.precio * linea.cantidad;
    }
    return total;
}

function calcularDescuento(subtotal) {
    if (subtotal >= MINIMO_DESCUENTO) {
        return subtotal * PORCENTAJE_DESCUENTO / 100;
    }
    return 0;
}

function calcularTotalAPagar(lineas) {
    const subtotal = calcularTotal(lineas);
    return subtotal - calcularDescuento(subtotal);
}

// ===== Para las pruebas: Node recibe las reglas; el navegador se salta este bloque =====
if (typeof module !== "undefined") {
    module.exports = {
        estaAbierto,
        formatearPrecio,
        buscarProducto,
        resumirPedido,
        reconstruirPedido,
        calcularTotal,
        calcularDescuento,
        calcularTotalAPagar,
    };
}