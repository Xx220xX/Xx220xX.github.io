function generateLine(x,y){
	return {cor:0,x:false,y:false,existe:false,soma:0,x0:x,y0:y,};
}
class Prego {
  constructor(x, y, r = 2, cor = 255) {
    this.color = cor;
    this.x = x;
    this.y = y;
    this.line ={existe:false,x:0,y:0};
    this.lines = [];
    this.radius = r
  }
  static arr(n, w, h, r = 2) {
    let a = [];
    n = abs(n);
    for (let i = 0; i < n; i++) {
      a[i] = new Prego(random(-w + 1, w - 1), random(-h + 1, h + 1), r);
    }
    a.draw = function() {
      for (let i = 0; i < a.length; i++) {
            a[i].draw();
      }
    };
    a.startLine = function(){
    	for (let i = 0; i < a.length; i++) {
			a[i].line= generateLine(this.x,this.y);
	    }
    };
    a.endLines= function(){
		for (let i = 0; i < a.length; i++) {
			a[i].endLines();
	    }
	};
    return a;
  }
  draw() {
    push();
    stroke(this.color);
    this.x = int(this.x);
    this.y = int(this.y);
   // rect(this.x,this.y,this.radius,this.radius);
   stroke(0);
    ellipse(this.x,this.y, this.radius);
    if(this.line.existe=== true){
    	line(this.x,this.y,this.line.x,this.line.y);
    }/*
    for (let i = 0;i<this.lines.length;i++) {
    	if(this.lines[i].existe=== true){
	    	line(this.lines[i].x0,this.lines[i].y0,this.lines[i].x,this.lines[i].y);
	    }
    }*/
   // rect(0,0,this.radius,this.radius);
    pop();
  }
  endLines(){
  	this.line.x0=this.x;
  	this.line.y0=this.y;

  	this.lines.push(this.line);
  	this.line = generateLine(0,0);


  }
}









