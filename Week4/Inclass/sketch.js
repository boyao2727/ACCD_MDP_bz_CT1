let osc
let nT = 0
let posX
let posY
let velX
let velY
let radius = 20

function setup() {
  createCanvas(600, 600)
  colorMode(HSB, width, 100, 100)
  posX = width * 0.5
  posY = height * 0.5
  velX = random(-4, 4)
  velY = random(-3, 3)
  osc = new p5.Oscillator('sine')
  osc.start()
  osc.amp(0)
}

function draw() {
  nT += 0.01
  let ax = map(noise(nT), 0, 1, -0.2, 0.2)
  let ay = map(noise(nT + 1000), 0, 1, -0.2, 0.2)
  velX += ax
  velY += ay

  posX += velX
  posY += velY

  if (posY + radius >= height || posY - radius <= 0) {
    velY *= -1
    let spd = abs(velX) + abs(velY)
    osc.freq(map(spd, 0, 12, 200, 900))
    osc.amp(0.4, 0.02)
    osc.amp(0, 0.15)
  }

  if (posX + radius >= width || posX - radius <= 0) {
    velX *= -1
    let spd = abs(velX) + abs(velY)
    osc.freq(map(spd, 0, 12, 200, 900))
    osc.amp(0.4, 0.02)
    osc.amp(0, 0.15)
  }

  background(0, 0, 85)
  noStroke()
  fill(posX, 100, 100)
  circle(posX, posY, radius * 2)
  stroke(255, 0, 0)
  strokeWeight(4)
  fill(width * 0.75, 100, 100)
  rect(width * 0.5 - 50, height * 0.5 - 50, 100, 100)

}

function mousePressed(){
  userStartAudio()
  osc.freq(440)
  osc.amp(0.5, 0.01)
  osc.amp(0, 0.2)
}

