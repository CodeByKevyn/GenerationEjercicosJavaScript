const cuentaBancaria = {
  titular:  "Valentina Ríos",
  numero:   "001-234-567",
  saldo:    500000,
  tipo:     "Ahorros",

  depositar(monto) {
    if (monto <= 0) return "❌ Monto inválido";
    this.saldo += monto;
    
    return `✅ Depósito OK. Saldo: $${this.saldo.toLocaleString ()}`;
  },

  retirar(monto) {
    if (monto > this.saldo) return "❌ Saldo insuficiente";
    this.saldo -= monto;
    return `✅ Retiro OK. Saldo: $${this.saldo.toLocaleString()}`;
  },

  verResumen() {
    return `Cuenta: ${this.tipo} | Titular: ${this.titular} | Saldo: $${this.saldo.toLocaleString()}`;
  }
};

console.log(cuentaBancaria.depositar(150000));
console.log(cuentaBancaria.retirar(900000));
console.log(cuentaBancaria.retirar(200000));
console.log(cuentaBancaria.verResumen());