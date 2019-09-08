
function getRandomInt(min, max) {
    return Math.floor(map(random()*100,0,101,min,max));
}
function variaPeca(p){
  p.pos_i=-4;
  p.pos_j = 5;
}
function createPeca(cor,bk) {
  let px=pix(cor,true);
      let p = getRandomInt(0,7);
      if(p==0){
        return new Matrix(2, 2, [px,px,px,px,],1,1);//square
      }else if(p==1){
        return new Matrix(3, 3, [bk,px,bk,// L- right
                                bk,px,bk,
                                bk,px,px,],1,1);                              
      }else if (p==2){
          return new Matrix(4, 4, [ bk,bk,bk,bk,// pipe
                                bk,bk,bk,bk,
                                px,px,px,px,
                                bk,bk,bk,bk,],0,0,true);                  
      
      }else if(p==3){
        return new Matrix(3, 3, [bk,px,bk, // L - left
                                bk,px,bk,
                                px,px,bk,],1,1,0);                              
      }else if(p==4){
        return new Matrix(3, 3, [bk,px,px, //z -right
                                px,px,bk,
                                bk,bk,bk,],1,1,2);                              
      }else if(p==5){
        return new Matrix(3, 3, [px,px,bk, // z- left
                                bk,px,px,
                                bk,bk,bk,],1,1,3);                              
      }else if(p==6){
        return new Matrix(3, 3, [bk,bk,bk,  // T
                                px,px,px,
                                bk,px,bk,],1,1,0);                              
      }
}
