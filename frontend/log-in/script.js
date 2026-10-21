document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 

const form = document.getElementById("form")

async function loguearse(){
let resultado = await fetch ("http://localhost:3000/inicioSesion", {
  method: 'GET',
  headers: {'Content-type': 'application/json'},
  body: JSON.stringify(usuarioLogueado)
})

const respuesta = await resultado.json() 
let usuarioLogueado = {
  email: form.email.value,
  contraseña: form.contraseña.value
}

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


