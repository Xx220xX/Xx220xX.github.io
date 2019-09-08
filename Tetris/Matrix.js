class Matrix {
  constructor(row, col, el=null, pos_i=0, pos_j=0, transp=false) {
    this.pos_i = int(pos_i);
    this.pos_j = int(pos_j);
    this.last_pos_i = 999;
    this.last_pos_j = 999;
    this.transposta =transp;
    this.last = null;
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
   print(){
    console.table(this.mat);
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
  set(i, j, el) {
    this.mat[i][j]=el;
  }

  girar() {
    let buffe = new Matrix(this.row, this.col);// must be square
    let buff = buffe.mat;
    let mat = this.mat;
    let i, j;
    if (this.transposta == 2) {
      buff[0][0] = mat[0][0];//1=1
      buff[0][1] = mat[0][1];//2=2
      buff[0][2] = mat[2][2];//3=9
      buff[1][0] = mat[1][2];//4=6
      buff[1][1] = mat[1][1];//5=5
      buff[1][2] = mat[1][0];//6=4
      buff[2][0] = mat[2][0];//7=7
      buff[2][1] = mat[2][1];//8=8
      buff[2][2] = mat[0][2];//9=3
    } else if (this.transposta == 3) {
      buff[0][0] = mat[2][0];//1=7
      buff[0][1] = mat[0][1];//2=2
      buff[0][2] = mat[0][2];//3=3
      buff[1][0] = mat[1][2];//4=6
      buff[1][1] = mat[1][1];//5=5
      buff[1][2] = mat[1][0];//6=4
      buff[2][0] = mat[0][0];//7=1
      buff[2][1] = mat[2][1];//8=8
      buff[2][2] = mat[2][2];//9=9
    } else {
      for (i = 0; i < this.row; i++) {
        for (j = 0; j < this.col; j++) {
          if (this.transposta==true) {
            buff[i][j] = mat[j][i];
          } else {
            buff[j][i] = mat[i][this.col - j - 1];
          }
        }
      }
    }
    this.last = this.mat;
    this.mat = buff;
    return true;
  }
}
