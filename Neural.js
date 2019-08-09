function sigmoid(t) {
  return 1/(1+Math.exp(-t))
}
class Neural{
  constructor(inp_n,hide_n,out_n){
/** numero de nos */
    this.inp_n = inp_n // numero de entradas (sensores)
    this.hide_n = hide_n // numero de hides (nao faço ideia)
    this.out_n = out_n// numero de saidas (acoes)
/** criando o bias (conexao)*/
    this.tendencia_in2hi = new Matrix(hide_n,1).randomize() // input to hide
    this.tendencia_hi2ot = new Matrix(out_n,1).randomize() // hide to output

/** criando os pesos*/
    this.pesos_i2h = new Matrix(hide_n,inp_n).randomize()
    this.pesos_h2o = new Matrix(out_n,hide_n).randomize()

  }
feedforwar(_input){
  // INPUT -> HIDDEN
  let input = Matrix.arrayToMatrix(_input)
  let hidden = Matrix.mult(this.pesos_i2h,input)
  hidden = Matrix.add(hidden,this.bias_in2hi)
  hidden.map(sigmoid)

  // HIDDEN ->OUTPUT
    let output = Matrix.mult(this.pesos_h2o,hidden)
    output = Matrix.add(output,this.tendencia_hi2ot)
    output.map(sigmoid)

    output.print()
}
}
