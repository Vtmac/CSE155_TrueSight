
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
  var hsl = document.getElementById('hsl');
  var rgb = document.getElementById('rgb');
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

  function RGB(event, destination) {
    var x = event.layerX - canvasPos.left;
    var y = event.layerY - canvasPos.top;
    whox.textContent = canvasPos.left;
    whoy.textContent = canvasPos.top;
    they.textContent = y;
    thex.textContent = x;

    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]})`;
    var rgb_color = data[0] + "," +  data[1] + "," + data[2];
    
    destination.style.background = rgba;
    destination.textContent = rgba;
    destination.textContent = rgb_color;

    if(data[0] + data[1] + data[2] >= 256){
      destination.style.color = "black"
    }else{
      destination.style.color = "white"
    }
    return rgb_color;
  }

  function HSL(event, destination) {
    var x = event.layerX - canvasPos.left;
    var y = event.layerY - canvasPos.top;
    whox.textContent = canvasPos.left;
    whoy.textContent = canvasPos.top;
    they.textContent = y;
    thex.textContent = x;

    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]})`;
    var hsl = RGBToHSL(data[0], data[1], data[2]);

    destination.style.background = rgba;
    destination.textContent = rgba;
    destination.textContent = hsl;

    if(data[0] + data[1] + data[2] >= 256){
      destination.style.color = "black"
    }else{
      destination.style.color = "white"
    }
    return hsl;
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
    HSL(event, hsl);
    RGB(event, rgb);
  });

  /* canvas.addEventListener('click', function(event){
    HSL(event, hsl);
  }); */

  /* canvas.addEventListener('click', function(event){
    RGB(event, rgb);
  }); */
  
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
  ban.src="titlecol-light.png";
  if(document.getElementById("slidx").checked == true){
    var ban = document.getElementById("bann")
    ban.src="titlecol.png";
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

function RGBToHSL(r,g,b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0)
      h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  hsl = h + "%," + s + "%," + l + "%";
  return hsl;
}