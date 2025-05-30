// Función para eliminar acentos de las palabras
function quitarAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para limpiar los resultados anteriores
function limpiarResultados() {
  document.getElementById("listaPermitidos").innerHTML = "";
  document.getElementById("listaProhibidos").innerHTML = "";
}

// Función para agregar los resultados a la lista correspondiente
function agregarResultado(listaElement, resultados) {
  if (resultados.size > 0) {
    resultados.forEach((ingrediente) => {
      const li = document.createElement("li");
      li.textContent = ingrediente;
      listaElement.appendChild(li);
    });
  } else {
    listaElement.innerHTML = "<li>No se encontraron</li>";
  }
}

// Función principal para buscar ingredientes
function buscarIngrediente(event) {
  event.preventDefault();

  const texto = document.getElementById("busqueda").value.toLowerCase().trim();
  const palabras = quitarAcentos(texto).split(/[\s,]+/);

  const listaPermitidos = document.getElementById("listaPermitidos");
  const listaProhibidos = document.getElementById("listaProhibidos");

  limpiarResultados();

  const encontradosPermitidos = new Set();
  const encontradosProhibidos = new Set();

  palabras.forEach((palabra) => {
    ingredientesPermitidos.forEach((ing) => {
      if (quitarAcentos(ing.toLowerCase()).includes(palabra)) {
        encontradosPermitidos.add(ing);
      }
    });

    ingredientesProhibidos.forEach((ing) => {
      if (quitarAcentos(ing.toLowerCase()).includes(palabra)) {
        encontradosProhibidos.add(ing);
      }
    });
  });

  agregarResultado(listaPermitidos, encontradosPermitidos);
  agregarResultado(listaProhibidos, encontradosProhibidos);
}

// Permitir pulsar Enter sin Shift para buscar
document.getElementById("busqueda").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    buscarIngrediente(event);
  }
});
