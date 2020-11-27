
var loadFile = function(event) {
  var img = document.getElementById('output');
  img.src = URL.createObjectURL(event.target.files[0]);

  var stdH = 750;
  var canvas = document.getElementById('canvas');
  
  
  /*if(img.height > img.width){
    canvas.height = stdH;
    canvas.width = (img.width/img.height) * stdH;
  }else if(img.width > img.height){
    canvas.height = (img.height/img.width) * stdW;
    canvas.width = stdW;
  }else{
    canvas.height = stdH;
    canvas.width = stdH;
  }*/
  
  var ctx = canvas.getContext('2d');

  var htmlcode = "<canvas id=canvas" + "></canvas>";

  img.onload = function() {
    canvas.width = (img.width/img.height) * stdH;
    canvas.height = stdH;
    ctx.drawImage(img, 0, 0, img.width, img.height, 0 , 0, canvas.width, canvas.height);
    img.style.display = 'none';
    
  };
  var hoveredColor = document.getElementById('hovered-color');
  var selectedColor = document.getElementById('selected-color');
  var thex = document.getElementById("x");
  var they = document.getElementById("y");
  var whox = document.getElementById("wx");
  var whoy = document.getElementById("wy");
  var canvasPos = canvas.getBoundingClientRect();

  function pick(event, destination) {
    var x = event.layerX - canvasPos.left;
    var y = event.layerY - canvasPos.top;
    whox.textContent = canvasPos.top;
    whoy.textContent = canvasPos.left;
    they.textContent = y;
    thex.textContent = x;

    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]})`;
    var hex = "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6);
	  destination.style.background = rgba;
    destination.textContent = rgba;
    destination.textContent = hex;

    if(data[0] + data[1] + data[2] >= 256){
      destination.style.color = "black"
    }else{
      destination.style.color = "white"
    }

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

function darkMode(){
  var element = document.getElementById("toobar");
  element.classList.toggle("dark-mode");
}
