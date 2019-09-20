let n = 140;
let pregos;
let radius;
let radius_circle;
let defasagem = 0;

let txt;
let acao = 0;

let img;
let imgFINAL;
let last = 0;
let stop =false;

let filter = [2,230];
let inverse = false;

let iteracao = 0;
//let img2;
function preload() {
 // img2 = loadImage('imagens/hehe.jpg');
  img = loadImage('imagens/im.jpg');

}

function keyPressed() {
 /* if (keyCode === LEFT_ARROW) {
    acao = constrain(acao - 1, 0, partes.length-1);
  } else if (keyCode === RIGHT_ARROW) {
    acao = constrain(acao + 1, 0,  partes.length-1);
  } else if (keyCode === ENTER) {
    partes[acao]();
  }else*/ 
  if(key ==='a'){
  /*  img2.loadPixels();
    img = img2;

*/

  }
 
}
function keyTyped() {
  if (key === 's') {
    imgFINAL.save('photo', 'png');
  }
}
function setup() {
  createCanvas(600, 600);
  radius = int(sqrt(width * width / 16 + height * height / 16));
  radius_circle = radius;
  txt = createDiv();
  txt.position(0, height - 18);
  
  partes[0]();
  imgFINAL = createImage(2 * radius, 2 * radius);
  imgFINAL.resize(2 * radius, 2 * radius);
  imgFINAL.loadPixels();
  //randomize(imgFINAL);
  imgFINAL.updatePixels();
  img.resize(2 * radius, 2 * radius);
  img.loadPixels();

  // pixel = img.
  partes[1]();
  last = 0;
}

function draw() {

  background(255);
 
  translate(width / 2-radius, height / 2-radius);
 //tint(255, 127); 
 // image(img, 0, 0);

 

  push();
  pregos.draw();
  pop();
   image(imgFINAL, 0, 0);
  txt.html(acao + " raio: " + radius + "<p>"+iteracao+"</p>" + int(getFrameRate()) + " fps  phase: "+defasagem);
 if(stop){
 	return;
 }
  if(last == 2){
  	partes[2]();
  	acao = 2;
  	last = 0;
  }else if(last == 1){
  	partes[1]();
  	acao = 1;
  	last =0;

  }
 
}
