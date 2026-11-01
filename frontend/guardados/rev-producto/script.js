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
let aptitud
let clase
 

function revisarProducto(){
  if (productoUsable.apto === 2){
    aptitud = "Puede consumirse"
    clase = "siPuede"
 }
 else if (productoUsable.apto === 1){
    aptitud = "Consumir con moderacion"
    clase = "moderacion"
 }
 else if (productoUsable.apto === 0){
    aptitud = "No consumir"
    clase = "noPuede"
 }
  contenedor.innerHTML =
  `
       <article class="Mensaje">
            <img class="foto" src = "${productoUsable.foto}"></img>
            <section class="bottom">
            <div class="alto">
                <div class="nombre">${productoUsable.nombreProducto}</div>
                <div class = "apto ${clase}">${aptitud}</div>
                </div>
                <div class="descripcion uno">${productoUsable.descripción}</div>
              <div class="botones">
                <div class="borrar">
                  <img src="../../aComponentes/chloé.png" class="basura" alt="">
                </div>
                <div class="continuar" data-href="../home/index.html">Continuar</div>
              </div>
                </section>
        </article>
  `
}
revisarProducto()