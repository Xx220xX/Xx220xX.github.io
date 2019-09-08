class Matrix {
  constructor(row, col, el=null, pos_i=0, pos_j=0,next=[]) {
    this.pos_i = int(pos_i);
    this.pos_j = int(pos_j);
    this.last_pos_i = 999;
    this.last_pos_j = 999;
    //this.next.push(this);

    this.row = int(row);
    this.col = int(col);
    this.mat = [];
    let k=0;
    for (let i = 0; i<row; i++) {
      this.mat[i] = [];
      for (let j = 0; j<col; j++) {
        this.mat[i][j] = el?el[k++]:0;
      }
    }
  }
  map(func) {
    let m_ =new Matrix(this.row, this.col);
    m_.mat = m_.mat.map((array, i)=> {
      return array.map((num, j)=> {
        return func(num, i, j);
      }
      );
    }
    );
    return m_;
  }
  at(i, j) {
    return this.mat[i][j];
  }

  insert(m, background) {
    if (m.last_pos_i ==   m.pos_i &&   m.last_pos_j ==  m.pos_j) {
      return;
    }
    for (let i =0; i<m.row; i++) {
      for (let j=0; j<m.col; j++) {
        if (m.mat[i][j].fill) {
          if (i+m.last_pos_i>=0 && i+m.last_pos_i<this.row && j+m.last_pos_j>=0&& j+m.last_pos_j<this.col) {
            this.mat[i+m.last_pos_i][j+m.last_pos_j] = background;
          }
        }
      }
    }
    for (let i =0; i<m.row; i++) {
      for (let j=0; j<m.col; j++) {
        if (m.mat[i][j].fill) {
          if (i+m.pos_i>=0 && i+m.pos_i<this.row && j+m.pos_j>=0&& j+m.pos_j<this.col) {
            this.mat[i+m.pos_i][j+m.pos_j] = m.mat[i][j];
          }
        }
      }
    }
    m.last_pos_i = m.pos_i;
    m.last_pos_j = m.pos_j;
  }
  set(i,j,el){
    this.mat[i][j]=el;
  }
  
  girar(mat, buff, ordem, transposta) {
    let i, j;
    if (transposta == 2) {
        buff[0][0] = mat[0][0];//1=1
        buff[0][1] = mat[0][1];//2=2
        buff[0][2] = mat[2][2];//3=9
        buff[1][0] = mat[1][2];//4=6
        buff[1][1] = mat[1][1];//5=5
        buff[1][2] = mat[1][0];//6=4
        buff[2][0] = mat[2][0];//7=7
        buff[2][1] = mat[2][1];//8=8
        buff[2][2] = mat[0][2];//9=3

        return;
    }
    if (transposta == 3) {
        buff[0][0] = mat[2][0];//1=7
        buff[0][1] = mat[0][1];//2=2
        buff[0][2] = mat[0][2];//3=3
        buff[1][0] = mat[1][2];//4=6
        buff[1][1] = mat[1][1];//5=5
        buff[1][2] = mat[1][0];//6=4
        buff[2][0] = mat[0][0];//7=1
        buff[2][1] = mat[2][1];//8=8
        buff[2][2] = mat[2][2];//9=9
        return;
    }
    for (i = 0; i < ordem; i++) {
        for (j = 0; j < ordem; j++) {
            if (transposta){
                buff[i][j] = mat[j][i];
            }else{
                buff[j][i] = mat[i][ordem - j - 1];
            }
        }
    }
}

  
}

class Tela {
  constructor(wid, hei, x=0, y=0, scl =10) {
    this.width = int(wid);
    this.height = int(hei);
    this.x=int(x);
    this.y=int(y);
    this.scl = int(scl);  
    this.mat = new Matrix(this.width, this.height);
    this.background = pix(color(255), false);
    this.map(()=> {
      return this.background;
    }
    );

    this.draw_ = (el, i, j)=> {
      push();
      fill(el.cor);
      rect(this.x+j*this.scl, this.y+i*this.scl, this.scl, this.scl);
      pop();
    };
  }
  map(func) {
    this.mat = this.mat.map(func);
  }
  insert(m) {
    this.mat.insert(m, this.background);
  }

  canDown(m) {
    for (let j =0; j<m.col; j++) {
      let J = j+m.pos_j;
      if (J>=0 && J<this.mat.col) {
        for (let i = m.row-1; i>=0; i--) {
          if (m.mat[i][j].fill) {
            let I = i+1+m.pos_i;
            if (I<0) {
              break;
            }

            if (I>=this.mat.row) {
              return false;
            }
            if (this.mat.at(I, J).fill) {

              return false;
            }
            break;
          }
        }
      }
    }  
    return true;
  }
  canLeft(m) {
    for (let i =0; i<m.row; i++) {
      let I = i+m.pos_i;

      for (let j =0; j<m.col; j++) {
        if (m.mat[i][j].fill) {
          let J = j-1+m.pos_j;
          if (I<0||I>=this.mat.row) {
          if (J>=0 && J <this.mat.col) {
              return true;
            }
            return false;
          }

          if (J<0) {
            return false;
          }
          if (J<this.mat.col) {
            if (this.mat.at(I, J).fill) {
              return false;
            }
          }
          break;
        }
      }
    }
    return true;
  }
  canRight(m) {
    for (let i =0; i<m.row; i++) {
      let I = i+m.pos_i;

      for (let j =m.col-1; j>=0; j--) {
        if (m.mat[i][j].fill) {
          let J = j+1+m.pos_j;
          if (I<0||I>=this.mat.row) {
          if (J>=0 && J <this.mat.col) {
              return true;
            }
            return false;
          }
  
          if (J>=this.mat.col) {
            return false;
          }
          
            if (this.mat.at(I, J).fill) {
              return false;
            }
          
          break;
        }
      }
    }
    return true;
  }
  verifica_derrota(){
    for(let j=0;j<this.mat.col;j++){
      if(this.mat.at(0,j).fill){
        return true;
      }
    }
    return false;
  }
  verifica_linhas(){
    let k = [];
    let complete = false;
    for (let i=0;i<this.mat.row;i++){
      complete = true;
      for (let j=0;j<this.mat.col;j++){
        if(!this.mat.at(i,j).fill){
          complete =false;
        }
      }
      if(complete){
        k.push(i);
      }
    }
     
    for (let i=0;i<k.length;i++){

      for(let j = 0;j<this.mat.col;j++){
          this.mat.set(k[i],j,this.background);
      }
    }
     for (let i=0;i<k.length;i++){
      for(let ii = k[i];ii>=1;ii--){
        let tmp = this.mat.mat[ii];
        this.mat.mat[ii] = this.mat.mat[ii-1];
        this.mat.mat[ii-1] = tmp;
      }
    }
    return k.length;
  }
  draw() {
    for (let i = 0; i<this.mat.row; i++) {
      for (let j = 0; j<this.mat.col; j++) {
        this.draw_(this.mat.at(i, j), i, j);
      }
    }
    push();
    noFill();
    stroke(0);
    rect(this.x, this.y, this.scl*this.mat.col, this.scl*this.mat.row);
    pop();
  }
  setDraw(f) {
    draw_ = ()=> {
      f(elm, i, j);
    };
  }
}
function pix(color, fill) {
  return {
  cor: 
    color, 
    fill:
    fill,
  };
}
