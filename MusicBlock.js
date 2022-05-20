

class MusicBlock{

	constructor(x, y, width, height){
		this.dragging = false; // Is the object being dragged?

	    this.x = x;
	    this.y = y;
	    this.width = width; 
	    this.height = height;

	    this.grid = new MusicGrid(this.x, this.y, this.width, this.height);
	   	this.grid.update(this.x, this.y, this.width, this.height);
	}

	//=================================================================	

	// WRAPPER FOR DRAG LOGIC: 

	draw(){
		this.update();
		this.show();

		this.grid.draw();
	}

	mousePressed(){
		this.pressed();

		this.grid.mousePressed();
	}

	mouseReleased(){
		this.released();
	}

	//=================================================================

	// DRAG LOGIC:
	// Taken from Shiffman. See https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88 .

	update() {
	    // Adjust location if being dragged
	    if (this.dragging) {
	      this.x = mouseX + this.offsetX;
	      this.y = mouseY + this.offsetY;
	      this.grid.update(this.x, this.y, this.width, this.height);
	    }
  	}

  	show() {
	    image(puzzle_image, this.x, this.y, this.width, this.height);
	}

	pressed() {
	    // Did I click on the rectangle?
	    if (mouseX > this.x 
	    	&& mouseX < this.x + this.width 
	    	&& mouseY > this.y 
	    	&& mouseY < this.y + this.height
	    	&& this.grid.hasMouseOver() == false) {
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