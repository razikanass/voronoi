function Area(x, y, c){
	this.pos = createVector(x, y);
	this.c = c;
	this.a = 0.0;
	this.vel = 3;

	this.move = function(){
		this.pos.x += this.vel;
		this.pos.y += this.vel;
	}
}