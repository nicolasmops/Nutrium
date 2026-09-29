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
const visor = document.querySelector("#visor");

let escaneando = false; //es let y no const xq su vaor varia

function iniciarScanner() {    //se llama al tocar el btn de la camara
    if (escaneando) return;    //si ya esta activa la camara, se va de la funcion para no iniciar quagga 2 veces
    escaneando = true;

    Quagga.init(     //inicia la librería, que recibe las settigs y una funcion que se ejecuta al finalizar
        {
            inputStream: {    //abre el obj de settings, y dentro de inputStream se define de donde viene la img
                type: "LiveStream",    //dice que es la camara en vivo y no una ft
                target: visor,   //es el elemento donde quagga muestra la camara
                constraints: {    //pedidos que se le hacen al navegador sobre la camara. facingMode: "environment" es para que use la camara trasera, y width y height marcan la resolucion ideal
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            },
            decoder: {    //hay varios formatos de códigos de barras, estas lineas le dicen al programa cuales esta buscando
                readers: ["ean_reader", "ean_8_reader", "upc_reader"]
            },
            locate: true,    //hace que el codigo de barra no tenga que estar centrado para ser captado
            numOfWorkers: navigator.hardwareConcurrency || 2,  //define la cantidad de hilos que se usan para procesar la imagen.
            frequency: 30    //cantidad de frames que analiza por segundo
        },
        (error) => {      // si hay un error, lo muestra en consola y setea escaneado a false para cortar el escaneo
            if (error) {
                console.error(error);
                escaneando = false;
                return;
            }
            Quagga.start();   //inicia el escaneo de la camara
        }
    );
}

function detenerScanner() {
    if (!escaneando) return;
    Quagga.stop();
    escaneando = false;
}

Quagga.onDetected((data) => {
    detenerScanner();
    console.log(data.codeResult.code);
    popup.showModal();
});

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