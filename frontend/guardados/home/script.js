document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });

  const container = document.getElementById("lista")
  const id = /*localStorage.getItem("id") */ 1
  async function mostrarGuardados() {
    const resultado = await fetch('http://localhost:3000/productos/' + id, {
      method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      
      }) 

      const respuesta = await resultado.json()
    
      respuesta.forEach(producto => {
        container.innerHTML += 
        `
         <section class ="producto" data-href="../rev-producto/index.html">
            <img class = "foto" src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCbskEqo8QTP0DjG81UlFzu1U_69ZExvo5oKzcCgv0Xu-j1hjzxjcsu0aBIEDuFX80v4ouw1rx5WKmWG1E6z4Z35CKx5VH9H8IsdKtvTnC_A&s=10"></img>
            <div class = "nombre">${producto.nombreProducto}</div>
            <div class = "texto">${producto.descripción}</div>
        </section>
        `
      })
      //${producto.foto}
  }

mostrarGuardados()