// VARIABLES

const canvasWidth = 1250;
const canvasHeight = 780; //580;

const workspaceX = canvasWidth * 0.10;
const workspaceY = canvasHeight * 0.15;
const workspaceWidth = canvasWidth - (2 * workspaceX);
const workspaceHeight = canvasHeight - (2 * workspaceY);
var workspace  = new Workspace(workspaceX, workspaceY, workspaceWidth, workspaceHeight);


var blockCreator = new BlockCreator(workspace.getX() + 60,
									workspace.getY() + 10,
									40,
									40);

var playButton = new PlayButton(workspace.getX() + 10,
								workspace.getY() + 10,
								40,
								40);

var bin = new Bin(workspaceX + workspaceWidth + 25, 
				  workspaceY + workspaceHeight + 10, 
				  70, 85);

let musicBlocks = [];

var aiBlockCreator = new AIBlockCreator();

var musicMetrics = new MusicMetrics(playButton);

var puzzle_image, puzzle_image2, binClosed, binOpen;

var startTime;

//===========================================================================

// MAIN FUNCTIONS  

function preload() 
{
	startTime = millis();
	puzzle_image = loadImage("assets/puzzle.png");
	puzzle_image2 = loadImage("assets/puzzle2.png");
	binClosed = loadImage("assets/binClosed.png");
	binOpen = loadImage("assets/binOpen.png");
}

function setup() 
{
  createCanvas(canvasWidth, canvasHeight);
}

function draw() 
{
  	noStroke();
  	background(lightGrey);

  	workspace.draw();
  	bin.draw();
  	
  	for (let i = 0; i < musicBlocks.length; ++i)
  	{
		musicBlocks[i].draw();
	}

	blockCreator.draw();
  	playButton.draw();

  	aiBlockCreator.update(musicBlocks);
  	playButton.updatePlayback();
}

//===========================================================================

// INTERACTIVITY

function mousePressed() 
{
	// If block creator is pressed
	if (blockCreator.hasMouseOver()) 
	{
		musicBlocks.push (new MusicBlock(250 + random(0, 40),
									  150 + random(-20,40),
									  200,
									  100));
	}

	// If a music block is pressed 
	for (let i = 0; i < musicBlocks.length; ++i)
	{
		musicBlocks[i].mousePressed();
	}

	// If play button is pressed
	playButton.mousePressed();
}

function mouseReleased()
{
	// delete any blocks from the bin
	bin.mouseReleased (musicBlocks);

	// If a music block is released...
	for (let i = 0; i < musicBlocks.length; ++i)
	{
		// Stop dragging
		musicBlocks[i].mouseReleased();

		for (let j = 0; j < musicBlocks.length; ++j)
		{
			if (j != i)
			{
				let lhsBlock = musicBlocks[j];
				let rhsBlock = musicBlocks[i];

				// if there is an intersection
				if (musicBlocks[i].shouldMakeConnection(musicBlocks[j].getRightPoints()))
				{
					// Reset blocks previous connections
			        if (rhsBlock.getLeftConnection() != null)
			        {
			        	rhsBlock.getLeftConnection().setRightConnection (null);
			        	rhsBlock.setLeftConnection (null);
			        }

			        if (lhsBlock.getRightConnection() != null)
			        {
			            lhsBlock.getRightConnection().setLeftConnection(null);
			            lhsBlock.setRightConnection (null);
			            // Note: did not port all the code here but this seemed to work okay; 
			            // ...fingers crossed!
			        }
		        
			        // The right blocks input should be the left block
			        rhsBlock.setLeftConnection (lhsBlock);
			        
			        // The left blocks input output should be the right block
			        lhsBlock.setRightConnection (rhsBlock);
			        
			        // Position blocks for a more aligned snap
			        lhsBlock.updateNeighbours();
				}
			}
		}
	}
}