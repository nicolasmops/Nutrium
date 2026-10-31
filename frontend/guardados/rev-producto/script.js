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
  const producto = sessionStorage.getItem("productoGuardado")
  const contenedor = document.getElementById("contenedor")
  const productoUsable = JSON.parse(producto)
let aptitud = "a"

 

function revisarProducto(){
  if (productoUsable.apto === 2){
    aptitud = "Puede consumirse"
 }
 else if (productoUsable.apto === 1){
    aptitud = "Consumir con moderacion"
 }
 else if (productoUsable.apto === 0){
    aptitud = "No consumir"
 }
  contenedor.innerHTML = 
  `
       <article class="Mensaje">
            <img class="foto" src = ${productoUsable.foto}></img>
            <section class="bottom">
                <div class="nombre">${productoUsable.nombreProducto}</div>
                <div class = "apto">${aptitud}</div>
                <div class="descripcion uno">${productoUsable.descripción}</div>
                <div class="guardar" data-href="../home/index.html">Continuar</div>
            </section>
        </article>
  `
}
revisarProducto()