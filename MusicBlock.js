

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

	    // ellipse(this.x + 180, this.y, 10, 10);
	    // ellipse(this.x + this.width, this.y, 10, 10);
	    // ellipse(this.x + 180, this.y + this.height, 10, 10);
	   	// ellipse(this.x + this.width, this.y + this.height, 10, 10);

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
    	this.dragging = false; // Quit dragging
  	}

  	//=================================================================

  	// CONNECTION LOGIC 

  	getLeftPoints() {
  		// both top then both bottom, left to right
	    return [this.x, this.y, 
	    		this.x + 20, this.y,
	    		this.x, this.y + this.height,
	    		this.x + 20, this.y + this.height];
  	}

  	getRightPoints() {
  		// both top then both bottom, left to right
	    return [this.x + 180, this.y, 
	    		this.x + this.width, this.y,
	    		this.x + 180, this.y + this.height,
	    		this.x + this.width, this.y + this.height,];
  	}

  	shouldMakeConnection(other) {
  		// Very helpful site here: https://www.geeksforgeeks.org/find-two-rectangles-overlap/
  		
  		let rx1 = this.getLeftPoints()[0];
  		let ry1 = this.getLeftPoints()[1];
  		let rx2 = this.getLeftPoints()[6];
  		let ry2 = this.getLeftPoints()[7];

  		let lx1 = other[0];
  		let ly1 = other[1];
  		let lx2 = other[6];
  		let ly2 = other[7];

    	if ( lx1 < rx2 
    		 && lx2 > rx1 
    		 && ly1 < ry2 
    		 && ly2 > ry1 )
        {   
    		return true;
    	}

		return false;

  	}

}