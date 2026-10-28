document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });

const contenedor = document.getElementById("medio");
const id = /*localStorage.getItem("id");*/ 1
const buscador = document.getElementById("filtro")


function buscar(){
  const texto = buscador.value.toLowerCase()
  const mensajesFiltrados = comidas.filter (comida => {
    return comida.nombre.toLowerCase().includes(texto)
    || comida.categoria.toLowerCase().includes(texto)
    || comida.provincia.toLowerCase().includes(texto)

  })
  mostrarComidas(comidasFiltradas)
}
contenedor.addEventListener("click", (e) => {
  const mensaje = e.target.closest(".mensaje");
  if (!mensaje) return;
  mensaje.classList.toggle("abierto");
});

async function cargarMensajes() {

  const resultado = await fetch ("http://localhost:3000/mensajes/" + id, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
});

const data = await resultado.json();

if (resultado.status === 200 && data.estatus !== "No hay mensajes"){
  
  data.forEach(msj => {
    contenedor.innerHTML +=   
    `
         <article class="mensaje" >
              <div class="top">
              <img class="foto" src="${msj.deQuienFoto}}"></img>
              <div class="cont"> 
              <div class="nombre">${msj.deQuienNombre}</div>
              <div class="msj">${msj.titulo}</div>
          </div>  
      </div>
          <div class="despliegue">
               <p>${msj.texto}</p>
          </div>
      </article>
    
    `
  })
  
}
}
cargarMensajes()