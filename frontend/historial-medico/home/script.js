document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

const buscador = document.getElementById("buscador")
const container = document.querySelector(".lista-guardados")
const id = localStorage.getItem('id')
let todosLosArchivos = []
let archivosMostrados = []

container.addEventListener('click', (event) => {
  const tarjeta = event.target.closest('.producto')
  if (!tarjeta) return
  const archivo = archivosMostrados[tarjeta.dataset.index]
  window.open(archivo.ruta, "_blank")
})

function mostrarArchivos(lista) {
  archivosMostrados = lista
  container.innerHTML = lista.map((archivo, i) => `
    <section class="producto" data-index="${i}">
      <iframe class="foto" src="${archivo.foto}"></iframe>
      <div class="nombre">${archivo.nombre}</div>
      <div class="texto">${archivo.fecha}</div>
    </section>
  `).join('')
}

async function cargarArchivos() {
  const resultado = await fetch("http://localhost:3000/historialMedico/" + id)
  const respuesta = await resultado.json()

  if (!Array.isArray(respuesta)) {
    alert(respuesta.estatus)
    return
  }

  todosLosArchivos = respuesta
  mostrarArchivos(todosLosArchivos)
}

function buscar() {
  const texto = buscador.value.toLowerCase()
  const archivosFiltrados = todosLosArchivos.filter(archivo => {
    return archivo.nombre.toLowerCase().includes(texto)
      || String(archivo.fecha).toLowerCase().includes(texto)
  })
  mostrarArchivos(archivosFiltrados)
}

buscador.addEventListener("input", buscar)
cargarArchivos()