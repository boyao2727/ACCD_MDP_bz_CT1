let handPose
let video

let hands = []
let thumbTip, indexTip

let paddle, pong
let mosquito
let mosquitoAlive = true

function preload(){
  handPose = ml5.handPose({flipped: true})
}

function setup() {
  createCanvas(640, 500);
  video = createCapture(VIDEO, {flipped: true})
  video.size(640, 480)
  video.hide()
  
  rectMode(CORNERS)
  paddle = {
    x1:0,
    y1:0,
    x2:0,
    y2:0
    
  }
  
  rectMode(CORNERS)
  paddle = {
    x1:0,
    y1:0,
    x2:0,
    y2:0
  }

  mosquito = {
    x: random(width),
    y: random(height),
    speed: 1.5,
    angle: random(TWO_PI)
  }
  
  handPose.detectStart(video, gothands)
}

function draw() {
  background(220)
  
  image(video, 0 ,0, 640, 480)

  fill(255)
  textAlign(CENTER, TOP)
  textSize(16)
  text("Squeeze the mosquito with your thumb and index finger.", width/2, 10)

  
  fill(0, 255, 0)
  if(hands.length > 0){
    fill(0, 0, 255)
    rect(paddle.x1, paddle.y1, paddle.x2, paddle.y2)
    
    fill(0, 255, 0)
    circle(thumbTip.x, thumbTip.y, 10)
    circle(indexTip.x, indexTip.y, 10)
  }

  updateMosquito()
  checkMosquitoKill()
  drawMosquito()
}


function gothands(results){
  //console.log(results)
  hands = results
  if(hands.length > 0){
    thumbTip = hands[0].thumb_tip
    paddle.x1 = thumbTip.x
    paddle.y1 = thumbTip.y
    
    indexTip = hands[0].index_finger_tip
    paddle.x2 = indexTip.x+15
    paddle.y2 = indexTip.y
  }
}

function updateMosquito(){
  if(!mosquitoAlive) return
  if(random(1) < 0.03){
    mosquito.angle += random(-0.5, 0.5)
  }
  mosquito.x += cos(mosquito.angle) * mosquito.speed
  mosquito.y += sin(mosquito.angle) * mosquito.speed
  
  if(mosquito.x < 0) { mosquito.x = 0; mosquito.angle = PI - mosquito.angle }
  if(mosquito.x > width) { mosquito.x = width; mosquito.angle = PI - mosquito.angle }
  if(mosquito.y < 0) { mosquito.y = 0; mosquito.angle = -mosquito.angle }
  if(mosquito.y > height) { mosquito.y = height; mosquito.angle = -mosquito.angle }
}

function drawMosquito(){
  if(!mosquitoAlive) return
  textSize(20)
  text("🦟", mosquito.x, mosquito.y)
}

function checkMosquitoKill(){
  if(!mosquitoAlive) return
  if(!thumbTip || !indexTip) return

  let dx = thumbTip.x - indexTip.x
  let dy = thumbTip.y - indexTip.y
  let d = sqrt(dx*dx + dy*dy)

  if(d > 40) return

  let left = min(paddle.x1, paddle.x2)
  let right = max(paddle.x1, paddle.x2)
  let top = min(paddle.y1, paddle.y2)
  let bottom = max(paddle.y1, paddle.y2)

  if(mosquito.x > left && mosquito.x < right &&
     mosquito.y > top && mosquito.y < bottom){
    mosquitoAlive = false
    playKillSound()
    setTimeout(respawnMosquito, 2000)
  }
}

function playKillSound(){
  let osc = new p5.Oscillator("square")
  osc.freq(800)
  osc.amp(0.2, 0.01)
  osc.start()
  osc.amp(0.0001, 0.2)
  osc.stop(0.21)
}

function respawnMosquito(){
  mosquito = {
    x: random(width),
    y: random(height),
    speed: 1.5,
    angle: random(TWO_PI)
  }
  mosquitoAlive = true
}

