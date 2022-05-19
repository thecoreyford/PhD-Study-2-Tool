



class MusicBlock{

	constructor(x, y, width, height){
		this.dragging = false; // Is the object being dragged?
	    this.rollover = false; // Is the mouse over the ellipse?

	    this.x = x;
	    this.y = y;
	    this.width = width; 
	    this.height = height;
	}

	//=================================================================	

	// WRAPPER FOR DRAG LOGIC: 

	draw(){
		this.update();
		this.over();
		this.show();
	}

	mousePressed(){
		this.pressed();
	}

	mouseReleased(){
		this.released();
	}

	//=================================================================

	// DRAG LOGIC:
	// Taken from Shiffman. See https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88 .

	over() {
	    // Is mouse over object
	    if (mouseX > this.x 
	    	&& mouseX < this.x + this.width 
	    	&& mouseY > this.y 
	    	&& mouseY < this.y + this.height){
	      this.rollover = true;
	    } else {
	      this.rollover = false;
	    }
	}

	update() {
	    // Adjust location if being dragged
	    if (this.dragging) {
	      this.x = mouseX + this.offsetX;
	      this.y = mouseY + this.offsetY;
	    }
  	}

  	show() {
	    stroke(0);
	    // Different fill based on state
	    if (this.dragging) {
	      fill(50);
	    } else if (this.rollover) {
	      fill(100);
	    } else {
	      fill(175, 200);
	    }
	    rect(this.x, this.y, this.width, this.height);
	}

	pressed() {
	    // Did I click on the rectangle?
	    if (mouseX > this.x 
	    	&& mouseX < this.x + this.width 
	    	&& mouseY > this.y 
	    	&& mouseY < this.y + this.height) {
	      this.dragging = true;
	      // If so, keep track of relative location 
	      // of click to corner of rectangle
	      this.offsetX = this.x - mouseX;
	      this.offsetY = this.y - mouseY;
	    }
	}

  	released() {
    	this.dragging = false;// Quit dragging
  	}

  	//=================================================================

}