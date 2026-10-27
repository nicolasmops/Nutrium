const buscador = document.getElementById("buscador")
const container = document.querySelector(".lista-guardados")
const id = localStorage.getItem('id')
let todosLosArchivos = []

container.addEventListener('click', (event) => {
  const tarjeta = event.target.closest('[data-href]')
  if (tarjeta) {
    window.location.href = tarjeta.dataset.href
  }
})

function mostrarArchivos(lista) {
  container.innerHTML = lista.map(archivo => `
    <section class="producto" data-href="../revisar-archivo/index.html">
      <iframe class="foto" src="${archivo.ruta}" >
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