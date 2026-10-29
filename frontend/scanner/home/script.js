document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

const popup = document.getElementById('popup');
const popupGuardar = document.getElementById('popupGuardar');
const siButton = document.getElementById('si');
const noButton = document.getElementById('no');
const guardarButton = document.getElementById('btnGuardar');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnCapturar = document.getElementById('btnEscanear');

let stream = null;
let iniciando = false;

function funcionAbrir() {
  popup.showModal();
}

function funcionAbrirGuardar() {
  popup.close();
  popupGuardar.showModal();
}

function funcionCerrar() {
  popup.close();
}

function funcionGuardar() {
  popupGuardar.close();
}

siButton.addEventListener('click', funcionAbrirGuardar);
noButton.addEventListener('click', funcionCerrar);
guardarButton.addEventListener('click', funcionGuardar);

async function prenderCamara() {
  if ((stream && stream.active) || iniciando) return;
  iniciando = true;

  const nuevoStream = await navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    })
    .finally(() => {
      iniciando = false;
    });

  stream = nuevoStream;
  video.srcObject = stream;
  video.setAttribute('playsinline', '');
  video.muted = true;
  await video.play();
}

function apagarCamara() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
}

async function capturar() {
  if (!stream || video.videoWidth === 0) {
    alert('La cámara todavía no está lista');
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  const id = localStorage.getItem('id');

  const rta = await fetch('http://localhost:3000/scanner/' + id, {
    method: 'POST',
    headers: { 'Content-Type': 'image/jpeg' },
    body: blob
  });

  const tipo = rta.headers.get('content-type') || '';

  if (!tipo.includes('application/json')) {
    alert('Error del servidor: ' + rta.status);
    return;
  }

  const respuesta = await rta.json();

  if (!rta.ok) {
    alert(respuesta.estatus || 'Error: ' + rta.status);
    return;
  }

  if (respuesta.apto === 2) {
    console.log('apto');
  } else if (respuesta.apto === 1) {
    console.log('con moderacion');
  } else if (respuesta.apto === 0) {
    console.log('no comer');
  }

  funcionAbrir();
}

btnCapturar.addEventListener('click', (event) => {
  event.preventDefault();
  capturar();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    prenderCamara();
  }
});

window.addEventListener('beforeunload', apagarCamara);

prenderCamara();