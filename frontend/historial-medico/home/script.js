document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });


const container = document.querySelector(".lista-guardados")
const id = localStorage.getItem('id')
async function mostrarArchivos(){
  
  const resultado = await fetch ("http://localhost:3000/historialMedico/"  + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const respuesta = await resultado.json()
  respuesta.forEach(archivo => {
    container.innerHTML += 
    `
       <section class ="producto" data-href="../revisar-archivo/index.html">
            <img class = "foto" src="${archivo.ruta}"></img>
            <div class = "nombre">${archivo.nombre}</div>
            <div class = "texto">${archivo.fecha}</div>
        </section>
    `
  })
}
mostrarArchivos()


