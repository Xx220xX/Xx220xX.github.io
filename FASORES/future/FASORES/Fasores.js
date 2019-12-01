
let seta = 10;//tamanho da seta
let scl_pix = 360;//
let max_size = 220;// maior fazor a ser representador
let size_text = 14;
let tamanho_linha = 2;
let fundo = 100;
let fasor;


function setup() {
  createCanvas(800,800);
  fasor = {arr:[],};
  fasor.draw = function(){
    for(let i = 0 ;i<fasor.arr.length;i++){
      fasor.arr[i].draw();
    }
  };
  fasor.add = function(name,mag,angle,color = 255,x0=0,y0=0){
     let f;
    for(let i = 0 ;i<fasor.arr.length;i++){
       f = fasor.arr[i];
        if(f.name == name){
          console.log('fasor ja possui referencia');
          return;
        }
      }
    fasor.arr.push(new Fasor(createVector(x0,y0),createVector(mag*cos(angle*PI/180),mag*sin(angle*PI/180)),name,color));
  };
  fasor.show = (i='all')=>{
    if(i=='all'){
      let f;
      for(let i = 0 ;i<fasor.arr.length;i++){
        f = fasor.arr[i];
        console.log('['+i+']'+f.name,'(',f.vet.mag()+'|'+createVector(1,0).angleBetween(f.vet));
      }
    }
  };
  fasor.remove = (name)=>{
    if (typeof(name) =="number"){
      fasor.name.arr.pop(name);
      return;
    }
    let f;
    for(let i = 0 ;i<fasor.arr.length;i++){
       f = fasor.arr[i];
        if(f.name == name){
          fasor.arr.pop(i);
        }
      }
  };
  AddFasor(fasor);
}


function draw() {
   translate(width/2,height/2);
   background(fundo);
   fasor.draw();
}
