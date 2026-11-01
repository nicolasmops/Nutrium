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

const contenedor = document.getElementById("contenedor")
const id = localStorage.getItem("id")
const buscador = document.getElementById("buscador")
let mensajes = []

function mostrarMensajes(lista) {
  contenedor.innerHTML = lista.map(msj => `
    <article class="mensaje">
      <div class="top">
        <img class="foto" src="${msj.deQuienFoto}" alt="">
        <div class="cont">
          <div class="nombre">${msj.deQuienEmail}</div>
          <div class="msj">${msj.titulo}</div>
          <div class="extra">
            <div class="extraCaja">
              <div class="extraInt">
                <div>De: ${msj.deQuienNombre}</div>
                <div>Para: ${msj.aQuienNombre}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="despliegue">
        <div class="detalle">
          <div class="contenido">
            <div class="empuje"></div>
            <button type="button" class="btnResponder">
              <img class="iconoResponder" src="RUTA" alt="">
            </button>
            <p>${msj.texto}</p>
          </div>
        </div>
      </div>
    </article>
  `).join("")
}

function buscar() {
  const texto = buscador.value.toLowerCase()
  const mensajesFiltrados = mensajes.filter(msj => {
    return String(msj.deQuienEmail).toLowerCase().includes(texto)
      || String(msj.deQuienNombre).toLowerCase().includes(texto)
      || String(msj.titulo).toLowerCase().includes(texto)
      || String(msj.texto).toLowerCase().includes(texto)
  })
  mostrarMensajes(mensajesFiltrados)
}

buscador.addEventListener("input", buscar)

contenedor.addEventListener("click", (e) => {
  if (e.target.closest(".btnResponder")) {
    window.location.href = "../enviar/index.html"
    return
  }

  if (e.target.closest(".detalle")) return

  const mensaje = e.target.closest(".mensaje")
  if (mensaje) mensaje.classList.toggle("abierto")
})

async function cargarMensajes() {
  const resultado = await fetch("http://localhost:3000/mensajes/" + id)
  const data = await resultado.json()

  if (resultado.status === 200 && data.estatus !== "No hay mensajes") {
    mensajes = data
    mostrarMensajes(mensajes)
  }
}

cargarMensajes()