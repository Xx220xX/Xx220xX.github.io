// to run ctrl alt l
  // to stop ctrl alt q


var _text;
var travado = false
function setup() {
	createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);

	_text = createGraphics(window.innerWidth - 4, window.innerHeight - 4);
	_text.textFont('Source Code Pro');
	_text.textAlign(CENTER);
	_text.textSize(133);
	_text.fill(0);
	_text.text('Xx220xX', width * 0.5, height * 0.5);

}
function mouseClicked() {
    travado = !travado;
}
function draw() {
	background(217);
	texture(_text);
   
    if(travado){
      rotateY(map(mouseX, width,0,0,3));
	  rotateX(map(mouseY, 0,height,0,3));
      plane(window.innerWidth - 4, window.innerHeight - 4);}
  else{
     let time = millis();
    rotateX(time / 1000);
    rotateZ(time / 1234);
    rotateY(sin(time / 750));
    
  	box(window.innerWidth - 4, window.innerHeight -88)
  
  }
}
