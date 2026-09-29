//for(inicio, condicion, actualizacion){
// Bloque de codigo que se ejecutara si pasa la condicion
//}
// en la parte de la actualizacion se puede hacer +2 +3 etcs lo que se requiera

for(let contador = 1; contador<= 5; contador++){
    console.log(contador);
}

// Recorrer arrays

const clientes = ["Pepita", "Pepito","kevyn","Papitas"];

for(let i = 0; i < clientes.length; i++){
    console.log("Bienvenido", clientes[i]);
}

const movimientos = [35000, 120000, 8000, 45000, 60000]

for(let i = 0; i < movimientos.length; i++){
    if(movimientos[i] > 100000){
        console.log(movimientos[i])
    }
}