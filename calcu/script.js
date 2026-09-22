const BTNH = document.getElementById('BTNheight')
BTNH.addEventListener('click', function() {
    let pixelesH = document.getElementById('ViewportHeight').value
    let height = (Number(pixelesH) / 917) * 100
    alert(height)
  });
  const BTNW = document.getElementById('BTNwidth')
BTNW.addEventListener('click', function() {
    let pixelesW = document.getElementById('ViewportWidth').value
    let width = (Number(pixelesW) / 412) * 100
    alert(width)
  });
