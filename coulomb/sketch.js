

var easycam ;
let cargas = [];

 let scale =100;


cargas.getE = function(ponto){
  let E = Vetor(0,0,0);
  for (var i = 0; i < cargas.length; i++) {
    print(E);
    E = E.add(cargas[i].campo(ponto));
  }
  return E;
}
let max = 4;
cargas.draw = function() {
  background(255);
  noStroke();
  for (let i =0; i<max; i++) {
    cargas[i].draw();
  }
};
let pauseDraw=false;

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
  drawOptions(25,80,40,20,'Adicionar carga',4,
              ['x','y','z','intensidade'],
              ()=>{push(); },
              (a)=>{pop();},
             'Adicionar',
             (a,lt)=>{
              ponto =  Vetor(float(lt[0]),float(lt[1]),float(lt[2]));
    
              if(float(lt[3])==0 || isNaN(int(lt[3]))){return;}
              cargas[max] =  new Q(ponto,float(lt[3]));
              max ++; 
              pauseDraw = false;
              a.show("carga adicionada :D");
              a.forceBack();
          },()=>{
    pauseDraw = false;bt.click = false;});     
}
function getE(bt){
   drawOptions(25,80,40,20,'Campo Eletrico',3,
              ['x','y','z'],
              ()=>{push(); },
              (a)=>{pop();},
             'calcular',
             (a,lt)=>{
              ponto =   Vetor(float(lt[0]), float(lt[1]),float(lt[2]));
    
        let E = cargas.getE(ponto)     
          a.show("("+E.x+" , "+E.y+" , "+E.z+"), |E| = "+E.mag());
              pauseDraw = false;
            },()=>{pauseDraw = false;bt.click = false;});                            
  
}


var add;
var div;
function setup() {
  var canvas = createCanvas(500, 500, WEBGL);
  rectMode(CENTER);
  
  easycam = createEasyCam();
  div = createDiv();

  //canvas.position(displayWidth/4,displayHeight/4);
   add = createButton('Adicionar carga');
  var getCampo = createButton('Campo eletrico');
  var delte = createButton('apagar cargas');
  var scale_ma =  createButton('+');
  var scale_mi =  createButton('-');

    add.size(100,100);
    getCampo.size(100,100);
    delte.size(100,100);
    scale_ma.size(50,50);
    scale_mi.size(50,50);
   
  scale_ma.mousePressed(()=>{ scale +=10;;
     scale = constrain(scale, 90,1000);
      div.html('escala: '+scale,false);});
   scale_mi.mousePressed(()=>{ scale -=10;;
     scale = constrain(scale, 90,1000);
      div.html('escala: '+scale,false);});

  add.click = false;
  add.mousePressed(()=>{
    if(add.click||getCampo.click) return;
    add.click = true;
    addC(add);});
  getCampo.mousePressed(()=>{
    if(getCampo.click||add.click) return;
    getCampo.click = true;
    getE(getCampo);
    });
  add.position(0,0);
  getCampo.position(add.x+add.width+3,0);
  delte.position(getCampo.x+getCampo.width+3,0)
  delte.mousePressed(()=>{max = 0;cargas.splice(0, cargas.length);});
  
 
 // for (let i =0; i<max; i++) {
    /*cargas[i] =  Q(createVector(random(-width, width), random(-height, height), random(-height, height)), random(-10, 10));*/
    cargas[0] = new Q( Vetor(10,10,0),-2);
    cargas[1] = new Q( Vetor(-10,-10,0),-1);
    cargas[2] = new Q( Vetor(-10,10,0),1);
    cargas[3] = new Q( Vetor(10,-10,0),2);
 // }
 
  cargas.draw();
  
}



function draw() {
  background(180);
  cargas.draw();
  push();
  stroke(0,210,0);
  line(0,0,0,scale,0,0);
  stroke(210,0,0);
  line(0,0,0,0,scale,0);
  stroke(0,0,210);
   line(0,0,0,0,0,scale);
  pop();
  
}


