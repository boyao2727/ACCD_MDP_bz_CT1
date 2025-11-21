let video;
let poseNet;
let poses = [];

let particles = [];
const NUM_PARTICLES = 250;

let tilt = 0;        
let intensity = 0.6; 

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.position(0, 0); 
  canvas.style('z-index', '-1'); 

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); 

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function modelReady() {
  console.log('PoseNet model loaded');
}

function gotPoses(results) {
  poses = results;
}

function draw() {

  background(5, 7, 16, 150);

  updateTiltFromPose();
  updateParticles();
  drawParticles();

  drawGravityIndicator();
}

function updateTiltFromPose() {
  if (poses.length > 0) {
    let pose = poses[0].pose;
    let leftShoulder = pose.leftShoulder;
    let rightShoulder = pose.rightShoulder;

    let dy = leftShoulder.y - rightShoulder.y;

    tilt = constrain(dy / 200, -1, 1);

    intensity = 0.6;
  } else {
    tilt = lerp(tilt, 0, 0.05);
  }
}

function updateParticles() {
  let windX = tilt * 0.4 * intensity;
  let windY = 0.12 * intensity; 

  for (let p of particles) {
    p.applyForce(windX, windY);
    p.update();
    p.edges();
  }
}

function drawParticles() {
  noStroke();
  for (let p of particles) {
    let t = map(tilt, -1, 1, 0, 1);
    let r = lerp(80, 240, t);
    let g = lerp(180, 60, t);
    let b = lerp(255, 80, t);

    fill(255, 220, 60, 200);
    p.show();
  }
}

function drawGravityIndicator() {
  push();
  translate(width - 80, 60);
  stroke(230);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, 40, 40);

  let windX = tilt * 0.4 * intensity;
  let windY = 0.12 * intensity;

  let dir = createVector(windX, windY);
  dir.mult(120); 

  stroke(255);
  line(0, 0, dir.x, dir.y);
  fill(255);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('gravity', 0, 24);
  pop();
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(1);
    this.acc = createVector(0, 0);
    this.size = random(8, 13);
    this.speedFactor = random(0.4, 1.2);
  }

  applyForce(fx, fy) {
    this.acc.x += fx;
    this.acc.y += fy;
  }

  update() {
    this.vel.add(this.acc.mult(this.speedFactor));
    this.pos.add(this.vel);
    this.vel.mult(0.95); 
    this.acc.mult(0);
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  show() {
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
