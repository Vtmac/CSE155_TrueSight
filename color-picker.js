
var loadFile = function(event) {
  var img = document.getElementById('output');
  img.src = URL.createObjectURL(event.target.files[0]);

  var stdH = 850;
  var canvas = document.getElementById('canvas');
  
  var ctx = canvas.getContext('2d');

  var htmlcode = "<canvas id=canvas" + "></canvas>";

  img.onload = function() {
    //canvas.width = (img.width/img.height) * stdH;
    //canvas.height = stdH;
    img.width = (img.width/img.height) * stdH;
    img.height = stdH;
    canvas.width = img.width;
    canvas.height = img.height;
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
    whox.textContent = canvasPos.left;
    whoy.textContent = canvasPos.top;
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
  var toobar = document.getElementById("toobar");
  toobar.classList.toggle("toolmenu-dark");
  var sel = document.getElementById("selectormain");
  sel.classList.toggle("selectormain-dark");
  var seltoo = document.getElementById("selectortool");
  seltoo.classList.toggle("selectortool-dark");
  var selbox = document.getElementById("selectorbox");
  selbox.classList.toggle("selectorbox-dark");
  var ban = document.getElementById("bann")
  ban.src="titlecol.png";
  if(document.getElementById("slidx").checked == true){
    var ban = document.getElementById("bann")
    ban.src="titlecol-light.png";
  }
}

function lightMode(){
  var toobar = document.getElementById("toobar");
  toobar.classList.toggle("toolmenu");
  var sel = document.getElementById("selectormain");
  sel.classList.toggle("selectormain");
  var seltoo = document.getElementById("selectortool");
  seltoo.classList.toggle("selectortool");
  var selbox = document.getElementById("selectorbox");
  selbox.classList.toggle("selectorbox");
  var ban = document.getElementById("bann")
  ban.src="titlecol-light.png";
}