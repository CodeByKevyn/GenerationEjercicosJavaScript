// ===== Datos del negocio =====
const HORA_APERTURA = 7;
const HORA_CIERRE = 19;

const productos = [
    { nombre: "Tinto campesino", descripcion: "Café filtrado en olla, suave y dulce.", precio: 3500 },
    { nombre: "Capuchino de la casa", descripcion: "Espresso de Huila con leche texturizada.", precio: 8500 },
    { nombre: "Filtrado de Nariño", descripcion: "Método V60, notas a panela y naranja.", precio: 9000 },
    { nombre: "Pandebono recién horneado", descripcion: "Sale del horno cada hora.", precio: 4000 },
];

// ===== Lógica del negocio =====
function estaAbierto(hora) {
    return hora >= HORA_APERTURA && hora < HORA_CIERRE;
}

function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

// ===== Conexión con la página (DOM) =====
function mostrarEstado() {
    const estado = document.querySelector("#estado");
    const horaActual = new Date().getHours();

    if (estaAbierto(horaActual)) {
        estado.textContent = "Abierto ahora. Cerramos a las 7:00 p. m.";
        estado.classList.add("abierto");
    } else {
        estado.textContent = "Cerrado. Abrimos a las 7:00 a. m.";
        estado.classList.add("cerrado");
    }
}

function mostrarCarta() {
    const menu = document.querySelector("#menu");
    let html = "";

    for (const producto of productos) {
        html += `
            <li class="producto">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">${formatearPrecio(producto.precio)}</span>
            </li>`;
    }

    menu.innerHTML = html;
}

mostrarEstado();
mostrarCarta();