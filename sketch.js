/***********************************************************************************
  Project 02
  by Cellini Luong

 My game is focused on the gender wage gap. The narrative features a character who has just graduated college and is having her first day at her new job. 
 The gender wage gap is an issue that she has yet to experience yourself, but she is determined to advocate and push for an equal paying workplace. 
 To understand how to close the pay gap, she navigates the office. She has conversations with other advocates, completes a pay audit, and takes other actions to educate herself.
 Her main goal is to rewrite the construct of a male-dominated workplace for all women. 

***********************************************************************************/

// adventure manager global  
var adventureManager;

// p5.play
var playerSprite;
var playerAnimation;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects

// indexes into the clickable array (constants)
const playGameIndex = 0;

// Allocate Adventure Manager with states table and interaction tables
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(720, 720);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // create a sprite and add the 3 animations
  playerSprite = createSprite(width/2, height/2, 80, 80);

  // every animation needs a descriptor, since we aren't switching animations, this string value doesn't matter
  playerSprite.addAnimation('regular', loadAnimation('assets/avatars/sprite-01.png', 'assets/avatars/sprite-04.png'));
  

  // use this to track movement from toom to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerSprite);

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

    // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();

  // No avatar for Splash screen or Instructions screen
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
      
    // responds to keydowns
    moveSprite();

    // this is a function of p5.js, not of this sketch
    drawSprite(playerSprite);
  } 
}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }  

  adventureManager.keyPressed(key); 
}

function mouseReleased() {
  adventureManager.mouseReleased();
}

//-------------- YOUR SPRITE MOVEMENT CODE HERE  ---------------//
function moveSprite() {
  if(keyIsDown(RIGHT_ARROW))
    playerSprite.velocity.x = 10;
  else if(keyIsDown(LEFT_ARROW))
    playerSprite.velocity.x = -10;
  else
    playerSprite.velocity.x = 0;

  if(keyIsDown(DOWN_ARROW))
    playerSprite.velocity.y = 10;
  else if(keyIsDown(UP_ARROW))
    playerSprite.velocity.y = -10;
  else
    playerSprite.velocity.y = 0;
}

//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed; 
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#F7F7F7";
  this.noTint = false;
  this.tint = "#F7F7F7";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#F7F7F7";
}

clickableButtonPressed = function() {
  // these clickables are ones that change your state
  // so they route to the adventure manager to do this
  adventureManager.clickablePressed(this.name); 
}



//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//
class InstructionsScreen extends PNGRoom {
  // preload is where we define OUR variables
  // Best not to use constructor() functions for sublcasses of PNGRoom
  // AdventureManager calls preload() one time, during startup
  preload() {}
    
  draw() {
   
      
    // this calls PNGRoom.draw()
    super.draw();
      
    // text draw settings
    fill(255);
    textAlign(CENTER);
    textSize(30);

    // Draw text in a box
    text(this.instructionsText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
  }
}

class StartRoom extends PNGRoom {

	preload() {
    // Loading Arrows 
      this.arrowSprite = createSprite(660, 660, 63, 36);

      this.arrowSprite.addAnimation('regular', loadAnimation('assets/arrows/down-01.png', 'assets/arrows/down-04.png'));
      print(this.arrowSprite);
  }

  draw() {
    super.draw();

    // Drawing Arrows
    drawSprite(this.arrowSprite);
  }
}

class ConferenceChatRoom extends PNGRoom {

  preload() {
    // Loading Arrows
      this.arrowSprite = createSprite(660, 660, 63, 36);

      this.arrowSprite.addAnimation('regular', loadAnimation('assets/arrows/down-01.png', 'assets/arrows/down-04.png'));
      print(this.arrowSprite);
  }

  draw() {
    super.draw();

    // Drawing Arrows
    drawSprite(this.arrowSprite);
  }
}

class ComputerTwoRoom extends PNGRoom {

	preload() {
		 // Loading Arrows
  		this.arrowSprite = createSprite(660, height/2, 63, 36);

  		this.arrowSprite.addAnimation('regular', loadAnimation('assets/arrows/right-01.png', 'assets/arrows/right-04.png'));
  		print(this.arrowSprite);
	}

	draw() {
		super.draw();

		// Drawing Arrows
		drawSprite(this.arrowSprite);
	}
}

class HallwayRoom extends PNGRoom {

  preload() {
    // Loading Arrows
      this.arrowSprite = createSprite(660, height/2, 63, 36);

      this.arrowSprite.addAnimation('regular', loadAnimation('assets/arrows/right-01.png', 'assets/arrows/right-04.png'));
      print(this.arrowSprite);
  }

  draw() {
    super.draw();

    // Drawing Arrows
    drawSprite(this.arrowSprite);
  }
}

class PetitionSignedRoom extends PNGRoom {

  preload() {
     // Loading Arrows
      this.arrowSprite = createSprite(660, 60, 63, 36);

      this.arrowSprite.addAnimation('regular', loadAnimation('assets/arrows/up-01.png', 'assets/arrows/up-04.png'));
      print(this.arrowSprite);
  }

  draw() {
    super.draw();

    // Drawing Arrows
    drawSprite(this.arrowSprite);
  }
}

class CoffeeChatRoom extends PNGRoom {

  preload() {
     // Loading Arrows
      this.arrowSprite = createSprite(660, 60, 63, 36);

      this.arrowSprite.addAnimation('regular', loadAnimation('assets/arrows/up-01.png', 'assets/arrows/up-04.png'));
      print(this.arrowSprite);
  }

  draw() {
    super.draw();

    // Drawing Arrows
    drawSprite(this.arrowSprite);
  }
}

class EndRoom extends PNGRoom {

  preload() {
     // Loading Arrows
      this.arrowSprite = createSprite(500, 660, 663, 36);

      this.arrowSprite.addAnimation('regular', loadAnimation('assets/arrows/right-01.png', 'assets/arrows/right-04.png'));
      print(this.arrowSprite);
  }

  draw() {
    super.draw();

   // Drawing Arrows
    drawSprite(this.arrowSprite);
  }
}






