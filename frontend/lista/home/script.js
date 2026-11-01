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
    const idUsuario = localStorage.getItem('id')
    const resultado = await fetch("http://localhost:3000/usuario/" + idUsuario)
    const usuario = await resultado.json()
    esMedico = usuario.esMedico
    localStorage.setItem('esMedico', JSON.stringify(esMedico))
  }

  if (esMedico === true) {
    home.dataset.href = home.dataset.href.replace("home/paciente", "home/doctor")
  }
})

const container = document.getElementById("lista")
const buscador = document.getElementById("buscador")
const id = localStorage.getItem("id")
let todasLasUbicaciones = []

container.addEventListener('click', async e => {
  const btnEliminar = e.target.closest('.btnEliminar')
  if (btnEliminar) {
    const tarjeta = btnEliminar.closest('.resto')
    await eliminarUbicacion(tarjeta.dataset.id)
    return
  }

  if (e.target.closest('.detalle')) return

  const tarjeta = e.target.closest('.resto')
  if (tarjeta) tarjeta.classList.toggle('abierto')
})

function mostrarUbicaciones(lista) {
  container.innerHTML = lista.map(ubicacion => `
        <div class="resto" data-id="${ubicacion.idUbicación}">
      <img class="foto" src="${ubicacion.foto}" alt="">
      <div class="nombre">${ubicacion.nombre}</div>
      <div class="desc">${ubicacion.dirección}</div>
      <div class="despliegue">
        <div class="detalle">
          <div class="contenido">
            <div class="titulo">${ubicacion.nombre}</div>
            <div class="campo">${ubicacion.dirección}</div>
            <div class="campo">${ubicacion.descripción}</div>
            <div class="acciones">
              <button type="button" class="btnEliminar">
                <img class="iconoEliminar" src="../../aComponentes/famicons_trash.png" alt="">
              </button>
              <button type="button" class="btnGuardar">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('')
}

async function cargarUbicaciones() {
  const resultado = await fetch("http://localhost:3000/ubicaciones/" + id)
  const respuesta = await resultado.json()

  if (!Array.isArray(respuesta)) {
    alert(respuesta.estatus)
    return
  }

  todasLasUbicaciones = respuesta
  buscar()
}

async function eliminarUbicacion(idUbicacion) {
  const resultado = await fetch("http://localhost:3000/ubicacion/" + id + "/" + idUbicacion, {
    method: "DELETE"
  })
  const respuesta = await resultado.json()

  if (resultado.status !== 200) {
    alert(respuesta.estatus)
    return
  }

  await cargarUbicaciones()
}

function buscar() {
  const texto = buscador.value.toLowerCase()
  const ubicacionesFiltradas = todasLasUbicaciones.filter(ubicacion => {
    return String(ubicacion.nombre).toLowerCase().includes(texto)
      || String(ubicacion["dirección"]).toLowerCase().includes(texto)
   
  })
  mostrarUbicaciones(ubicacionesFiltradas)
}

buscador.addEventListener("input", buscar)
cargarUbicaciones()