function redondear(valor) {
  return Math.round(valor);
}

function formatearPesos(valor) {
  return `$${redondear(valor).toLocaleString("es-CO")}`;
}

function esMontoValido(monto) {
  return monto > 0;
}

module.exports = { formatearPesos, esMontoValido };