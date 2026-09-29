const saldo = 50000;
const monto = 80000;

// if simple
if (monto > saldo){
    console.log("Ey! el monto supera el saldo")
}

// if/ else

if (monto <= saldo){
    console.log("Trasferencia aceptada")
}   else {
    console.log("Saldo insuficiente")
}

// if - else if - else
const saldoAhorros = 250000;

if(saldoAhorros >= 200000){
    console.log("Cliente vip")

}   else if (saldoAhorros >= 100000){
    console.log("Buen ahorro")

} else {
    console.log("Jum le toca ahorrar")
}

//La clave de esta lógica está en el operador % 
// (llamado Módulo o Residuo), que no calcula el resultado de la división,
//  sino lo que sobra al hacer una división entera.
const numero = 2;
if(numero % 2 === 0){
    console.log("El numero es par");
}else{
    console.log("El numero es impar");
}

