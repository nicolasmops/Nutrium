const BTNH = document.getElementById('BTNheight');
const BTNW = document.getElementById('BTNwidth');

const resultH = document.getElementById('resultHeight');
const resultW = document.getElementById('resultWidth');

BTNH.addEventListener('click', function() {
    let pixelesH = document.getElementById('ViewportHeight').value;
    
    if (pixelesH === "" || isNaN(pixelesH)) {
        resultH.textContent = "Ingresa un número";
        return;
    }

    // Cambia 917 por window.innerHeight si prefieres que sea dinámico según la ventana actual
    let height = (Number(pixelesH) / 917) * 100;
    resultH.textContent = `${height.toFixed(2)} vh`;
});

BTNW.addEventListener('click', function() {
    let pixelesW = document.getElementById('ViewportWidth').value;

    if (pixelesW === "" || isNaN(pixelesW)) {
        resultW.textContent = "Ingresa un número";
        return;
    }

    // Cambia 412 por window.innerWidth si prefieres que sea dinámico
    let width = (Number(pixelesW) / 412) * 100;
    resultW.textContent = `${width.toFixed(2)} vw`;
});