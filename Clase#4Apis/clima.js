// ===================================================================
// ❌ CASO 1: SIN ESPERAR LA RESPUESTA (Promesa Pendiente)
// ===================================================================
// fetch() realiza una petición HTTP que tarda un tiempo en viajar por internet.
// En lugar de detener todo el programa, fetch() devuelve Inmediatamente una 'Promesa'.
// Como console.log() se ejecuta antes de que el servidor responda,
// la promesa aún no tiene datos y su estado es 'pending' (pendiente).

const respuesta = fetch("https://api.open-meteo.com/v1/forecast?latitude=4.6&longitude=-74.1&current=temperature_2m");
console.log(respuesta); // Imprime: Promise { <pending> }


// ===================================================================
// ✅ CASO 2: CON ASYNCRONÍA (async / await) - FORMA CORRECTA
// ===================================================================
// 'async' declara que la función va a realizar tareas que toman tiempo.
async function obtenerClima() {
  
  // 1er 'await': Pausa la función hasta que el servidor de la API responda.
  // Convierte la Promesa en un objeto de respuesta HTTP (Response).
  const respuesta = await fetch("https://api.open-meteo.com/v1/forecast?latitude=4.6&longitude=-74.1&current=temperature_2m");
  
  // 2do 'await': Convertir el cuerpo de la respuesta a JSON TAMBIÉN toma tiempo.
  // .json() devuelve otra promesa, por lo que necesita su propio 'await'.
  const datos = await respuesta.json();
  
  // Ahora sí tenemos el objeto con los datos reales listos para usar.
  console.log("Clima obtenido con éxito:", datos);
}

// Llamada a la función asíncrona
obtenerClima();

// ===================================================================
// ✅ CASO 3: CÓDIGO PROFESIONAL (Con validación de estado HTTP)
// ===================================================================
// 'async' declara que la función sabe esperar tareas asíncronas.
async function obtenerClima() {
  
  // 1. Hacemos la petición a la red y esperamos la respuesta del servidor.
  const respuesta = await fetch("https://api.open-meteo.com/v1/forecast?latitude=4.6&longitude=-74.1&current=temperature_2m");

  // 2. VALIDACIÓN DE ERRORES DE SERVIDOR (400, 404, 500, etc.)
  // '!respuesta.ok' evalúa si el código de estado HTTP NO está en el rango exitoso (200-299).
  if (!respuesta.ok) {
    // Si hubo un error (ej. 404 Not Found), imprimimos el código exacto:
    console.log("Algo salió mal. Código de estado HTTP:", respuesta.status);
    
    // 'return' frena la función de inmediato para NO intentar convertir a JSON
    // una respuesta fallida o corrupta.
    return;
  }

  // 3. Si 'respuesta.ok' fue true, continuamos convirtiendo la respuesta a JSON.
  const datos = await respuesta.json();
  
  // 4. Imprimimos el dato específico que necesitamos.
  console.log("Temperatura actual:", datos.current.temperature_2m, "°C");
}

// Llamada a la función con control de errores
obtenerClima();


// ===================================================================
// ❌ CASO 3: REPETICIÓN DEL ERROR CON OTRA API
// ===================================================================
// Al no usar 'await' dentro de una función 'async', ocurre lo mismo:
// JS no espera a la red e imprime el objeto Promesa sin resolver.

const respuesta1 = fetch("https://thesimpsonsapi.com/api/characters");
console.log(respuesta1); // Imprime: Promise { <pending> }