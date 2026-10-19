document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 

/*
let popup = document.getElementById("popup");
let popupGuardar = document.getElementById("popupGuardar");
let btnEscanear = document.getElementById("btnEscanear");
btnEscanear.addEventListener("click", funcionAbrir)
function funcionAbrir(){
  popup.showModal();
}
let siButton = document.getElementById("si");
let noButton = document.getElementById("no");
let guardarButton = document.getElementById("btnGuardar")
siButton.addEventListener("click", funcionAbrirGuardar)
noButton.addEventListener("click", funcionCerrar)
guardarButton.addEventListener("click", funcionGuardar )


function funcionAbrirGuardar(){
  popup.close();
  popupGuardar.showModal();
}
function funcionCerrar(){
  popup.close();
}
  const startButton = document.getElementById("btnescanear");*
function funcionGuardar(){
  popupGuardar.close()
}*/

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnCapturar = document.getElementById('btnEscanear');
let camaraPrendida = false

async function testeo() {
  if(camaraPrendida === false){
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
        camaraPrendida = true;
  }
  else{
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const imagen = dataUrl.split(',')[1]; // base64 sin el prefijo
    console.log(imagen)
    const rta = await fetch("http://localhost:3000/test", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imagen, mimeType: 'image/jpeg' }),
    });
  const respuesta = await rta.json()
  let barcode = respuesta.código
  alert(barcode)
}
}
btnCapturar.addEventListener('click', (event) => {
  event.preventDefault();
  testeo();
});
