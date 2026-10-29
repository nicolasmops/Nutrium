document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });

  const contenedor = document.getElementById('cont');
  const paciente = JSON.parse(sessionStorage.getItem('pacienteSeleccionado'));

  function mostrarInfoPaciente() {
    contenedor.innerHTML = 
    `
      <div class="container">
        <img class="ftito" src="${paciente.información.foto}">
        <article class="info">
        <div class="campos alto">${paciente.información.nombre}</div>
        <div class="campos">${paciente.información.email}</div>
        <div class="campos">${paciente.información.sodioMax}mg cada 100g</div>
    
        </article>
        </div>
        <div class="notas">${paciente.descripción}</div>
    `
  }
  mostrarInfoPaciente();