function  Vetor(x,y,z){
  if(isNaN(x))x=0
  if(isNaN(y))y=0
  if(isNaN(z))z=0
  let self = {x:x,
          y:y,
          z:z,
         add:null,
          mag:null,
          div:null,
          sub:null
         }
    
   
  self.mag =function( ){
    return pow(self.x*self.x+self.y*self.y+self.z*self.z,0.5);
  };
  
  self.sub = function (other){
    return Vetor(self.x+other.x,self.y+other.y,self.z+other.z);
  };
   self.add = function (other){
    return Vetor(self.x-other.x,self.y-other.y,self.z-other.z);
  };
  self.div= function(v){
    return Vetor(self.x/v,self.y/v,self.z/v);
  };
  return self;
  
}
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
    let E = this.point.sub(point);
    if(E.mag()==0){return E;}
    E = E.div(1/this.c*pow(E.mag(),3)*(4*PI*8.85*pow(10,-12)));
    return E;   
  }
  static F(self,other){
    let F =   self.campo(other.point).mult(other.c);
    return F;
  }
    
 
}
