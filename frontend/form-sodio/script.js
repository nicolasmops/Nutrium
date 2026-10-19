document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 
const form = document.getElementById('formulario');
const boton = document.getElementById('boton');

async function registrarSodio() {
  const id = localStorage.getItem('id');
  console.log('id:', id);

  const respuesta = await fetch('http://localhost:3000/registro/sodio/' + id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sodioMax: parseInt(form.miligramos.value) })
  });

  console.log('status:', respuesta.status, await respuesta.json());

  if (respuesta.status === 200) {
window.location.href = '../home/paciente/index.html';  }
}
boton.addEventListener('click', (event) => {
  event.preventDefault();
  registrarSodio();
})