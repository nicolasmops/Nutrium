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


  const container = document.getElementById("lista")
  const id = localStorage.getItem("id") 
  async function mostrarubicaciones() {
    const resultado = await fetch('http://localhost:3000/ubicaciones/' + id, {
      method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      
      }) 

      const respuesta = await resultado.json()
      console.log(respuesta)
    
      respuesta.forEach(ubicacion => {
        container.innerHTML += 
        `
         <div class ="resto">
            <img class = "foto" src ="${ubicacion.foto}"></img>
            <div class = "nombre">${ubicacion.nombre}</div>
            <div class = "desc">${ubicacion.dirección}</div>
            <div class="despliegue">
                <div class="descripcion">${ubicacion.descripción}</div>
            </div>
        </div>
        `
      })
      
  }

mostrarubicaciones()