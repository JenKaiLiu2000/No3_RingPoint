//Ring point setting
let spacing = 15;
let radius = 6;
let grayScale = 200;
let offset_Range = 15; 
//Ripple effect setting
let speed = 0.5;
let ring_spacing = 1.2;
let ring_contrast = 1; //0~1

let Color;
let RingPoints = [];
let currentTime = 0;
function setup() {
  createCanvas(650, 550).parent("main-display");
  pixelDensity(1);
  angleMode(DEGREES);
  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();
  background(0);
  let index = 0;
  for(let i = 0 ; i <= width ; i+=spacing){
    for(let j = 0 ; j <= height ; j+=spacing){
      RingPoints[index] = new RingPoint(createVector(i,j),createVector(0,0),radius,grayScale);
      index++;
    }
  }
  for(let i = 0 ; i < index ; i++){
    RingPoints[i].update();
    RingPoints[i].show();
  }
}
function draw() {
  background(0);
  video.loadPixels();
  loadPixels();
  let ring_index = 0;
  for(let i = 0 ; i <= width; i+=spacing){
    for(let j = 0 ; j <= height ; j+=spacing){
      // let index = (i + j * width)*4;
      let index = (width-i+1 + (j * width))*4;
      // let pos = createVector(i,j).sub([width/2,height/2]);
      // let len = pos.mag();
      // len -= currentTime*speed*100;
      // let grayVal = (sin(len*(ring_spacing))+1)/2;

      let grayVal =video.pixels[index]/255;

      grayVal = min(grayVal,1)*ring_contrast;
      

      // showPixels(index,grayVal);
      //get vector by determining angle with trig
      let grayToAngle = grayVal*360;
      let x = cos(grayToAngle);
      let y = sin(grayToAngle);
      let vect = createVector(x,y);
      vect.mult(spacing*offset_Range*0.1);//scale vector
      RingPoints[ring_index].moveTowards(vect);
      ring_index++;
    }
  }
  updatePixels();
  
  for(let i = 0 ; i < RingPoints.length ; i++){
    RingPoints[i].update();
    RingPoints[i].farToDissolveInAlpha();
    RingPoints[i].farToDissolveInScale();
    RingPoints[i].show();
  }
  timing();
}

function timing(){
  currentTime += 0.014;
  // console.log(currentTime);
}

function showPixels(index,grayVal){
  grayVal *= 255;
  let col = color(grayVal,255);
  pixels[index] = red(col);
  pixels[index + 1] = green(col);
  pixels[index + 2] = blue(col);
  pixels[index + 3] = alpha(col);
}