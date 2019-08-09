class Matrix {
  constructor(lin,col) {
    this.lin = lin
    this.col = col
    this.data = []
    for (let i=0;i<lin;i++){
      let arr = []
      for (let j=0;j<col;j++){
        arr.push(1)
      }
      this.data.push(arr)
    }
  }
  // percorre cada elemento e coloca o f(elemento,i,j)
  static map(A,func){
        let mat = new Matrix(A.lin,A.col)
        mat.data = mat.data.map((array,i)=>{
          return array.map((num,j)=>{
              return func(num,i,j)
          })
        })
        return mat
  }
  map(func){
      this.data = this.data.map((array,i)=>{
        return array.map((num,j)=>{
            return func(num,i,j)
        })
      })
      return this
  }
  static add(A,B){
    var mat = new Matrix(A.lin,A.col)
    mat.map((num,i,j)=>{
      return A.data[i][j]+B.data[i][j]
    })
    return mat
  }
  static arrayToMatrix(arr){
    let mat = new Matrix(arr.length,1)
    mat.map((num,i,j)=>{
      return arr[i]
    })
    return mat
  }
  static mult(A,B){
    var mat = new Matrix(A.lin,B.col)
    mat.map((num,i,j)=>{
      let soma = 0;
      for (let k = 0; k < A.col; k++) {
        soma = soma + A.data[i][k]*B.data[k][j]
      }
      return soma
    })
    return mat
  }
  print(){
    console.table(this.data)
  }
  randomize(){
    this.map((num,i,j)=>{
      return Math.random()*2-1
    })
    return this
  }
  static I(lin,col){
    var mat = new Matrix(lin,col)
    mat.map((num,i,j)=>{
      if(i==j)
      return 1
      return 0
    })
    return mat
  }
  static T(A){
    var mat = new Matrix(A.col,A.lin)
    mat.map((num,i,j)=>{
        return A.data[j][i]
    })
    return mat
  }
}
