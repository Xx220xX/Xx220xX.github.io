

function createPeca(cor,background) {
  let px=pix(cor,true);
      let p =01;// random(0,4);
      if(p==0){
        return new Matrix(2, 2, [px,px,px,px,],0,random(0,9));
      }else if(p==1){
        return new Matrix(3, 3, [px,background,background,
                                px,background,background,
                                px,px,background,],0,random(0,9));                              
      }
}
