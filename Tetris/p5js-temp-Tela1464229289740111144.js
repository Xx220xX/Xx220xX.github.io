
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
  canGirar(m) {
    m.girar();
    //deletar posicao antiga
    //ver se cabe a posicao nova

    for (let i =0; i<m.row; i++) {
      if(i+m.pos_i<0){
        continue;
      }
      for (let j =0; j<m.col; j++) {
        if (m.mat[i][j].fill) {//se girada é preenchida
          // verifcar se a anterior tem pixel no mesmo lugar
          if (m.last[i][j].fill) {
            continue;
          }
          // verificar se o pixel vai ocupar uma posicao invalida
          if(i+m.pos_i>=this.mat.row||j+m.pos_j<0||j+m.pos_j>=this.mat.col){
              // NAO PODE GIRAR
              console.log(i+m.pos_i<0,i+m.pos_i>=this.mat.row ,j+m.pos_j<0,j+m.pos_j>=this.mat.col);
              console.log(i, m.pos_i ,j,m.pos_j);
              m.mat = m.last;
              return -1;
          } 
          // verificar se o pixel vai ocupar uma posicao ja preenchida por outra coisa
          if(this.mat.at(i+m.pos_i,j+m.pos_j).fill){
           // NAO PODE GIRAR
              m.mat = m.last;
              return -2;
          }
        }
      }
    }
    
    // passou nos testes 
    // apagar a antiga e colocar a nova sem medo
    
    for (let i =0; i<m.row; i++) {
      for (let j =0; j<m.col; j++) {
        if(i+m.pos_i<0||i+m.pos_i>=this.mat.row ||j+m.pos_j<0||j+m.pos_j>=this.mat.col){
                    console.log('pulei');
          continue;
        }
        if(m.last[i][j].fill){
          console.log('achei');
          this.mat.mat[i+m.pos_i][j+m.pos_j] = this.background;
      
        }        
        if(m.mat[i][j].fill){
          this.mat.mat[i+m.pos_i][j+m.pos_j] = m.mat[i][j];
        }        
      }
    }
    
    this.draw();
    return 1;
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
  verifica_derrota() {
    for (let j=0; j<this.mat.col; j++) {
      if (this.mat.at(0, j).fill) {
        return true;
      }
    }
    return false;
  }
  verifica_linhas() {
    let k = [];
    let complete = false;
    for (let i=0; i<this.mat.row; i++) {
      complete = true;
      for (let j=0; j<this.mat.col; j++) {
        if (!this.mat.at(i, j).fill) {
          complete =false;
        }
      }
      if (complete) {
        k.push(i);
      }
    }

    for (let i=0; i<k.length; i++) {

      for (let j = 0; j<this.mat.col; j++) {
        this.mat.set(k[i], j, this.background);
      }
    }
    for (let i=0; i<k.length; i++) {
      for (let ii = k[i]; ii>=1; ii--) {
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

class Pixel{
  constructor(color,fill){
    this.cor = color;
    this.fill=fill;
  }
  
}
Pixel.prototype.toString = function(){
  return this.fill?"1":"0";  
};
function pix(color, fill) {
  return new Pixel(color,fill);
}
