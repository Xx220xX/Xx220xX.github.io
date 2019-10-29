
class Fasor{
  constructor(Pi,Pf,name,color = 255){
    this.name = name;
    this.x0 = Pi.x;
    this.y0 = Pi.y;
    this.vet = createVector(Pf.x - this.x0,Pf.y-this.y0);
    this.vet.setMag(map(this.vet.mag(),0,max_size,0,scl_pix));
    this.s1 = this.vet.copy();
    this.s2 = this.vet.copy();
    this.s1.rotate(5/4*PI);
    this.s2.rotate(-5/4*PI);
    this.color = color;
    this.update();
  }
  update(){
    this.s1.setMag(seta);
    this.s2.setMag(seta);
  }
  draw(){
    push();
    stroke(this.color);
    strokeWeight(tamanho_linha);
    line(this.x0,-this.y0,this.vet.x+this.x0,-this.vet.y-this.y0);
    translate(this.vet.x+this.x0,-this.vet.y-this.y0);
    line(0,0,this.s1.x,-this.s1.y);
    line(0,0,this.s2.x,-this.s2.y);
    textSize(size_text);
    text(this.name, 0,0);
    pop();
  }
}
