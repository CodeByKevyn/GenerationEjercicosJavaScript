const cursos = [
  { nombre: "JavaScript desde cero", precio: 120000, horas: 30, instructor: "Ana", disponible: true },
  { nombre: "Java Backend", precio: 150000, horas: 40, instructor: "Carlos", disponible: true },
  { nombre: "React práctico", precio: 130000, horas: 25, instructor: "Lucía", disponible: false },
  { nombre: "SQL para análisis", precio: 90000, horas: 20, instructor: "Andrés", disponible: true },
];

console.log(cursos[1].instructor);
console.log(cursos[3].precio);

for (let i = 0; i < cursos.length; i++) {
  console.log(`${cursos[i].nombre} · ${cursos[i].horas} h · $${cursos[i].precio}`);
}