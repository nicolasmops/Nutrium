document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

const contenedor = document.getElementById("contenedor");
const id = 1;  //localStorage.getItem("id") ;
const buscador = document.getElementById("buscador");
let mensajes = [];

function mostrarMensajes(lista) {
  contenedor.innerHTML = lista.map(msj => `
    <article class="mensaje">
      <div class="top">
        <img class="foto" src="${msj.deQuienFoto}">
        <div class="cont">
          <div class="nombre">${msj.deQuienNombre}</div>
          <div class="msj">${msj.titulo}</div>
        </div>
      </div>
      <div class="despliegue">
        <p>${msj.texto}</p>
      </div>
    </article>
  `).join("");
}

function buscar() {
  const texto = buscador.value.toLowerCase();
  const mensajesFiltrados = mensajes.filter(msj => {
    return msj.deQuienNombre.toLowerCase().includes(texto)
      || msj.titulo.toLowerCase().includes(texto)
      || msj.texto.toLowerCase().includes(texto);
  });
  mostrarMensajes(mensajesFiltrados);
}

buscador.addEventListener("input", buscar);

contenedor.addEventListener("click", (e) => {
  const mensaje = e.target.closest(".mensaje");
  if (!mensaje) return;
  mensaje.classList.toggle("abierto");
});

async function cargarMensajes() {
  const resultado = await fetch("http://localhost:3000/mensajes/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  const data = await resultado.json();

  if (resultado.status === 200 && data.estatus !== "No hay mensajes") {
    mensajes = data;
    mostrarMensajes(mensajes);
  }
}

cargarMensajes();