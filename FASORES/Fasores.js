
let seta = 10;//tamanho da seta
let scl_pix = 360;//
let max_size = 220;// maior fazor a ser representador
let fasor;
function setup() {
  createCanvas(800,800);
  fasor = {arr:[],};
  fasor.draw = function(){
    for(let i = 0 ;i<fasor.arr.length;i++){
      fasor.arr[i].draw();
    }
  };
  fasor.add = function(name,mag,angle,x0=0,y0=0){
     let f;
    for(let i = 0 ;i<fasor.arr.length;i++){
       f = fasor.arr[i];
        if(f.name == name){
          console.log('fasor ja possui referencia');
          return;
        }
      }
    fasor.arr.push(new Fasor(createVector(x0,y0),createVector(mag*cos(angle*PI/180),mag*sin(angle*PI/180)),name));
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
}


function draw() {
   translate(width/2,height/2);
   background(0);
   //stroke(color(0,255,0));
   //line(0,0,800,0);
   //line(0,0,0,-800);
   //triangle(-seta/2,0,seta/2,0,0,seta);
   fasor.draw();
}
