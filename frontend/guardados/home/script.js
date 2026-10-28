document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

<<<<<<< HEAD
const container = document.getElementById("lista")
const id = localStorage.getItem("id"); 
let productos = []
=======
  const container = document.getElementById("lista")
  const id = /*localStorage.getItem("id") */ 2
  async function mostrarGuardados() {
    const resultado = await fetch('http://localhost:3000/productos/' + id, {
      method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      
      }) 
>>>>>>> c73565a1c0e3df11baeac45ad63217b9a5b17a48

container.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".producto")
  if (!tarjeta) return
  sessionStorage.setItem("productoGuardado", JSON.stringify(productos[tarjeta.dataset.index]))
  window.location.href = tarjeta.dataset.href
})

async function mostrarGuardados() {
  const resultado = await fetch('http://localhost:3000/productos/' + id, {
    method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    
<<<<<<< HEAD
    }) 

    const respuesta = await resultado.json()
    productos = respuesta
  
    respuesta.forEach((producto, i) => {
      container.insertAdjacentHTML("beforeend",
      `
       <section class ="producto" data-index="${i}" data-href="../rev-producto/index.html">
          <img class = "foto" src ="${producto.foto}"></img>
          <div class = "nombre">${producto.nombreProducto}</div>
          <div class = "texto">${producto.descripción}</div>
      </section>
      `)
    })
    
}
=======
      respuesta.forEach(producto => {
        container.innerHTML += 
        `
         <section class ="producto" data-href="../rev-producto/index.html">
            <img class = "foto" src ="${producto.foto}"></img>
            <div class = "nombre">${producto.nombreProducto}</div>
            <div class = "texto">${producto.descripción}</div>
        </section>
        `
      })
  }
>>>>>>> c73565a1c0e3df11baeac45ad63217b9a5b17a48

mostrarGuardados()