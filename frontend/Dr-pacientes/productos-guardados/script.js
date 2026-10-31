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
  const nombreP = document.querySelector(".nombrePaciente")
  const fotoP = document.querySelector(".ftPerfil")
const container = document.getElementById("lista")
const buscador = document.getElementById("buscar")
const id = localStorage.getItem('id'); 
let productos = []
      nombreP.innerHTML = `${paciente.información.nombre}`
  fotoP.src =  "data:image/png;base64," + paciente.información.foto
container.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".producto")
  if (!tarjeta) return
  sessionStorage.setItem("productoGuardado", JSON.stringify(productosMostrados[tarjeta.dataset.index]))
  window.location.href = tarjeta.dataset.href
})

function mostrarProductos(lista) {
  productosMostrados = lista
  container.innerHTML = lista.map((producto, i) => `
    <section class="producto" data-index="${i}" data-href="../rev-producto/index.html">
      <img class="foto" src="${producto.foto}">
      <div class="nombre">${producto.nombreProducto}</div>
      <div class="texto">${producto.descripción}</div>
    </section>
  `).join('')
}

async function cargarProductos() {
  const resultado = await fetch("http://localhost:3000/medico/" + id + "/paciente/" + paciente.información.id +"/productosGuardados")
  const respuesta = await resultado.json()

  if (!Array.isArray(respuesta)) {
    alert(respuesta.estatus)
    return
  }

  todosLosProductos = respuesta
  mostrarProductos(todosLosProductos)
}

function buscar() {
  const texto = buscador.value.toLowerCase()
  const productosFiltrados = todosLosProductos.filter(producto => {
    return producto.nombreProducto.toLowerCase().includes(texto)
      || String(producto["descripción"]).toLowerCase().includes(texto)
  })
  mostrarProductos(productosFiltrados)
}

buscador.addEventListener("input", buscar)
cargarProductos()