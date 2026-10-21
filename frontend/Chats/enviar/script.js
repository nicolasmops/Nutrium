document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 
const id = /*localStorage.getItem('id')*/ 1
const userEnvia = document.getElementById("enviador")
const userRecibe = document.getElementById("recibidor")
const asunto = document.getElementById("asunto")
const contenido = document.getElementById("texto")
const boton = document.getElementById("enviar")

async function enviarMsj() {

  let mensaje = {
    deQuienEmail: userEnvia.value,
    aQuienEmail: userRecibe.value,
    titulo: asunto.value,
    texto: contenido.value,
  }
  
const resultado = await fetch ("http://localhost:3000/mensajes/" + id, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(mensaje)
})



if (resultado.status === 200){
  alert("Mensaje enviado correctamente.")
 
 window.location.href = "../home/index.html";
}
else if (resultado.status === 404){
alert("Usuario no encontrado.")
}
else if (resultado.status === 409){
alert("Completar todos los campos del mensaje.")
}


}

boton.addEventListener('click', (e) => {
  e.preventDefault()
  enviarMsj()
})