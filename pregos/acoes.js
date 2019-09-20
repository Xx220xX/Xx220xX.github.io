var partes = [];

partes[0] = (() => {
  pregos = Prego.arr(n, width/2 , height/2);
  last =1;
});

partes[1] = ((f=false,numeroPorVez = n/10+1) => { //organiza-los
  let d_teta = 2 * PI / n;
  let dr = pregos.draw;
  let i = 0;
  let cor = false;
  pregos.draw = () => {
  	while(numeroPorVez>0){
	    pregos[i].x = radius_circle * cos(d_teta * i+defasagem)+radius;
	    pregos[i].y = radius_circle * sin(d_teta * i+defasagem)+radius;
	    pregos[i].color = color(255, 0, 0);
	    dr();
	    i++;
	    if (i >= pregos.length) {
	      pregos.draw = dr;
	      if(f){
	      	f();
	      }
	      last =2;
	      return;
	    }
	  	numeroPorVez--;
	}
	numeroPorVez = 10;
  };

});
partes[2]= function(numeroPorVez = 2){
	pregos.startLine();
	let aux = [];
	for (let i =0 ;i<pregos.length;i++){
		aux.push(i);
	}
	let pregoBase = [];
	while(aux.length>0){
		let i = int(random(0,aux.length));
		pregoBase.push(aux[i]);
		aux.splice(i, 1); 
	}
   let ib = pregoBase.splice(0,numeroPorVez);
	let ldraw = pregos.draw ;
	let j=0;

	let tmp =0; // soma temporaria
	let alet =int(random(aux.length/2,aux.length));

	pregos.draw = function (){
 
		for (let i = 0; i < ib.length; i++) {
			if(ib[i]== j){
				continue;
			}
			tmp = getMidLine(img,pregos[ib[i]].x,pregos[ib[i]].y,pregos[j].x,pregos[j].y);
			if(tmp>pregos[ib[i]].line.soma){
				pregos[ib[i]].line.soma = tmp;
				pregos[ib[i]].line.x = pregos[j].x;
				pregos[ib[i]].line.y = pregos[j].y;
				pregos[ib[i]].line.existe = true;
			}
			stroke(255,0,0);
			line(pregos[ib[i]].x,pregos[ib[i]].y,pregos[j].x,pregos[j].y);
		}
		j++;
		ldraw();
		if(j>=pregos.length){
			for (let i = 0; i < ib.length; i++) {
				if(pregos[ib[i]].line.existe){
					
					line(pregos[ib[i]].x,pregos[ib[i]].y,pregos[ib[i]].line.x,pregos[ib[i]].line.y);
					delLine(img,pregos[ib[i]].x,pregos[ib[i]].y,pregos[ib[i]].line.x,pregos[ib[i]].line.y);
				}
			}
			ib = pregoBase.splice(0,numeroPorVez);
			j=0;
			if(ib.length<=alet){
				pregos.draw = ldraw;
				pregos.endLines();
				defasagem = random(0,PI);
				//radius_circle = radius_circle*0.9;
				iteracao++;
				if(iteracao>=5){
					stop =true;
				}
				if(radius_circle<radius/2){
					stop = true;
				}
				last = 1;
			}
		}

	};

};
