// to run ctrl alt l
  // to stop ctrl alt q
function setup() {
  // put setup code here
  createCanvas(500,500)
  background(255,0,0)
  let n1 = new Neural(1,2,5)
  var arr = [9,8]
  n1.feedforwar(arr)
}

function draw() {
  // put drawing code here
}
