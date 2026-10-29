document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});


const fotoUser = document.querySelector(".ft")
const correoUser = document.querySelector(".Mail")
const nombreUser = document.querySelector(".Nombre")
const medicosUser = document.querySelector(".Médicos")
const sodioUser = document.querySelector(".Sodio")
const rolUser = document.querySelector(".rol")
const fechaUser = document.querySelector(".Fecha")
const btnMucho = document.querySelector(".mucho")
const btnFecha = document.querySelector(".fecha")
const btnMail = document.querySelector(".mail")
const btnSodio = document.querySelector(".sodio")
const btnMedicos = document.querySelector(".medicos")
const id = localStorage.getItem('id')
async function infoUser (){


const resultado = await fetch ("http://localhost:3000/usuario/" + id, {
method:'GET',
headers: {'Content-type': 'application/json'},
})


const respuesta = await resultado.json()


if (respuesta.esMedico === true){
rolUser.innerHTML = `Médico`
}
else {
rolUser.innerHTML = `Paciente`
}


fotoUser.src = respuesta.foto
correoUser.innerHTML = `${respuesta.email}`
fechaUser.innerHTML = `${respuesta.fechaNacimiento}`
nombreUser.innerHTML = `${respuesta.nombre}`
sodioUser.innerHTML = `${respuesta.sodioMax}`




}
infoUser()
