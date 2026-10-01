document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
        el.addEventListener('click', () => {
            window.location.href = el.dataset.href;
        });
    });
});

const popup = document.getElementById("popup");
const popupGuardar = document.getElementById("popupGuardar");
const btnEscanear = document.getElementById("btnEscanear");
const siButton = document.getElementById("si");
const noButton = document.getElementById("no");
const guardarButton = document.getElementById("btnGuardar");
const visor = document.getElementById("visor");

let escaneando = false; //es let y no const xq su vaor varia
const quaggaConf = {
    inputStream: {
        target: visor,
        type: "LiveStream",
        constraints: {
            width: { min: 1280 },
            height: { min: 720 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 }
        }
    },
    decoder: {
        readers: ['ean_reader']
    },
}
function iniciarScanner() {    //se llama al tocar el btn de la camara
    if (escaneando) return;    //si ya esta activa la camara, se va de la funcion para no iniciar quagga 2 veces
    escaneando = true;
    Quagga.init(quaggaConf, function (err) {
        if (err) {
            return console.log(err);
        }
        Quagga.start();
        console.log("quagga")
    });

   
}
Quagga.onDetected(function (result) {
    console.log(result.codeResult.code)
    alert("Detected barcode: " + result.codeResult.code);
});
function detenerScanner() {
    if (!escaneando) return;
    Quagga.stop();
    escaneando = false;
}


function funcionAbrirGuardar() {
    popup.close();
    popupGuardar.showModal();
}

function funcionCerrar() {
    popup.close();
    iniciarScanner();
}

function funcionGuardar() {
    popupGuardar.close();
    iniciarScanner();
}

btnEscanear.addEventListener("click", iniciarScanner);
siButton.addEventListener("click", funcionAbrirGuardar);
noButton.addEventListener("click", funcionCerrar);
guardarButton.addEventListener("click", funcionGuardar);