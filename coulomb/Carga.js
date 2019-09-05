class Q {
  
  constructor(point, charge) {
    this.point = point;
    this.c = charge;
  }
  draw() {
    if (this.c<0) {
      fill(0, 0, 255);
    } else { 
      fill(255, 0, 0);
    }
    push();
    translate(this.point.x, this.point.y, this.point.z);
    sphere(5);
    pop();
  }
   campo(point){
    let E = point.sub(this.point);
    if(E.mag()==0){return E;}
    E = E.div(pow(E.mag(),3)*(4*PI*8.85*pow(10,-12)));
    return E;   
  }
  static F(self,other){
    let F =   self.campo(other.point).mult(other.c);
    return F;
  }
    
 
}