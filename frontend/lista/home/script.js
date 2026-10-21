document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.resto').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('abierto');
      });
    });
  });


  const container = document.getElementById("lista")
  const id = /*localStorage.getItem("id") */ 3
  async function mostrarubicaciones() {
    const resultado = await fetch('http://localhost:3000/ubicaciones/' + id, {
      method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      
      }) 

      const respuesta = await resultado.json()
    
      respuesta.forEach(ubicacion => {
        container.innerHTML += 
        `
         <div class ="resto">
            <img class = "foto" src ="${ubicacion.foto}"></img>
            <div class = "nombre">${ubicacion.nombre}</div>
            <div class = "desc">${ubicacion.dirección}</div>}
            <div class="despliegue">
                <div class="descripcion">${ubicacion.descripción}</div>
            </div>
        </div>
        `
      })
      
  }

mostrarUbicaciones()