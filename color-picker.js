
var loadFile = function(event) {
  var img = document.getElementById('output');
  img.src = URL.createObjectURL(event.target.files[0]);

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  img.onload = function() {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    img.style.display = 'none';
  };
  var hoveredColor = document.getElementById('hovered-color');
  var selectedColor = document.getElementById('selected-color');


  function pick(event, destination) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]})`;
    var hex = "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6);
	  destination.style.background = rgba;
    //destination.textContent = rgba;
    destination.textContent = hex;

	  return hex;
  }

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  canvas.addEventListener('mousemove', function(event) {
	  pick(event, hoveredColor);
  });
  
  canvas.addEventListener('click', function(event) {
	  pick(event, selectedColor);
  });
};

