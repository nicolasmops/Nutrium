document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href
    })
  })
})

const form = document.getElementById('formulario')
const boton = document.getElementById('boton')

async function registrarSodio() {
  const id = localStorage.getItem('id')
  const esMedico = form.esMedico.value === 'true'
  const sodioMax = parseInt(form.miligramos.value, 10)

  const respuesta = await fetch('http://localhost:3000/registro/cuenta/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sodioMax: sodioMax, esMedico: esMedico })
  })
  const resultado = await respuesta.json()

  if (respuesta.status !== 200) {
    alert(resultado.estatus)
    return
  }

  localStorage.setItem('esMedico', JSON.stringify(esMedico))

  const destino = esMedico ? '../home/doctor/index.html' : '../home/paciente/index.html'
  setTimeout(() => {
    window.location.href = destino
  }, 2000)
}

boton.addEventListener('click', (event) => {
  event.preventDefault()
  if (!form.reportValidity()) return
  registrarSodio()
})