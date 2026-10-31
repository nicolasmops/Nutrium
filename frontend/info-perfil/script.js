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

const fotoUser = document.querySelector(".ft")
const correoUser = document.querySelector(".Mail")
const nombreUser = document.querySelector(".Nombre")
const medicosUser = document.querySelector(".Médicos")
const sodioUser = document.querySelector(".Sodio")
const rolUser = document.querySelector(".rol")
const fechaUser = document.querySelector(".Fecha")

const btnMucho = document.querySelector(".editar.mucho")
const btnFecha = document.querySelector(".editar.fecha")
const btnMail = document.querySelector(".editar.mail")
const btnSodio = document.querySelector(".editar.sodio")
const btnMedicos = document.querySelector(".editar.medicos")

const inputFecha = document.getElementById("fechaNacimiento")
const inputNombre = document.getElementById("nombre")
const inputMail = document.getElementById("email")
const inputRol = document.getElementById("rol")
const inputFoto = document.getElementById("foto")
const inputSodio = document.getElementById("sodium")

const grupoPerfil = document.querySelector(".nombreFtyRol .izq")
const nuevoMedico = document.querySelector(".nuevoMedico")
const numeroMedico = document.querySelector(".numeroMedico")
const inputMedicoNombre = document.getElementById("medicoNombre")
const inputMedicoEmail = document.getElementById("medicoEmail")

const id = localStorage.getItem('id')

let medicos = []
let editandoMedicos = false
let editandoPerfil = false

async function infoUser() {
  const resultado = await fetch("http://localhost:3000/usuario/" + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const respuesta = await resultado.json()

  rolUser.textContent = respuesta.esMedico === true ? "Médico" : "Paciente"
  fotoUser.src = "data:image/png;base64," + respuesta.foto
  correoUser.textContent = respuesta.email
  fechaUser.textContent = respuesta.fechaNacimiento
  nombreUser.textContent = respuesta.nombre
  sodioUser.textContent = respuesta.sodioMax

  medicos = respuesta.médicos || []
  mostrarMedicos()
}

function mostrarMedicos() {
  medicosUser.textContent = ""

  if (medicos.length === 0) {
    medicosUser.textContent = "Sin médicos"
    return
  }

  medicos.forEach((medico, i) => {
    const linea = document.createElement("div")
    linea.textContent = "Médico " + (i + 1) + ": " + medico.nombre + "; " + medico.email
    medicosUser.appendChild(linea)
  })
}

function alSalirDelFoco(contenedor, callback) {
  contenedor.addEventListener("focusout", (e) => {
    if (!document.hasFocus()) return
    if (contenedor.contains(e.relatedTarget)) return
    callback()
  })
}

function hacerEditable(boton, texto, input, campo) {
  boton.addEventListener("click", () => {
    input.value = texto.textContent
    texto.style.display = "none"
    input.style.display = "inline-block"
    input.focus()
  })

  alSalirDelFoco(input, async () => {
    const anterior = texto.textContent
    input.style.display = "none"
    texto.style.display = "inline-block"

    if (input.value === anterior) return

    texto.textContent = input.value

    const resultado = await fetch("http://localhost:3000/usuario/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ [campo]: input.value })
    })

    if (resultado.status !== 200) {
      texto.textContent = anterior
    }
  })
}

hacerEditable(btnFecha, fechaUser, inputFecha, "fechaNacimiento")
hacerEditable(btnMail, correoUser, inputMail, "email")
hacerEditable(btnSodio, sodioUser, inputSodio, "sodioMax")

function leerFoto(archivo) {
  return new Promise(resolve => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result.split(",")[1])
    lector.readAsDataURL(archivo)
  })
}

function mostrarInputsPerfil(visible) {
  nombreUser.style.display = visible ? "none" : "inline-block"
  rolUser.style.display = visible ? "none" : "inline-block"
  inputNombre.style.display = visible ? "inline-block" : "none"
  inputRol.style.display = visible ? "inline-block" : "none"
  inputFoto.style.display = visible ? "inline-block" : "none"
}

btnMucho.addEventListener("click", () => {
  if (editandoPerfil) return
  editandoPerfil = true
  inputNombre.value = nombreUser.textContent
  inputRol.value = rolUser.textContent === "Médico" ? "true" : "false"
  mostrarInputsPerfil(true)
  inputNombre.focus()
})

alSalirDelFoco(grupoPerfil, async () => {
  if (!editandoPerfil) return
  editandoPerfil = false

  const nombreAnterior = nombreUser.textContent
  const rolAnterior = rolUser.textContent
  const archivo = inputFoto.files[0]

  const nombre = inputNombre.value.trim() === "" ? nombreAnterior : inputNombre.value.trim()
  const esMedico = inputRol.value === "" ? rolAnterior === "Médico" : inputRol.value === "true"

  mostrarInputsPerfil(false)
  inputFoto.value = ""

  const datos = { nombre, esMedico }

  if (archivo) {
    datos.foto = await leerFoto(archivo)
  }

  const resultado = await fetch("http://localhost:3000/usuario/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })

  if (resultado.status === 200) {
    nombreUser.textContent = nombre
    rolUser.textContent = esMedico ? "Médico" : "Paciente"
    if (datos.foto) {
      fotoUser.src = "data:image/png;base64," + datos.foto
    }
  }
})

btnMedicos.addEventListener("click", () => {
  if (editandoMedicos) return
  editandoMedicos = true
  numeroMedico.textContent = "Médico " + (medicos.length + 1) + ": "
  nuevoMedico.style.display = "block"
  inputMedicoNombre.focus()
})

alSalirDelFoco(nuevoMedico, async () => {
  if (!editandoMedicos) return
  editandoMedicos = false

  const nombre = inputMedicoNombre.value.trim()
  const email = inputMedicoEmail.value.trim()

  nuevoMedico.style.display = "none"

  if (nombre === "" || email === "") return

  const resultado = await fetch("http://localhost:3000/usuario/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ médicos: medicos.concat({ nombre, email }) })
  })

  if (resultado.status === 200) {
    inputMedicoNombre.value = ""
    inputMedicoEmail.value = ""
    infoUser()
  } else {
    alert("No se pudo agregar el médico. Revisá que el mail sea de un médico registrado.")
  }
})

infoUser()