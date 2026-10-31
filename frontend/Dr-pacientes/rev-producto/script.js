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
      nombreP.innerHTML = `${paciente.información.nombre}`
  fotoP.src =  "data:image/png;base64," + paciente.información.foto
  const producto = sessionStorage.getItem("productoGuardado")
  const contenedor = document.getElementById("contenedor")
  const productoUsable = JSON.parse(producto)
let aptitud = productoUsable.apto
let claseDeApto = ""
 

function revisarProducto(){
  if (productoUsable.apto === true){
    aptitud = "Puede consumirse"
    claseDeApto = "verde"
 }
 else if (productoUsable.apto === 1){
    aptitud = "Con moderacion"
    claseDeApto = "amarillo"
 }
 else if (productoUsable.apto === false){
    aptitud = "No puede consumirse"
    claseDeApto = "rojo"
 }
  contenedor.innerHTML = 
  `
       <article class="Mensaje">
            <img class="foto" src = ${productoUsable.foto}></img>
            <section class="bottom">
                <div class="nombre">${productoUsable.nombreProducto}</div>
                <div class = "apto ${claseDeApto}">${aptitud}</div>
                <div class="descripcion uno">${productoUsable.descripción}</div>
                <div class="guardar" data-href="../productos-guardados/index.html">Continuar</div>
            </section>
        </article>
  `
}
revisarProducto()