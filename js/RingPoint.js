function RingPoint(Origin,offset,radius,Color){
    this.pos = createVector(0,0);
    this.offset = offset;
    this.Origin = Origin;
    this.Origin_radius = radius;
    this.Color = Color;
    
    this.alpha = 255;
    this.radius = radius;
}

RingPoint.prototype.farToDissolveInAlpha = function(){
    let dir =  this.pos.copy().sub(this.Origin);
    dir.normalize();
    let val = asin(dir.y);
    if(dir.x<0 &&dir.y >0){
        val = 180-val;
    }
    else if(dir.x<=0 &&dir.y<0){
        val = 180+val;
    }
    else if(dir.x>0 &&dir.y<0){
        val = 180+val;
    }    

    this.alpha = val/360*255+50;
}

RingPoint.prototype.farToDissolveInScale = function(){
    let dir =  this.pos.copy().sub(this.Origin);
    dir.normalize();
    let val = asin(dir.y);
    if(dir.x<0 &&dir.y >0){
        val = 180-val;
    }
    else if(dir.x>0 &&dir.y<0){
        val = 180+val;
    }   
     else if(dir.x<=0 &&dir.y<0){
        val = 180+val;
    }
    this.radius = val/170*this.Origin_radius+this.Origin_radius*0.7;
}

RingPoint.prototype.moveTowards = function(vector){
    this.offset = vector;
}

RingPoint.prototype.update = function(){   
    let Origin = this.Origin.copy();
    this.pos = Origin.add(this.offset);
    this.offset.mult(0);
    this.alpha = 255;
    this.radius = this.Origin_radius;
}

RingPoint.prototype.showOrigin = function(){
    fill(this.Color, 0,0);
    ellipse(this.Origin.x,this.Origin.y,3,3);
}

RingPoint.prototype.show = function(){
    noStroke();
    fill(this.Color, this.alpha);
    ellipse(this.pos.x,this.pos.y,this.radius,this.radius);
}
