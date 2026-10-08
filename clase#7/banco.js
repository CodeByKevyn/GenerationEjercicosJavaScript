class CuentaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  consignar(monto) {
    this.saldo += monto;
    return `${this.titular} consignó $${monto}. Saldo: $${this.saldo}`;
  }

  retirar(monto) {
    if (monto > this.saldo) {
      return "Fondos insuficientes";
    }
    this.saldo -= monto;
    return `${this.titular} retiró $${monto}. Saldo: $${this.saldo}`;
  }
}

const ana = new CuentaBancaria("Ana", 100000);
const carlos = new CuentaBancaria("Carlos", 200000);

console.log(ana.consignar(50000));
console.log(ana.retirar(30000));
console.log(carlos.retirar(500000));
console.log(`Saldo de Ana: $${ana.saldo}`);