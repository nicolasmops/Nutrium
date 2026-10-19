const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnCapturar = document.getElementById('btnCapturar');

// 1. Pedir permiso y activar la cámara
navigator.mediaDevices.getUserMedia({ video: true }
)
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error("No se pudo acceder a la cámara:", error);
  });

// 2. Tomar la foto al hacer clic en el botón
btnCapturar.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  // Dibujar el fotograma actual del video en el canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Convertir el canvas a una URL de imagen (en formato PNG)
  const dataUrl = canvas.toDataURL('image/png');
  
  console.log("Foto capturada:", dataUrl);
  // Puedes asignar 'dataUrl' al atributo 'src' de una etiqueta <img> para mostrarla
});
