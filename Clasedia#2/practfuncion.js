function suma(num1,num2){
    return num1 + num2
}

function resta(num1,num2){
    return num1 - num2
}

function multiplicacion(num1,num2){
    return num1 * num2
}

function division(num1,num2){
    return num1 / num2
}

//console.log(suma(23,45))

//console.log(resta(23,45))

//console.log(multiplicacion(23,45))

//console.log(division(23,45))


//el envio cuesta 12.000 pero el envio
//  es gratis desde 150.000 entonces 
// ayúdenme a crear la función que 
// calcule el envio total

function calcularenvio(monto){
    let total = monto
    if(total > 150000){
        total = monto
    } else{
        total= monto + 12000
    }
    return total
}

console.log(calcularenvio(16000))