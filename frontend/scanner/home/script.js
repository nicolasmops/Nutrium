document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

const popup = document.getElementById('popup');
const popupGuardar = document.getElementById('popupGuardar');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnCapturar = document.getElementById('btnEscanear');
const btnGuardar = document.querySelector(".btnGuardar")
const btnCancelar = document.querySelector(".cancelar")
const id = localStorage.getItem('id');


let stream = null;
let iniciando = false;
let productoActual = null;

const resultados = {
  0: {
    clase: 'siPuede',
    titulo: 'Puede consumirse',
    texto: 'Este producto puede ser consumido, ya que la cantidad de sodio que contiene es menor a la máxima indicada para vos. Si tenes alguna duda, por favor consultale a un médico.'
  },
  1: {
    clase: 'moderacion',
    titulo: 'Con moderación',
    texto: 'Este producto puede ser consumido con moderación, ya que la cantidad de sodio que contiene es igual a la máxima indicada para vos. Si tenes alguna duda, por favor consultale a un médico.'
  },
  2: {
    clase: 'noPuede',
    titulo: 'No puede consumirse',
    texto: 'Este producto no puede ser consumido, ya que la cantidad de sodio que contiene es mayor a la máxima indicada para vos. Si tenes alguna duda, por favor consultale a un médico.'
  }
};

async function Guardar() {
  popupGuardar.innerHTML = 
  `
      <section class="up">
                <img src="" class="fto"></img>
                <p class="nombreProducto"></p>
            </section>
            <form class="rest">
                <textarea class="descripcion"></textarea>
                <textarea class="divLorem"></textarea>
            </form>
            <article class="contenedor">
            <button type="button"class="cancelar"><img src="../../aComponentes/flechaGuardar.png" class="flechaGuardar"></img></button>
            <button type ="submit" class="btnGuardar" id="btnGuardar">Guardar</button>
        </article>
  `
}


function mostrarResultado(producto) {
  const resultado = resultados[producto.apto];


  sessionStorage.setItem('productoEscaneado', producto)
  popup.innerHTML = `
    <section class="resto">
      <p class="nombreProducto">${producto.nombre}</p>
      <div class="s&n ${resultado.clase}" id="s&n">${resultado.titulo}</div>
      <p class="lorem" style="width: 79.12vw; font-size: 18px;">${resultado.texto}</p>
      <p class="quest">Sodio cada 100g: ${producto.sodio} mg</p>
    </section>
    <section class="botones">
      <div class="no" id="no">Continuar</div>
      <div class="si" id="si">Guardar</div>
    </section>
  `;
  popup.showModal();
}
async function Guardar() {
  const Producto = sessionStorage.getItem("productoEscaneado")
  popupGuardar.innerHTML = 
  `
      <section class="up">
                <img src="${producto.foto}" class="fto"></img>
                <p class="nombreProducto">${producto.nombre}</p>
                <div class ="apto ${resultados[producto.apto].clase}">${resultados[producto.apto].titulo}</div>
            </section>
            <form class="rest">
                <textarea class="descripcion" name="descripcion" placeholder="Insertar descripción (opcional)"></textarea>
                <p class="divLorem">${resultados[producto.apto].texto}</p>
            </form>
            <article class="contenedor">
            <button type="button"class="cancelar"><img src="../../aComponentes/flechaGuardar.png" class="flechaGuardar"></img></button>
            <button type submit class="btnGuardar" id="btnGuardar">Guardar</button>
        </article>
  `
  const form = document.querySelector(".rest")

  let productoGuardado = {
    barcode: Producto.barcode,
    descripción: form.descripcion.value
  }
  const resultado = await fetch ("http://localhost:3000/scanner/" + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productoGuardado)
  })

if(resultado.status !== 200){
alert("Error al guardar. Por favor, volver a intentar.")
} 
}

document.addEventListener('click', (event) => {
  if (event.target.closest('#si')) {
    popup.close();
    popupGuardar.showModal();
  } else if (event.target.closest('#no')) {
    popup.close();
  } else if (event.target.closest('#btnGuardar')) {
    popupGuardar.close();
  }
});

async function prenderCamara() {
  if ((stream && stream.active) || iniciando) return;
  iniciando = true;

  const nuevoStream = await navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
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

  productoActual = {
    barcode: respuesta.barcode,
    foto: respuesta.foto,
    nombre: respuesta.nombreProducto,
    sodio: respuesta.sodioMg,
    apto: respuesta.apto
  };

  mostrarResultado(productoActual);
}

btnCapturar.addEventListener('click', (event) => {
  event.preventDefault();
  capturar();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    prenderCamara();
  } else {
    apagarCamara();
  }
});

window.addEventListener('beforeunload', apagarCamara);

prenderCamara();
