var tela;
var tela2;
var peca;
var tempo = 1000;
var last_tempo=0;
var nivel = 0;
var linhas = 0;
var pontos = 0;
var derrota =false;
var pausa = 0;
var nivel_0=0;
function setup() {
  createCanvas(600, 800);
  createGame();
}
var last = {w:
0, a:
0, s:
0, 
  d:
0, 
  time:
50, };

function keypress() {
  if (keyIsDown(UP_ARROW)) {
    if (millis()-last.w>100) {
      tela.canGirar(peca);
      last.w = millis();
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (millis()-last.s>last.time/2) {
      if (tela.canDown(peca)) {
        peca.pos_i++;
      } else {
        onTouchBotom();
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

function keyPressed() {
  if (key == ' ') {
    pausa = !pausa;
    return;
  }
  if (keyCode == LEFT_ARROW||keyCode == RIGHT_ARROW||keyCode == UP_ARROW||keyCode == DOWN_ARROW) {
    return;
  }
  if (derrota) {
    createGame();
    derrota =false;
  }
}

function draw() {

  if (derrota) {
    push();
    fill(color(255, 0, 0));
    textSize(52);
    text('FIM DE JOGO', width/3, height/2);
    fill(0);
     textSize(40);
    text('Pressione qualquer tecla', width/5, height/2+40);
    text('para começar novamente', width/5, height/2+80);
    pop();
    return;
  }

  if (pausa) {
    push();
    fill(0);
    textSize(52);
    text('PAUSE:', width/2, height/2);
    pop();
    return;
  }
  background(255);
  stroke(200, 200, 200);
  keypress();
  tela.insert(peca);
  tela2.insert(peca2);
  tela.draw();
  tela2.draw();
  fill(0);
  textSize(24);
  text('Nivel : '+nivel, 10, 40);
  text('Linhas:'+linhas, 10, 70);
  text('Pontos:'+pontos, 10, 100);
  if (millis()-last_tempo>tempo) {
    if (tela.canDown(peca)) {
      peca.pos_i++;
    } else {
      onTouchBotom();
    }
    last_tempo= millis();
  }
}
function onTouchBotom() {
  derrota = tela.verifica_derrota();
  let lines = tela.verifica_linhas();
  linhas +=lines;
  variaPeca(peca2);
  nivel = floor(linhas/10)+nivel_0;
  pontos += lines * nivel*0.9; 
  tempo = 1000 - 999*(1- exp(-0.16667*nivel));
  peca = peca2;
  peca2 = createPeca(color(getRandomInt(0, 240), getRandomInt(0, 240), getRandomInt(0, 240)), tela.background);
  tela2.map(()=> {
    return tela2.background;
  }

  );
}

function createGame() {
  tela = new Tela(20, 10, width*0.19, 50, 30);
  tela2 = new Tela(4, 4, width*0.19+11*30, 50, 20);
  peca = createPeca(color(random(255), random(255), random(255)), tela.background);
  peca2 = createPeca(color(random(255), random(255), random(255)), tela.background);
  tela.insert(peca);
  tela2.insert(peca2);
  tela.draw();
  tela2.draw();
  tempo = 1000 - 999*(1- exp(-0.16667*nivel));
  nivel = nivel_0;
  pontos = 0;
}
