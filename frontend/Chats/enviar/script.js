document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 
const id = localStorage.getItem('id')
const userEnvia = document.getElementById("enviador")
const userRecibe = document.getElementById("recibidor")
const asunto = document.getElementById("asunto")
const contenido = document.getElementById("texto")

async function enviarMsj() {

  let mensaje = {
    deQuienEmail: userEnvia.value,
    aQuienEmail: userRecibe.value,
    titulo: asunto.value,
    texto: contexto.value,
  }
  
const resultado = await fetch ("http://localhost:3000/mensajes/" + id, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(mensaje)
})

 let respuesta = await resultado.json()

if (resultado.status === 200){
  alert("Mensaje enviado correctamente.")
 
  setTimeout(() => {
    window.location.href = '../Chats/home/index.html';
  }, 2000);
}
else if (resultado.status === 404){
alert("Usuario no encontrado.")
}
else if (resultado.status === 409){
alert("Completar todos los campos del mensaje.")
}
}