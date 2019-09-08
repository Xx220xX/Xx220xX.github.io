var tela;
var peca;
var tempo = 1000;
var last_tempo=0;
var level = 0;
var linhas = 0;

var derrota =false;


function setup() {
  createCanvas(600, 801);
  tela = new Tela(20, 10, width*0.4, 50, 30);
  peca = createPeca(color(random(255), random(255), random(255)),tela.background);
  tela.insert(peca);
  tela.draw();
}
var last = {w:0,  a:0,  s:
0, 
  d:
0, 
  time:
50, };

function keypress() {
  if (keyIsDown(UP_ARROW)) {
    if (millis()-last.w>last.time) {
      peca.pos_i--;
      last.w = millis();
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (millis()-last.s>last.time) {
      if (tela.canDown(peca)) {
        peca.pos_i++;
      }
      last.s = millis();
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (millis()-last.a>last.time) {
      if (tela.canLeft(peca)) {
        peca.pos_j--;
      }
      last.a = millis();
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (millis()-last.d>last.time) {
      if (tela.canRight(peca)) {
        peca.pos_j++;
      }
      last.d = millis();
    }
  }
}

function draw() {
  if(derrota){
    return;
  }
  background(255);
  stroke(200,200,200);
  keypress();
  tela.insert(peca);
  tela.draw();
  fill(0);
  textSize(32);
  text('linhas:'+linhas, 10, 40);
  if(millis()-last_tempo>tempo){
    if(tela.canDown(peca)){
      peca.pos_i++;
    }else{
      derrota = tela.verifica_derrota();
      linhas += tela.verifica_linhas();
      peca = createPeca(color(random(255), random(255), random(255)),tela.background);
    }
    last_tempo= millis();
  }
}
