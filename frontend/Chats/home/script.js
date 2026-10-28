document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });

const contenedor = document.getElementById("medio");
const id = localStorage.getItem("id");
async function cargarMensajes() {

  const resultado = await fetch ("http://localhost:3000/mensajes/" + id, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
});

const data = await resultado.json();

if (resultado.status === 200){
  contenedor.innerHTML +=   
  `
       <article class="mensaje" >
            <div class="top">
            <img class="foto"></img>
            <div class="cont"> 
            <div class="nombre"></div>
            <div class="msj"></div>
        </div>  
    </div>
        <div class="despliegue">
             <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At a recusandae cumque quisquam nisi illum! Quis, ducimus dignissimos minima sapiente, voluptates assumenda quo velit reprehenderit voluptas aspernatur officiis doloribus eligendi.</p>
        </div>
    </article>
  
  `;
}
}