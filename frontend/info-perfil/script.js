document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});


const fotoUser = document.querySelector(".ft")
const correoUser = document.querySelector(".Mail")
const nombreUser = document.querySelector(".Nombre")
const medicosUser = document.querySelector(".Médicos")
const sodioUser = document.querySelector(".Sodio")
const rolUser = document.querySelector(".rol")
const fechaUser = document.querySelector(".Fecha")
const btnMucho = document.querySelector(".mucho")
const btnFecha = document.querySelector(".fecha")
const btnMail = document.querySelector(".mail")
const btnSodio = document.querySelector(".sodio")
const btnMedicos = document.querySelector(".medicos")
const inputFecha = document.getElementById("fechaNacimiento")
const inputNombre = document.getElementById("nombre")
const inputMail = document.getElementById("email")
const inputRol = document.getElementById("rol")
const inputMedicos = document.getElementById("medico")
const inputSodio = document.getElementById("sodium")
const inputFoto = document.getElementById("foto")
const id = localStorage.getItem('id')
async function infoUser (){


const resultado = await fetch ("http://localhost:3000/usuario/" + id, {
method:'GET',
headers: {'Content-type': 'application/json'},
})


const respuesta = await resultado.json()


if (respuesta.esMedico === true){
rolUser.innerHTML = `Médico`
}
else {
rolUser.innerHTML = `Paciente`
}


fotoUser.src = "data:image/png;base64," + respuesta.foto
correoUser.innerHTML = `${respuesta.email}`
fechaUser.innerHTML = `${respuesta.fechaNacimiento}`
nombreUser.innerHTML = `${respuesta.nombre}`
sodioUser.innerHTML = `${respuesta.sodioMax}`




}
infoUser()

function hacerEditable(boton, texto, input, campo) {
  boton.addEventListener("click", () => {
    input.value = texto.textContent
    texto.style.display = "none"
    input.style.display = "inline-block"
    input.focus()
  })

  input.addEventListener("blur", async () => {
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
hacerEditable(btnMedicos, medicosUser, inputMedicos, "medico")

function leerFoto(archivo) {
  return new Promise(resolve => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result.split(",")[1])
    lector.readAsDataURL(archivo)
  })
}

function mostrarInputs(visible) {
  const textos = [nombreUser, rolUser]
  const inputs = [inputNombre, inputRol, inputFoto]
  textos.forEach(el => el.style.display = visible ? "none" : "inline-block")
  inputs.forEach(el => el.style.display = visible ? "inline-block" : "none")
}

let editando = false

btnMucho.addEventListener("click", async () => {
  if (!editando) {
    editando = true
    inputNombre.value = nombreUser.textContent
    inputRol.value = rolUser.textContent
    mostrarInputs(true)
    inputNombre.focus()
    return
  }

  editando = false

  const datos = {
    nombre: inputNombre.value,
    esMedico: inputRol.value === "Médico"
  }

  if (inputFoto.files[0]) {
    datos.foto = await leerFoto(inputFoto.files[0])
  }

  const resultado = await fetch("http://localhost:3000/usuario/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })

  if (resultado.status === 200) {
    nombreUser.textContent = datos.nombre
    rolUser.textContent = datos.esMedico ? "Médico" : "Paciente"
    if (datos.foto) {
      fotoUser.src = "data:image/png;base64," + datos.foto
    }
  }

  inputFoto.value = ""
  mostrarInputs(false)
})