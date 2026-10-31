document.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href
    })
  })

  const home = document.querySelector('.Home [data-href], .Home[data-href]')
  if (!home) return

  let esMedico = JSON.parse(localStorage.getItem('esMedico'))

  if (esMedico === null) {
    const id = localStorage.getItem('id')
    const resultado = await fetch("http://localhost:3000/usuario/" + id)
    const usuario = await resultado.json()
    esMedico = usuario.esMedico
    localStorage.setItem('esMedico', JSON.stringify(esMedico))
  }

  if (esMedico === true) {
    home.dataset.href = home.dataset.href.replace("home/paciente", "home/doctor")
  }
})

  const paciente = JSON.parse(sessionStorage.getItem("pacienteSeleccionado"))
  const nombreP = document.querySelector(".nombre")
  const fotoP = document.querySelector(".ftPerfil")
  const container = document.querySelector(".lista-guardados")
  const id = localStorage.getItem('id')

  nombreP.innerHTML = `${paciente.información.nombre}`
  fotoP.src =  "data:image/png;base64," + paciente.información.foto

  let todosLosArchivos = []
let archivosMostrados = []

container.addEventListener('click', (event) => {
  const tarjeta = event.target.closest('.producto')
  if (!tarjeta) return
  const archivo = archivosMostrados[tarjeta.dataset.index]
  window.open("http://localhost:3000/" + archivo.ruta, "_blank")
})

function mostrarArchivos(lista) {
  archivosMostrados = lista
  container.innerHTML = lista.map((archivo, i) => `
    <section class="producto" data-index="${i}">
<img class="foto" src="data:image/webp;base64,${archivo.img}">
      <div class="nombre">${archivo.nombre}</div>
      <div class="texto">${archivo.fecha}</div>
    </section>
  `).join('')
}

async function cargarArchivos() {
  const resultado = await fetch("http://localhost:3000/medico/" + id + "/paciente/" + paciente.información.id + "/historialMedico")
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
