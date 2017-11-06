function Cell(x,y,vx,vy,r){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.r = r;

	this.render = function(){
		push();
		translate(this.x,this.y);
		var angle = 0.0;
		var nSide = 30;
		var theta = TWO_PI/nSide;
		beginShape();
		for(var i = 0; i < nSide; i++){
			vertex(0,0,0);
			vertex(this.r * cos(angle),this.r * sin(angle),-this.r);
			vertex(this.r * cos(angle + theta),this.r * sin(angle + theta),-this.r);
			angle += theta;
		}
		endShape(CLOSE);
		pop();
	}

	this.update = function() {
	    this.x += this.vx;
	    this.y += this.vy;
	    if (this.x < 0 || this.x > width) {
	      this.vx = -this.vx;
	    }    
	    if (this.y < 0 || this.y > height) {
	      this.vy = -this.vy;
	    }
  	}
}

