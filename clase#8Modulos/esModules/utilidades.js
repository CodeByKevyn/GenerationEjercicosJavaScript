function redondear(valor) {
  return Math.round(valor);
}

export function formatearPesos(valor) {
  return `$${redondear(valor).toLocaleString("es-CO")}`;
}

export function esMontoValido(monto) {
  return monto > 0;
}