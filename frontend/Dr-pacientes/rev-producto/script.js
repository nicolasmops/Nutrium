document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });

    const paciente = JSON.parse(sessionStorage.getItem("pacienteSeleccionado"))
  const nombreP = document.querySelector(".nombrePaciente")
  const fotoP = document.querySelector(".ftPerfil")
      nombreP.innerHTML = `${paciente.información.nombre}`
  fotoP.src =  "data:image/png;base64," + paciente.información.foto
  const producto = sessionStorage.getItem("productoGuardado")
  const contenedor = document.getElementById("contenedor")
  const productoUsable = JSON.parse(producto)
let aptitud = productoUsable.apto

 

function revisarProducto(){
  if (productoUsable.apto === true){
    aptitud = "Puede consumirse"
 }
 else if (productoUsable.apto === 1){
    aptitud = "Consumir con moderacion"
 }
 else if (productoUsable.apto === false){
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
                <div class="guardar" data-href="../productos-guardados/index.html">Continuar</div>
            </section>
        </article>
  `
}
revisarProducto()