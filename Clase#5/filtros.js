const cursos = [
  { nombre: "JavaScript desde cero", precio: 120000, horas: 30, instructor: "Ana", disponible: true },
  { nombre: "Java Backend", precio: 150000, horas: 40, instructor: "Carlos", disponible: true },
  { nombre: "React práctico", precio: 130000, horas: 25, instructor: "Lucía", disponible: false },
  { nombre: "SQL para análisis", precio: 90000, horas: 20, instructor: "Andrés", disponible: true },
];

function cursosEconomicos(listaCursos, precioMaximo) {
  const resultado = [];
  for (let i = 0; i < listaCursos.length; i++) {
    if (listaCursos[i].precio <= precioMaximo) {
      resultado.push(listaCursos[i]);
    }
  }
  return resultado;
}

const campana = cursosEconomicos(cursos, 130000);
console.log(`Cursos para la campaña: ${campana.length}`);
for (let i = 0; i < campana.length; i++) {
  console.log(`- ${campana[i].nombre} ($${campana[i].precio})`);
}
console.log(`El catálogo sigue con ${cursos.length} cursos`);

function buscarCurso(listaCursos, nombreBuscado) {
  for (let i = 0; i < listaCursos.length; i++) {
    if (listaCursos[i].nombre === nombreBuscado) {
      return listaCursos[i];
    }
  }
  return undefined;
}

function describirCurso(curso) {
  if (curso === undefined) {
    return "Ese curso no existe en el catálogo.";
  }
  return `${curso.nombre} con ${curso.instructor}: ${curso.horas} horas por $${curso.precio}`;
}

console.log(describirCurso(buscarCurso(cursos, "Java Backend")));
console.log(describirCurso(buscarCurso(cursos, "Python")));