function CuentaBancaria(titular, saldo) {
  this.titular = titular;
  this.saldo = saldo;
  this.consignar = function (monto) {
    this.saldo += monto;
    return `${this.titular} consignó $${monto}. Saldo: $${this.saldo}`;
  };
}

const cuenta = new CuentaBancaria("Ana", 100000);
console.log(cuenta.consignar(50000));