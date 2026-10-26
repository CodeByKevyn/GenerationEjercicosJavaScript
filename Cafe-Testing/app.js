// Los datos y las reglas del negocio están en negocio.js: index.html lo carga antes que este archivo.

// ===== Estado: lo que cambia mientras la persona usa la página =====
let pedido = [];
let favoritos = [];
let vistaActual = "todo";
let nombreCliente = "";
let ultimoPedido = [];

// ===== Acciones sobre el estado: cambian el pedido y los favoritos =====
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

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter((favorito) => favorito !== id);
    } else {
        favoritos.push(id);
    }
}

// ===== Memoria del navegador: lo que sobrevive a la recarga =====
const CLAVE_PEDIDO = "cafe-origen-pedido";
const CLAVE_FAVORITOS = "cafe-origen-favoritos";
const CLAVE_VISTA = "cafe-origen-vista";
const CLAVE_NOMBRE = "cafe-origen-nombre";
const CLAVE_ULTIMO_PEDIDO = "cafe-origen-ultimo-pedido";

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
    guardar(CLAVE_ULTIMO_PEDIDO, ultimoPedido);
}

function cargarEstado() {
    pedido = reconstruirPedido(leer(CLAVE_PEDIDO, []));
    favoritos = leer(CLAVE_FAVORITOS, []).filter((id) => buscarProducto(id));
    vistaActual = sessionStorage.getItem(CLAVE_VISTA) || "todo";
    nombreCliente = leer(CLAVE_NOMBRE, "");
    ultimoPedido = leer(CLAVE_ULTIMO_PEDIDO, []);
}

// ===== Elementos de la página =====
const menu = document.querySelector("#menu");
const listaPedido = document.querySelector("#lista-pedido");
const contadorPedido = document.querySelector("#contador-pedido");
const totalPedido = document.querySelector("#total-pedido");
const descuentoPedido = document.querySelector("#descuento-pedido");
const contadorFavoritos = document.querySelector("#contador-favoritos");
const botonVerTodo = document.querySelector("#ver-todo");
const botonVerFavoritos = document.querySelector("#ver-favoritos");
const botonRepetir = document.querySelector("#repetir");
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
    descuentoPedido.textContent = formatearPrecio(calcularDescuento(calcularTotal(pedido)));
    totalPedido.textContent = formatearPrecio(calcularTotalAPagar(pedido));
    botonRepetir.hidden = ultimoPedido.length === 0;
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
    ultimoPedido = resumirPedido(pedido);

    alert(`¡Gracias, ${nombreCliente}!\nProductos: ${contarProductos()}\nTotal: ${formatearPrecio(calcularTotalAPagar(pedido))}\nTe llamamos por tu nombre cuando esté listo.`);
    console.log("Pedido confirmado:", nombreCliente, pedido);

    pedido = [];
    guardarEstado();
    mostrarPedido();
});

botonRepetir.addEventListener("click", function () {
    if (pedido.length > 0) {
        const reemplazar = confirm("Tu último pedido va a reemplazar lo que tienes ahora en Mi pedido. ¿Continuamos?");

        if (!reemplazar) {
            return;
        }
    }

    pedido = reconstruirPedido(ultimoPedido);
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