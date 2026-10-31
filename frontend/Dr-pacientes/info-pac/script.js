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

const contenedor = document.getElementById('cont')
const paciente = JSON.parse(sessionStorage.getItem('pacienteSeleccionado'))
const btnEditar = document.getElementById("editar")
const id = localStorage.getItem('id')

function srcFoto(foto) {
  if (!foto) return 'img/perfil-default.png'
  if (foto.startsWith('data:')) return foto
  return 'data:image/png;base64,' + foto
}

function mostrarInfoPaciente() {
  contenedor.innerHTML = `
    <div class="container">
      <img class="ftito" src="${srcFoto(paciente.información.foto)}" alt="">
      <article class="info">
        <div class="campos alto">${paciente.información.nombre}</div>
        <div class="campos">${paciente.información.email}</div>
        <div class="campos">${paciente.información.sodioMax}mg cada 100g</div>
      </article>
    </div>
    <div class="contenedor">
      <div class="notas" id="Notas">${paciente.descripción}</div>
      <textarea class="notas oculto" name="notas" id="notas"></textarea>
    </div>
  `

  const notas = document.getElementById("Notas")
  const input = document.getElementById("notas")

  btnEditar.addEventListener("click", () => {
    input.value = notas.textContent
    notas.classList.add("oculto")
    input.classList.remove("oculto")
    input.focus()
  })

  input.addEventListener("blur", async () => {
    if (input.value !== paciente.descripción) {
      const resultado = await fetch("http://localhost:3000/medico/" + id + "/paciente/" + paciente.información.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ descripción: input.value })
      })

      if (resultado.status === 200) {
        paciente.descripción = input.value
        sessionStorage.setItem("pacienteSeleccionado", JSON.stringify(paciente))
      }
    }

    notas.textContent = paciente.descripción
    notas.classList.remove("oculto")
    input.classList.add("oculto")
  })
}

mostrarInfoPaciente()