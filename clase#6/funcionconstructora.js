// ✅ Convención: nombre en PascalCase (mayúscula inicial)
function Producto(nombre, precio, stock) {
  // "this" apunta al objeto que se está creando
  this.nombre = nombre;
  this.precio = precio;
  this.stock  = stock;

  // Métodos definidos dentro del constructor
  this.estaDisponible = function() {
    return this.stock > 0;
  };

  this.ficha = function() {
    return `${this.nombre} - $${this.precio.toLocaleString()} | Stock: ${this.stock}`;
  };
}

// Creamos instancias con "new"
const laptop    = new Producto("Laptop",    2500000, 5);
const audifonos = new Producto("Audífonos", 180000,  0);

console.log(laptop.ficha());
console.log("¿Audífonos disponibles?", audifonos.estaDisponible());