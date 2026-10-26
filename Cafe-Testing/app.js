// ===== Datos del negocio =====
const HORA_APERTURA = 7;
const HORA_CIERRE = 19;

const productos = [
    { id: 1, nombre: "Tinto campesino", descripcion: "Café filtrado en olla, suave y dulce.", precio: 3500 },
    { id: 2, nombre: "Capuchino de la casa", descripcion: "Espresso de Huila con leche texturizada.", precio: 8500 },
    { id: 3, nombre: "Filtrado de Nariño", descripcion: "Método V60, notas a panela y naranja.", precio: 9000 },
    { id: 4, nombre: "Pandebono recién horneado", descripcion: "Sale del horno cada hora.", precio: 4000 },
];

// ===== Estado: lo que cambia mientras la persona usa la página =====
let pedido = [];
let favoritos = [];
let vistaActual = "todo";
let nombreCliente = "";

// ===== Lógica del negocio =====
function estaAbierto(hora) {
    return hora >= HORA_APERTURA && hora < HORA_CIERRE;
}

function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function buscarProducto(id) {
    return productos.find((producto) => producto.id === id);
}

function buscarLinea(id) {
    return pedido.find((linea) => linea.producto.id === id);
}

function agregarAlPedido(id) {
    const linea = buscarLinea(id);

    if (linea) {
        linea.cantidad++;
    } else {
        pedido.push({ producto: buscarProducto(id), cantidad: 1 });
    }
}

function quitarDelPedido(id) {
    pedido = pedido.filter((linea) => linea.producto.id !== id);
}

function restarDelPedido(id) {
    const linea = buscarLinea(id);
    linea.cantidad--;

    if (linea.cantidad === 0) {
        quitarDelPedido(id);
    }
}

function contarProductos() {
    let cantidad = 0;
    for (const linea of pedido) {
        cantidad += linea.cantidad;
    }
    return cantidad;
}

function calcularTotal() {
    let total = 0;
    for (const linea of pedido) {
        total += linea.producto.precio * linea.cantidad;
    }
    return total;
}

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter((favorito) => favorito !== id);
    } else {
        favoritos.push(id);
    }
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

// ===== Memoria del navegador: lo que sobrevive a la recarga =====
const CLAVE_PEDIDO = "cafe-origen-pedido";
const CLAVE_FAVORITOS = "cafe-origen-favoritos";
const CLAVE_VISTA = "cafe-origen-vista";
const CLAVE_NOMBRE = "cafe-origen-nombre";

function guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function leer(clave, valorPorDefecto) {
    const texto = localStorage.getItem(clave);

    if (texto === null) {
        return valorPorDefecto;
    }

    try {
        return JSON.parse(texto);
    } catch (error) {
        console.warn("Dato dañado en", clave, "· se usa el valor por defecto");
        return valorPorDefecto;
    }
}

function guardarEstado() {
    guardar(CLAVE_PEDIDO, resumirPedido(pedido));
    guardar(CLAVE_FAVORITOS, favoritos);
    guardar(CLAVE_NOMBRE, nombreCliente);
}

function cargarEstado() {
    pedido = reconstruirPedido(leer(CLAVE_PEDIDO, []));
    favoritos = leer(CLAVE_FAVORITOS, []).filter((id) => buscarProducto(id));
    vistaActual = sessionStorage.getItem(CLAVE_VISTA) || "todo";
    nombreCliente = leer(CLAVE_NOMBRE, "");
}

// ===== Elementos de la página =====
const menu = document.querySelector("#menu");
const listaPedido = document.querySelector("#lista-pedido");
const contadorPedido = document.querySelector("#contador-pedido");
const totalPedido = document.querySelector("#total-pedido");
const contadorFavoritos = document.querySelector("#contador-favoritos");
const botonVerTodo = document.querySelector("#ver-todo");
const botonVerFavoritos = document.querySelector("#ver-favoritos");
const botonVaciar = document.querySelector("#vaciar");
const botonConfirmar = document.querySelector("#confirmar");

// ===== Pintar: del estado a la pantalla =====
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
    let html = "";

    for (const producto of productos) {
        const esFavorito = favoritos.includes(producto.id);

        if (vistaActual === "favoritos" && !esFavorito) {
            continue;
        }

        html += `
            <li class="producto">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">${formatearPrecio(producto.precio)}</span>
                <button class="agregar" type="button" data-accion="agregar" data-id="${producto.id}">Agregar</button>
                <button class="favorito" type="button" data-accion="favorito" data-id="${producto.id}"
                    aria-pressed="${esFavorito}" aria-label="Favorito: ${producto.nombre}">${esFavorito ? "♥" : "♡"}</button>
            </li>`;
    }

    if (html === "") {
        html = `<li class="vacio">Aún no tienes favoritos. Toca ♡ en un producto para guardarlo aquí.</li>`;
    }

    menu.innerHTML = html;
    contadorFavoritos.textContent = favoritos.length;
    botonVerTodo.classList.toggle("activa", vistaActual === "todo");
    botonVerFavoritos.classList.toggle("activa", vistaActual === "favoritos");
}

function mostrarPedido() {
    let html = "";

    for (const linea of pedido) {
        html += `
            <li class="linea">
                <span class="linea-nombre">${linea.producto.nombre}</span>
                <span class="linea-subtotal">${formatearPrecio(linea.producto.precio * linea.cantidad)}</span>
                <span class="cantidad">
                    <button type="button" data-accion="restar" data-id="${linea.producto.id}" aria-label="Quitar uno">−</button>
                    <span>${linea.cantidad}</span>
                    <button type="button" data-accion="sumar" data-id="${linea.producto.id}" aria-label="Agregar uno">+</button>
                </span>
                <button class="quitar" type="button" data-accion="quitar" data-id="${linea.producto.id}">Quitar</button>
            </li>`;
    }

    if (pedido.length === 0) {
        html = `<li class="vacio">Tu pedido está vacío. Agrega algo de la carta.</li>`;
    }

    listaPedido.innerHTML = html;
    contadorPedido.textContent = contarProductos();
    totalPedido.textContent = formatearPrecio(calcularTotal());
}

// ===== Eventos: lo que pasa cuando la persona actúa =====
menu.addEventListener("click", function (evento) {
    const accion = evento.target.dataset.accion;
    const id = Number(evento.target.dataset.id);

    if (accion === "agregar") {
        agregarAlPedido(id);
        mostrarPedido();
        console.log("Pedido:", pedido);
    }

    if (accion === "favorito") {
        alternarFavorito(id);
        mostrarCarta();
        console.log("Favoritos:", favoritos);
    }

    guardarEstado();
});

listaPedido.addEventListener("click", function (evento) {
    const accion = evento.target.dataset.accion;
    const id = Number(evento.target.dataset.id);

    if (accion === "sumar") {
        agregarAlPedido(id);
    }
    if (accion === "restar") {
        restarDelPedido(id);
    }
    if (accion === "quitar") {
        quitarDelPedido(id);
    }

    guardarEstado();
    mostrarPedido();
});

botonVaciar.addEventListener("click", function () {
    if (pedido.length === 0) {
        return;
    }

    const seguro = confirm("¿Seguro que quieres vaciar tu pedido?");

    if (seguro) {
        pedido = [];
        guardarEstado();
        mostrarPedido();
    }
});

botonConfirmar.addEventListener("click", function () {
    if (pedido.length === 0) {
        alert("Tu pedido está vacío. Agrega algo de la carta.");
        return;
    }

    if (!estaAbierto(new Date().getHours())) {
        alert("Ahora estamos cerrados. Recibimos pedidos de 7:00 a. m. a 7:00 p. m.");
        return;
    }

    const nombre = prompt("¿A nombre de quién va el pedido?", nombreCliente);

    if (nombre === null) {
        return;
    }

    if (nombre.trim() === "") {
        alert("Necesitamos un nombre para llamarte cuando esté listo.");
        return;
    }

    nombreCliente = nombre.trim();

    alert(`¡Gracias, ${nombreCliente}!\nProductos: ${contarProductos()}\nTotal: ${formatearPrecio(calcularTotal())}\nTe llamamos por tu nombre cuando esté listo.`);
    console.log("Pedido confirmado:", nombreCliente, pedido);

    pedido = [];
    guardarEstado();
    mostrarPedido();
});

botonVerTodo.addEventListener("click", function () {
    vistaActual = "todo";
    sessionStorage.setItem(CLAVE_VISTA, vistaActual);
    mostrarCarta();
});

botonVerFavoritos.addEventListener("click", function () {
    vistaActual = "favoritos";
    sessionStorage.setItem(CLAVE_VISTA, vistaActual);
    mostrarCarta();
});

// ===== Arranque =====
cargarEstado();
mostrarEstado();
mostrarCarta();
mostrarPedido();