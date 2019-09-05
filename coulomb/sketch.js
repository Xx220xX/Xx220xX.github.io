
let cargas = [];
let max = 2;
cargas.draw = function() {
  background(255);
  noStroke();
  for (let i =0; i<max; i++) {
    cargas[i].draw();
  }
};
let pauseDraw=false;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function drawOptions(x,y,x2,y2,titulo,
                      n_options,
                      textos/*para cada opcao*/,
                      action_begin,
                      action_finish,
                      texto_botao,action_submit, back){
  
  if(action_begin){
      action_begin();
  }
  let a = {
    title: createElement('h3', titulo),
    opt:[],
    len:n_options,
    button:createButton(texto_botao),
    back:createButton('voltar'),
    show:null,
    janela:createElement('h4',''),
    forceBack:()=>{a.remove();back()},
    remove:null
  }
  a.title.position(x,y);
   
  for(let i=0;i<a.len;i++){
    a.opt[i]={
      texto: createElement('h3', textos[i]),
      inp :  createInput()
      
    } 
 
   
  }
   y = y + a.title.height+4;
  
  for(let i=0;i<a.len;i++){
    a.opt[i].inp.position(x,y+y2);
    a.opt[i].texto.position(x+ a.opt[i].inp.width+3,y);
    y = y +  a.opt[i].texto.height+2;
  }
  let conner_option = 0;
  if(a.len>0){
      conner_option =  a.opt[0].inp.width;
  }
  a.button.position(x,y+y2);
  a.back.position( x+conner_option-a.back.width,y+y2);
  a.janela.position( x+x2,y+y2+  a.back.height);
  a.back.mousePressed(()=>{a.remove();back();});
  a.button.mousePressed(()=>{
    let lt = [];
    for(let i=0;i<a.len;i++){
      lt[i] =a.opt[i].inp.value();
    }
    action_submit(a,lt);
  });
  a.remove = function(){
    for(let i=0;i<a.len;i++){
       a.opt[i].texto.remove();
       a.opt[i].inp.remove();
    } 
    a.title.remove();
    a.janela.remove();
    a.button.remove();
    a.back.remove();
  }
  a.show= function(txt){
       a.janela.html(txt);
  };
  
  if(action_finish){
    action_finish(a);
  }
}
function addC(bt){
  drawOptions(25,60,40,20,'Adicionar carga',4,
              ['x','y','z','intensidade'],
              ()=>{push(); },
              (a)=>{pop();},
             'Adicionar',
             (a,lt)=>{
              ponto = createVector(int(lt[0]),-int(lt[1]),int(lt[2]));
              cargas[max] = new Q(ponto,int(lt[3]));
              max ++; 
              pauseDraw = false;
              a.show("carga adicionada :D");
              a.forceBack();
          },()=>{console.log("forcado");
    pauseDraw = false;bt.click = false;});     
}
function getE(bt){
   drawOptions(25,60,40,20,'Campo Eletrico',3,
              ['x','y','z'],
              ()=>{push(); },
              (a)=>{pop();},
             'calcular',
             (a,lt)=>{
              ponto = createVector(int(lt[0]),                                                   int(lt[1]),                                                   int(lt[2]));
    
        let E = createVector(0,0,0);
        for (let i =0; i<max; i++) {
            E.add(cargas[i].campo(ponto));
        }
                
          a.show("("+E.x+" , "+E.y+" , "+E.z+"), |E| = "+E.mag());
              pauseDraw = false;
            },()=>{pauseDraw = false;bt.click = false;});                            
  
}



function setup() {
  var canvas = createCanvas(displayWidth, displayHeight, WEBGL);
  
  //canvas.position(displayWidth/4,displayHeight/4);
  var add = createButton('Adicionar carga');
  var getCampo = createButton('Campo eletrico');
  add.click = false;
  add.mousePressed(()=>{
    if(add.click||getCampo.click) return;
    add.click = true;
    addC(add)});
  getCampo.mousePressed(()=>{
    if(getCampo.click||add.click) return;
    getCampo.click = true;
    getE(getCampo)});
  add.position(0,0);
  getCampo.position(add.x+add.width,0);
  
 
  for (let i =0; i<max; i++) {
    /*cargas[i] = new Q(createVector(random(-width, width), random(-height, height), random(-height, height)), random(-10, 10));*/
    cargas[i] = new Q(createVector(0,0,0),1);
  }
  angleMode(DEGREES);
  cargas.draw();
  
}


let k = 0 ;
function draw() {
  
  scale(5);
  if(pauseDraw){
    return;
  }
  if(random()%4){
      rotateX(k);
  }
  
  if(random()%4){
      rotateY(k);
  }
  
  if(random()%4){
      rotateZ(k);
  }
  cargas.draw();
  
  push();
  stroke(144,238,144);//verde x
  line(0, 0,0, width*0.1, 0,0);
  
  stroke(255,105,97);//vermelho z
  line(0, 0, 0, 0,0,height*0.1);
  
  stroke(170,216,250);//azul y
  line(0, 0, 0, 0,-height*0.1,0);
  
  noStroke();
  fill(170,216,250)
  push();
    translate(0,-height/10,0);
    rotateX(180)
    cone(width*0.005, height*0.01);
  pop();
  
  push()
    fill(144,238,144);
    translate(width*0.1,0,0);
    rotateZ(-90);
    cone(width*0.005, width*0.01);
  pop();
  
  push()
    fill(255,105,97);
    translate(0,0,height*0.1);
    rotateX(90);
    cone(width*0.005, width*0.01);
  pop();
  pop();
  k+=0.1;
  if(k>100){
    k=0;
  }
}


