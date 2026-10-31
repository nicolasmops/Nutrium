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

const form = document.getElementById('formulario');
const boton = document.getElementById('agregar');
const id = localStorage.getItem('id');

async function agregarPaciente() {
  let pacienteNuevo = {
    descripción: form.notas.value,
  información: {
    nombre: form.nombre.value,
    email: form.email.value,
  }
  }

 const response = await fetch("http://localhost:3000/medico/" + id + "/pacientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pacienteNuevo)
  });

  if (response.status === 200) {
    alert("Paciente agregado correctamente");
    window.location.href = "../home/index.html";
  }
}

boton.addEventListener('click', (e) => {
  e.preventDefault();
  agregarPaciente();
});