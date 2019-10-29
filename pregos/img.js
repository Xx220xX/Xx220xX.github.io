function writeColor(image, x, y, red, green, blue, alpha=1) {
    if(x<0||x>=image.width || y<0||y>=image.height  ){
		return;
	}
   /* let index = (x + y * width) * 4;
    image.pixels[index] = red;
    image.pixels[index + 1] = green;
    image.pixels[index + 2] = blue;
    image.pixels[index + 3] = alpha;
*/  image.set(x, y, color(red, green, blue));
  }

function getPix(image,x,y){
if(x<0||x>=image.width || y<0||y>=image.height  ){
		return{cinza:0,r:0,g:0,b:0};
	}
    //let index = (x + y * image.width) * 4;
/*
    let p = {r : image.pixels[index],
      g : image.pixels[index + 1],
      b:image.pixels[index + 2],
      alpha :image.pixels[index + 3],
     
    };*/
    let p =  image.get(x, y);
    if(inverse){
	     p.cinza = map((p[0]+p[1]+p[2])/3,0,255,255,0);
	 }else{
	 	p.cinza =(p[0]+p[1]+p[2])/3;
	 }
     if(p.cinza<filter[0]||p.cinza>filter[1]){
     	p.cinza = 0;
     }

    return p;
}
function randomize(img){
  let x, y;
  // fill with random colors
  for (y = 0; y < img.height; y++) {
    for (x = 0; x < img.width; x++) {
      let red = random(255);
      let green = random(255);
      let blue = random(255);
      let alpha = 1;
      writeColor(img, x, y, red, green, blue, alpha);
   
    }
  }
  img.updatePixels();
}
function ft(x0,y0,xf,yf){
let x = xf-x0;
let y=yf-y0;
let abs = sqrt(x*x+y*y);
x = x/abs;
y = y/abs;
let x_ = x0;
let y_ = y0;
return [(t)=>{
  return [int(x_+t*x),int(y_+t*y),];
},abs,];


}
function delLine(img,x0,y0,xf,yf,pontos=img.width){
	copyLine(imgFINAL,img,x0,y0,xf,yf);
	//print('copiado');
	//noLoop();
	let f = ft(x0,y0,xf,yf);
 	let passo = 1/pontos ;
  	let x;
  	for (let t = 0; t < 1; t+=passo) {
    	x = f[0](t);
    	if(inverse){
	    	writeColor(img,x[0],x[1],255,255,255,0);
	    }else{
	    	writeColor(img,x[0],x[1],0,0,0,0);
	    }
  	}
  	img.updatePixels();
}
function copyLine(imgbuff,img,x0,y0,xf,yf,pontos=img.width){
let f = ft(x0,y0,xf,yf);
 	let passo = f[1]/pontos ;
  	let x;
  	for (let t = 0; t < f[1]; t+=passo) {
    	x = f[0](t);
	  	let c = getPix(img,x[0],x[1]);
    	writeColor(imgbuff,x[0],x[1],c[0],c[1],c[2]);
    	
  	}
  	imgbuff.updatePixels();
  	
}
function getMidLine(image,x0,y0,xf,yf,pontos=image.width){
  let soma = 0;//minimo valor possivel;
  let f = ft(x0,y0,xf,yf);
  let passo = f[1]/pontos ;
  let x;
  for (let t = 0; t < f[1]; t+=passo) {
    x = f[0](t);
    soma +=  getPix(image,x[0],x[1]).cinza;
  }
   
  soma = soma/pontos;
  
  return soma;
}
