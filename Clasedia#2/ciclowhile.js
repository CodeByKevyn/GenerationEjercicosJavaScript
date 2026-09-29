let contador = 1;
// si se ejecuta este comando se forma un bluce ya que contador
// nunca cambia
//while(contador <= 5){
//    console.log(contador)
//    
//}
while(contador <= 5){
    console.log(contador)
    contador++
}

const meta = 1000000;
const ahorroMensual = 150000;
let ahorrado = 0;
let meses = 0;

while (ahorrado < meta){
    ahorrado += ahorroMensual
    meses++
}

console.log("Meta alacanzada en", meses , "meses")
console.log("Total ahorrado", ahorrado);


let number = 1; 

while (number < 100) { 
  
  if (number % 15 === 0) { 
    console.log("FIZZBUZZ");

  } else if (number % 3 === 0) {
    console.log("FIZZ");

  } else if (number % 5 === 0) { 
    console.log("BUZZ");
    
  } else {
    console.log(number); 
  }

  number = number + 1; 
}



