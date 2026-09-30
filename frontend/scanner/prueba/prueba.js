const quaggaConfig ={
    inputStream: {
        target: document.getElementById(camara),
        type: "LiveStream",
        constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 }
        }
    },
    decoder: {
        readers: ['code_128_readers']
    }
}
quaggaConfig.init(quaggaConfig, function(err){
    if (err) {
        return console.log(err);
    }
    Quagga.start();
});

Quagga.onDetected(function (result) {
    alert("Detected barcode: " + result.codeResult.code);
});
