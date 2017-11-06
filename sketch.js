var areas = [];

var numAreas = 8;

var canvas,generate,
	distChoice,validate,divDist;

var pos={x:0,y:0};

var algos = {
	euclidean : true,
	manhattan : false,
	minkowski : false,
	camberra : false,
	chebychev : false,
	brayCutris : false,
	cosineCorrelation : false,
	kendallRank : false
};

function setup() {
	canvas = createCanvas(550,325);
	pixelDensity(1);
	generate = createButton('generate');
	distChoice = createRadio();
	distChoice.option('euclidean');
	distChoice.option('manhattan');
	distChoice.option('minkowski');
	distChoice.option('camberra');
	distChoice.option('chebychev');
	distChoice.option('brayCutris');
	distChoice.option('cosineCorrelation');
	distChoice.option('kendallRank');
	validate = createButton('validate');
	generate.parent('controls');
	distChoice.parent('controls');
	validate.parent('controls');
	canvas.parent('container');
	for(var i = 0; i < numAreas; i++){
		areas.push(new Area(random(0,width),random(0,height),color(map(i,0,9,0,255),random(0,255),random(0,255))));
	}
	generate.mousePressed(function(){
		areas = [];
		for(var i = 0; i < numAreas; i++){
			areas.push(new Area(random(0,width),random(0,height),color(random(0,255),random(0,255),random(0,255))));
		}
	});
	canvas.mousePressed(function(){
		var d = 999999999;
		for(var i = 0; i < areas.length; i++){
			if(dist(mouseX,mouseY,areas[i].pos.x,areas[i].pos.y) < d){
				pos.x = areas[i].pos.x;
				pos.y = areas[i].pos.y;
			}
		}
		console.log(mouseX+','+mouseY);
	});
	validate.mousePressed(function(){
		var val = distChoice.value();
		for(var i in algos){
			if(val === i){
				algos[i] = true;
			}else{
				algos[i] = false;
			}
		}
		console.log(algos);
	});
}

function draw(){
	//areas[0].pos.x = mouseX;
	//areas[0].pos.y = mouseY;
	loadPixels();
	for (var y = 0; y < height; y++) {
	  for (var x = 0; x < width; x++) {
	  	var nearest = 999999999;
	  	var index = -1;
	  	var loc = (x+y*width)*4;
	  	for(var i = 0; i < areas.length; i++){
	  		var d = algos.euclidean ? dist(x,y,areas[i].pos.x,areas[i].pos.y) :
	  								  (algos.manhattan ? manhattan(x,y,areas[i].pos.x,areas[i].pos.y):
	  								  (algos.minkowski ? minkowski(x,y,areas[i].pos.x,areas[i].pos.y):
	  								  (algos.camberra ? camberra(x,y,areas[i].pos.x,areas[i].pos.y):
	  								  (algos.chebychev ? chebychev(x,y,areas[i].pos.x,areas[i].pos.y):
	  								  (algos.brayCutris ? brayCutris(x,y,areas[i].pos.x,areas[i].pos.y):
	  								  (algos.cosineCorrelation ? cosineCorrelation(x,y,areas[i].pos.x,areas[i].pos.y):
	  								  kendallRank(x,y,areas[i].pos.x,areas[i].pos.y)))))));
	  		if(d < nearest){
	  			nearest = d;
	  			index = i;
	  		}
	  	}
	    pixels[loc] = red(areas[index].c);
	    pixels[loc+1] = green(areas[index].c);
	    pixels[loc+2] = blue(areas[index].c);
	    pixels[loc+3] = alpha(areas[index].c);
	  }
	}
	updatePixels();

	//areas[0].move();
	for(var i = 0; i < areas.length; i++){
		ellipse(areas[i].pos.x,areas[i].pos.y,5,5);
		// for(var j = 0; j < areas.length; j++){
		// 	stroke(0,30);
		// 	line(areas[i].pos.x,areas[i].pos.y,areas[j].pos.x,areas[j].pos.y);
		// }
	}
}

function manhattan(a1, b1, a2, b2){return abs(a1-a2)+abs(b1-b2);}
function minkowski(a1, b1, a2, b2){return pow(pow(abs(a1-a2),pow(2,2))+pow(abs(b1-b2),pow(2,2)),1/pow(2,2));}
function camberra(a1, b1 ,a2, b2){return (abs(a1-a2)/abs(a1+a2))+(abs(b1-b2)/abs(b1+b2));}
function chebychev(a1, b1 ,a2, b2){return max([abs(a1-a2),abs(b1-b2)]);}
function brayCutris(a1, b1 ,a2, b2){return (abs(a1-a2)/(a1+a2))+(abs(b1-b2)/(b1+b2));}
function cosineCorrelation(a1, b1 ,a2, b2){return ((a1*a2)+(b1*b2))/(((a1*a1)+(a2*a2))*((b1*b1)+(b2*b2)));}
function kendallRank(a1, b1 ,a2, b2){var n = 5;return 1-(2/(n*(n-1)))*((sign(a1-a1)*sign(b1-b1))+
																	   (sign(a1-a2)*sign(b1-b2))+
																	   (sign(a2-a2)*sign(b2-b2))+
																	   (sign(a2-a1)*sign(b2-b1)));}

function sign(n){return n>0?1:(n<0?-1:0);}