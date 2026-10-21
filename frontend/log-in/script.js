document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 

const form = document.getElementById("form")
const boton = document.getElementById("boton")

async function loguearse(){
  let usuarioLogueado = {
    email: form.email.value,
    contraseña: form.contraseña.value
  }
let resultado = await fetch ("http://localhost:3000/inicioSesion", {
  method: 'POST',
  headers: {'Content-type': 'application/json'},
  body: JSON.stringify(usuarioLogueado)
})

const respuesta = await resultado.json() 


if (resultado.status === 200) {
  if ( localStorage.getItem('esMedico') === 'true'){
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
else if (resultado.status === 401){
  alert("Mail/Contraseña incorrecta.")
}
}

boton.addEventListener("click", (event) =>{
event.preventDefault()
loguearse()
})

