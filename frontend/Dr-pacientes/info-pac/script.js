document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

const contenedor = document.getElementById('cont');
const paciente = JSON.parse(sessionStorage.getItem('pacienteSeleccionado'));

function srcFoto(foto) {
  if (!foto) return 'img/perfil-default.png';
  if (foto.startsWith('data:')) return foto;
  return 'data:image/png;base64,' + foto;
}

function mostrarInfoPaciente() {
  contenedor.innerHTML = `
    <div class="container">
      <img class="ftito" src="${srcFoto(paciente.información.foto)}">
      <article class="info">
        <div class="campos alto">${paciente.información.nombre}</div>
        <div class="campos">${paciente.información.email}</div>
        <div class="campos">${paciente.información.sodioMax}mg cada 100g</div>
      </article>
    </div>
    <div class="notas">${paciente.descripción}</div>
  `;
}

mostrarInfoPaciente();