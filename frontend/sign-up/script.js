document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});
const form = document.getElementById('formulario');
const boton = document.getElementById('crearCuenta');
async function registrarse() {
  const dia = form.dia.value.padStart(2, '0');
const mes = form.mes.value.padStart(2, '0');
  const anio = form.anio.value;

  let user = {
    nombre: form.nombre.value,
    contraseña: form.contrasena.value,
    fechaNacimiento: `${dia}/${mes}/${anio}`,
    email: form.mail.value,
  };

console.log(user)

  const respuesta = await fetch('http://localhost:3000/registro/cuenta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  const resultado = await respuesta.json();
  console.log('Guardado con éxito:', resultado);

  if (respuesta.status === 200) {
    localStorage.setItem('id', resultado.id);

    setTimeout(() => {
      window.location.href = '../form-sodio/index.html';
    }, 2000);
  }
}
boton.addEventListener('click', (event) => {
  event.preventDefault();
  registrarse();
});