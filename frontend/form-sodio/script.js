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
  localStorage.setItem('esMedico', form.esMedico.value)

  const respuesta = await fetch('http://localhost:3000/registro/sodio/' + id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sodioMax: parseInt(form.miligramos.value) })
  });

  console.log('status:', respuesta.status, await respuesta.json());

  if (respuesta.status === 200) {
    if ( localStorage.getItem('esMedico') === true){
      setTimeout(() => {
        window.location.href = '../home/doctor/index.html';
      }, 2000);
      }
      else {
        setTimeout(() => {
          window.location.href = '../home/paciente/index.html';
        }, 2000);
  }
  }
  else if (respuesta.status === 401){
    alert("Mail/Contraseña incorrecta.")
  } 
 }
boton.addEventListener('click', (event) => {
  event.preventDefault();
  registrarSodio();
})