let numRings = 10
let strWeight = 20
let radius
function setup() {
  createCanvas(800, 800)
  colorMode(HSB, TWO_PI, 1, 1)

  radius = width * 0.1
  strokeCap(ROUND)
}

function draw() {
  background(0)
  noFill()
  strokeWeight(strWeight)
  let t = millis() * 0.001
  let basePeriod = 2.2
  let delayStep = 0.18

  for(let i = 0; i < numRings; i++){
    let h = 0.08 * TWO_PI              
    let s = map(i, 0, numRings-1, 0.45, 0.15)
    let b = map(i, 0, numRings-1, 0.25, 0.85)
    stroke(color(h, s, b))
    push()
    translate(width/2, height/2)
    let fromOuter = (numRings - 1 - i)           
    let delay = fromOuter * delayStep            
    let localT = max(0, t - delay)
    let period = basePeriod * (1.0 + i * 0.04)
    let u = (localT % period) / period           
    let cycle = floor(localT / period)           
    let ang = (cycle % 2 == 0) ? (u * TWO_PI) : ((1 - u) * TWO_PI)
    rotate(ang)
    arc(0, 0, radius*2 + strWeight*i*2, radius*2 + strWeight*i*2, 0, PI)
    pop()
  }
}
