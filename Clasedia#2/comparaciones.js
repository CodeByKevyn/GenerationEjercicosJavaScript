// --- VARIABLES DE PRUEBA ---
const saldo = 50000;
const monto = 80000;

const numero = 21;
const numeroTexto = "21"; // String para probar la diferencia entre == y ===

console.log("=========================================");
console.log("1. OPERADORES RELACIONALES (Mayor / Menor)");
console.log("=========================================");

// Menor que (<)
console.log("monto < saldo :", monto < saldo); // false (80000 no es menor que 50000)

// Mayor que (>)
console.log("monto > saldo :", monto > saldo); // true (80000 es mayor que 50000)

// Menor o igual que (<=)
console.log("monto <= saldo:", monto <= saldo); // false (80000 no es menor ni igual a 50000)

// Mayor o igual que (>=)
console.log("monto >= saldo:", monto >= saldo); // true (80000 es mayor o igual a 50000)


console.log("\n=========================================");
console.log("2. IGUALDAD LAXA (==) vs ESTRICTA (===)");
console.log("=========================================");

// Igualdad laxa (==) -> Compara SOLO el VALOR (convierte tipos automáticos)
console.log("numero == 21   :", numero == 21);          // true
console.log("numero == '21' :", numero == numeroTexto); // true (compara número 21 con texto '21')

// Igualdad estricta (===) -> Compara VALOR y TIPO DE DATO (Buenas prácticas)
console.log("numero === 21  :", numero === 21);         // true
console.log("numero === '21':", numero === numeroTexto);// false (Number vs String)


console.log("\n=========================================");
console.log("3. DESIGUALDAD LAXA (!=) vs ESTRICTA (!==)");
console.log("=========================================");

// Desigualdad laxa (!=) -> ¿Son DIFERENTES en valor?
console.log("monto != saldo  :", monto != saldo);         // true (80000 es diferente de 50000)
console.log("numero != '21'  :", numero != numeroTexto);  // false (para '!=' valen lo mismo)

// Desigualdad estricta (!==) -> ¿Son DIFERENTES en valor O en tipo de dato?
console.log("monto !== saldo :", monto !== saldo);        // true
console.log("numero !== '21' :", numero !== numeroTexto); // true (tienen distinto tipo de dato)


console.log("\n=========================================");
console.log("4. ACLARACIÓN DEL OPERADOR DE ASIGNACIÓN (=)");
console.log("=========================================");

// El '=' NO compara nada. Sirve para GUARDAR o ASIGNAR un valor a una variable.
let miVariable = 100;
console.log("Valor guardado con '=':", miVariable);