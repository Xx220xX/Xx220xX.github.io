// to run ctrl alt l
  // to stop ctrl alt q


function setup() {
  createCanvas(100, 100, WEBGL);

  textSize(width / 3);
  textAlign(CENTER, CENTER);
}
function draw() {
  background(0);
  let time = millis();
  rotateX(time / 1000);
  rotateZ(time / 1234);
  text('Xx220xX', 0, 0);
}
