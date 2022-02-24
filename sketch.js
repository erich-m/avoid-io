{ //Predefined/Initialized Variables
  var p; //define player 
  var e = []; //define enemy array

  var timer = 0; //create game timer (for the clock)
  var secTimer = 0; //create second counter
  var minTimer = 0; //create minute counter
  var hourTimer = 0; //create hour counter
  var tScore = 0; //create score based on timer (hhmmss)
  var scoreList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //creates an array to store the highest timeScores (by difficulty)

  var input; //creates an inpuyt bar for the user code
  var button; //creates a submit button for the user code
  var entered = 0; //keeps track of the number of times a code was entered

  var start = 0; //create "scene" variable
  var difficulty = 1; //Enemies per second
  var maxDif = 10; //create max difficulty variable for the slider
  var curentD = 1; //current difficulty for each game play (so the difficulty can be changed while not playing)
  var testRunLength = false; //debug player collisions (prevents player death
  var debugKill = false; //if debug mode is on, and the oletter q is pressed, it will default end the game
  var roundCount = 0; //counts the number of rounds to unlock powerups
  var starCount = 0; //keeps track of the number of times 45 seconds was scored on level 1
  var power = 0; //power slider selector
  var currentPower = 0; //locks the powerup when the game is being played
  var used = 0; //keeps track of if the powerup was used
  var playSpeed = 2; //5.8//keeps track fo the player speed//when the speed boost is used, this goes up to 5.8 (max)
  var starPow = 0; //keeps track of the activation of the powerup and the time it can be used for
  var freezePow = 0; //keeps track of the activation of the powerup and the time it can be used for
  var bombNum = 0; //keeps track of the activation of the powerup and the time it can be used for
  var repelTimer = 0;

  var seekPlay;
  var seekMode = false;
  var seekScore = 0;

  var unlocks = { //keeps track of unlockables
    cPlay: false, //play 10 rounds
    bomb: false, //Play 100 games one of each minimum
    freeze: false, //10 seconds difficulty 10
    speed: false, //30 seconds on difficulty 3
    star: false, //45 seconds on difficulty 1 five times
    repel: false //15 seconds on seeking level
  } //keeps track f unlockables
  var unlockName = ["Speed", "Bomb", "Star", "Freeze", "Repel"]; //keeps track of the name of the unlock


  var pR; //define player colour variables for slider
  var pG; //define player colour variables for slider
  var pB; //define player colour variables for slider

  var canvasSize = 500; //create canvasSize
  var margin = { //creates side margins "dictionary"
    top: 25,
    bottom: 25,
    left: 25,
    right: 550
  }; //creates side margins for the translation of the arena

  var center = { //creates center "dictionary"
    x: canvasSize / 2 + margin.left, //keeps track of the center location
    y: canvasSize / 2 + margin.top //keeps track of the center location
  } //keeps track of the center location

  //define image variables for logo and start/death text and lock image
  {
    let logo;
    let lock;
    let click;
    let died;
    let info;
    let wing;
    let star;
    let freeze;
    let bomb;
    let repel;
    let seekModeLogo;
  }
  //define image variables for logo and start/death text and lock image

  let myCode; //creates variable for the userCode html element
  var playerImage; //create player image variable
  var c; //create canvas variable for the player image drop
} //Predefined/Initialized Variables//commented

function preload() { //preload function to load all the images from the project folder
  logo = loadImage('logo.png'); //load logo
  lock = loadImage('lock2.png'); //load lock
  click = loadImage('click.png'); //load click
  died = loadImage('died.png'); //load died
  info = loadImage('i.png'); //load info
  wing = loadImage('speedDial.png'); //load wing
  star = loadImage('star.png'); //load star
  freeze = loadImage('freezeTherm.png'); //load thermometer
  bomb = loadImage('bomb.png'); //load bomb
  repel = loadImage('repel.png');
  seekModeLogo = loadImage('seekImage.png');
} //preload function to load all the images from the project folder//commented

function setup() { //create setup function to create sliders and canvas and the player object
  c = createCanvas(canvasSize + margin.left + margin.right, canvasSize + (margin.top + margin.bottom)); //create canvas the size of the arena and the margins
  p = new Player(canvasSize / 2 + margin.left, canvasSize * 2 / 3 + margin.top, canvasSize / 16); //instantiate player object p
  { //create userCode text element
    myCode = createElement('h6', ''); //set mycode to a blank html element
    myCode.position(margin.left, canvasSize + margin.top * 0.75); //sets the position of the mycode element
  } //create userCode text element
  { //Add the colour to the variables which are used as parameters and creates the sliders to control them
    pR = createSlider(0, 255, 14);
    pR.position(canvasSize + margin.left + margin.right / 4, margin.top + canvasSize * 0.60);
    pG = createSlider(0, 255, 209);
    pG.position(canvasSize + margin.left + margin.right / 4, margin.top + canvasSize * 0.65);
    pB = createSlider(0, 255, 69);
    pB.position(canvasSize + margin.left + margin.right / 4, margin.top + canvasSize * 0.70);
  } //Add the colour to the variables which are used as parameters and creates the sliders to control them
  { //create a difficulty slider so the user can change the difficulty (enemies/second)
    difficulty = createSlider(1, maxDif, 1);
    difficulty.position(canvasSize + margin.left + margin.right / 4, margin.top + canvasSize * 0.25);
  } //create a difficulty slider so the user can change the difficulty
  { //create powerup slider
    power = createSlider(0, 4, 0);
    power.position(canvasSize + margin.left + (margin.right / 2) * 0.35, canvasSize * 0.35 + margin.top);
    power.style('width', '160px');
  } //create powerup slider
  { //create input box
    input = createInput();
    input.position(margin.left + canvasSize + (margin.right / 2) * 0.05, margin.top + canvasSize * 0.98);
  } //create input box
  { //create submit button
    button = createButton('Submit Code');
    button.position(input.x + input.width, input.y);
    button.mousePressed(loadData);

    seekPlay = createButton('Play Seek Mode!');
    seekPlay.position(margin.left + canvasSize + margin.right / 2 + seekPlay.width - 20, margin.top + canvasSize * 0.13);
    seekPlay.mousePressed(seekSetup);
  } //create submit button for the user code

  c.drop(gotFile); //calls drop on gotFile
} //close setup//commented

function draw() { //open draw loop function
  //createUC();
  { //PREINTERFACE//Add the interface that is below the game mechanics
    { //arena rings
      background(230); //create background colour//leave on 220 for the text image//
      fill(220); //creates arena rings so that the colour of the background alternates (the player can never match the colour of both rings)
      ellipse(center.x, center.y, canvasSize, canvasSize); //creates arena rings so that the colour of the background alternates (the player can never match the colour of both rings)
      fill(230); //creates arena rings so that the colour of the background alternates (the player can never match the colour of both rings)
      ellipse(center.x, center.y, canvasSize * 0.6, canvasSize * 0.6); //creates arena rings so that the colour of the background alternates (the player can never match the colour of both rings)
      fill(220); //creates arena rings so that the colour of the background alternates (the player can never match the colour of both rings)
      ellipse(center.x, center.y, canvasSize * 0.3, canvasSize * 0.3); //creates arena rings so that the colour of the background alternates (the player can never match the colour of both rings)
    } //arena rings
    { //central portal
      stroke(0); //creates center portal
      fill(0); //create portal
      ellipse(margin.left + canvasSize / 2, margin.top + canvasSize / 2, canvasSize / 10, canvasSize / 10); //create portal
      push(); //push the matrix for the spinning animation
      noStroke(0); // change stroke
      rectMode(CENTER); //set the rectangl mode to center
      translate(center.x, center.y); //translate the matrix to the center of the game screen
      rotate(round(millis()) / 10); //rotate the rectangle using millis() (basically a program run timer)
      if (seekMode == false) {
        fill(255, 0, 0, 200 + millis() % 50);
      } else {
        fill(50, 50, 255, 200 + millis() % 50);
      }
      rect(0, 0, (canvasSize / 10) * 2 / 3, (canvasSize / 10) * 2 / 3);
      rectMode(CORNER); //reset rectMode
      pop(); //pop the matrix back to normal
    } //creates portal
    push(); //push matrix so that the margins can be added
    translate(margin.left, margin.top); //translate arena to add margins
  } //PREINTERFACE//Add the interface that is below the game mechanics
  { //GAME CHUNK//Contains the code that controls the actual game
    if (start == 0) { //Start screen//////////////////////////////////////////////////
      imageMode(CENTER); //change image mode to center
      image(click, canvasSize / 2, canvasSize * 0.3, canvasSize * 0.80, canvasSize * 0.8); //add the click to play image
      textEdit(CENTER, 20, 0, 0, 255, 0, 0, 255, "AVOID THE RED ENEMIES", canvasSize / 2, canvasSize * 0.2, true, false); //add text to the screen (user interface)
      imageMode(CORNER); //reset image mode

      if (unlocks.cPlay) { //determines the colour of the player (from unlocked achievements)
        p.render(pR.value(), pG.value(), pB.value(), -margin.left, -margin.top); //render player with the colour defined by the sliders
        p.renderImage(playerImage, -margin.left, -margin.top);
      } else {
        p.render(14, 209, 69, -margin.left, -margin.top); //otherwise color the player with predefined colour
      }
      if (mouseX > margin.left && mouseX < canvasSize + margin.left && mouseY > margin.top && mouseY < canvasSize + margin.top && start == 0 && mouseIsPressed) { //if the mouse is clicked on the arena
        currentD = difficulty.value(); //sets the difficulty for the game session
        currentPower = power.value(); //sets the power to whatever the slider was set to
        start = 1; //set start to 1 to begin game
        roundCount++; //adds to the current round round
      } //if the mouse is pressed on the arena
    } //Start Screen////////////////////////////////////////////////////////////////
    else if (start == 1) { //if the game is started

      if (unlocks.cPlay) { //decide unlock on or not to colour player
        p.render(pR.value(), pG.value(), pB.value(), -margin.left, -margin.top); //render player with colour defined by the sliders
        p.renderImage(playerImage, -margin.left, -margin.top);
      } else {
        p.render(14, 209, 69, -margin.left, -margin.top); //render player with predfined colour
      }
      pop(); //reset matrix
      resetMatrix(); //reset matrix
      if (playSpeed > 2) { //if the player speed is greater or equal to 2, decrease it
        playSpeed -= 0.01; //decrease speed
      } //decrease speed
      if (starPow > 0) { //if the star power is greater than 0,decrease it
        starPow -= 0.02; //if the star power is greater than 0,decrease it
      } //if the star power is greater than 0,decrease it
      if (freezePow > 0) { //if the freeze power is greater than 0, decrease it
        freezePow -= 0.05; //if the freeze power is greater than 0, decrease it
      } //if the freeze power is greater than 0, decrease it
      if (bombNum > 0) { ////if the bomb power is greater than 0, decrease it
        bombNum -= 0.25; ////if the bomb power is greater than 0, decrease it
      } ////if the bomb power is greater than 0, decrease it
      if (repelTimer > 0) {
        repelTimer -= 0.06;
      }
      p.update(playSpeed); //call the update function for the player class on p object with speed parameter 2
      push(); //push the matrix
      translate(margin.left, margin.top); //translate again

      if (repelTimer > 0) {
        noFill();
        strokeWeight(20);
        stroke(0, 255, 0, map(repelTimer, 10, 0, 210, 0));
        ellipse(p.pos.x - margin.left, p.pos.y - margin.top, map(-repelTimer, -10, 0, 0, canvasSize * 2), map(-repelTimer, -10, 0, 0, canvasSize * 2));
        ellipse(p.pos.x - margin.left, p.pos.y - margin.top, map(-repelTimer, -10, 0, 0, canvasSize * 2) / 2, map(-repelTimer, -10, 0, 0, canvasSize * 2) / 2);
        ellipse(p.pos.x - margin.left, p.pos.y - margin.top, map(-repelTimer, -10, 0, 0, canvasSize * 2) / 4, map(-repelTimer, -10, 0, 0, canvasSize * 2) / 4);
        strokeWeight(1);
        noStroke();
      }
      tScore = secTimer + (minTimer * 100) + (hourTimer * 10000); //creates a single score out of the timer
      timer++; //add to game session timer
      for (var enemyCount = 0; enemyCount < e.length; enemyCount++) { //for the length of the enemy array
        if (seekMode == false) {
          e[enemyCount].render(255, 0, 0, 0, 0); //redner the enemy with a colour and 0 offset 
        } else {
          e[enemyCount].render(50, 50, 255, 0, 0); //redner the enemy with a colour and 0 offset 
        }
        if (freezePow <= 0 && seekMode == true) {
          e[enemyCount].update(p, true, true); //update the enemy at the index for loop with parameter player for distance check
        } else if (seekMode == true && freezePow > 0) {
          e[enemyCount].update(p, false, true); //update the enemy at the index for loop with parameter player for distance check
        } else if (seekMode == false && freezePow <= 0) {
          e[enemyCount].update(p, true, false); //update the enemy at the index for loop with parameter player for distance check
        } else if (seekMode == false && freezePow > 0) {
          e[enemyCount].update(p, false, true); //update the enemy at the index for loop with parameter player for distance check
        }
        stroke(0); //set stroke to 0
        if (unlocks.star == true && starPow > 0 && (!testRunLength && e[enemyCount].pd < p.r + e[enemyCount].r) && currentPower == 2) { //if the star power is activated
          var temp = e[e.length - 1]; //swaps the enemy to the end of the array
          e[e.length - 1] = e[enemyCount]; //swaps the enemy to the end of the array
          e[enemyCount] = temp; //swaps the enemy to the end of the array
          e.pop(); //removes the enemy that the player is touching so that it does not glitch the rest of the enemies
        } else if ((!testRunLength && e[enemyCount].pd < p.r + e[enemyCount].r)) { //Check death by checking distance from the player
          start = 2; //start equals 2//player died//
          if (scoreList[currentD - 1] < tScore && seekMode == false) { //if the new timer score is greater than the current score, replace it
            scoreList[currentD - 1] = tScore; //replace it with the score in the corresponding difficulty
          } //set high score here
          if (seekMode == true && tScore > seekScore) {
            seekScore = tScore;
          }
          playSpeed = 2; //reset player speed
          bombNum = 0; //reset bombNum
          freezePow = 0; //reset freeze timer
          starPow = 0; //reset star power timer
          debugKill = false; //reset debug kill
          used = 0; { //unlockables
            if (roundCount == 10 && !unlocks.cPlay) { ///play 10 rounds//unlock colour
              unlocks.cPlay = true; //unlokc colour your player
            } //unlock colour
            if (roundCount == 25 && unlocks.bomb == false) { //Play 25 games one of each minimum//unlock bomb
              unlocks.bomb = true; //unlock bomb
            } //Play 25 games one of each minimum//unlock bomb
            if (1800 <= timer && unlocks.speed == false && currentD == 3) { //30 seconds on difficulty 3
              unlocks.speed = true; //unlock speed
            } //30 seconds on difficulty 3
            if (timer >= 2700 && starCount < 5 && currentD == 1 && unlocks.star == false) { //45 seconds on difficulty 1 five times
              starCount++; //add to star count
            } else if (starCount >= 5 && timer >= 2700 && currentD == 1 && unlocks.star == false) { //45 seconds on difficulty 1 five times
              unlocks.star = true; //if star count == 5, unlock star power
            } //45 seconds on difficulty 1 five times
            if (timer >= 600 && unlocks.freeze == false && currentD == 10) { //10 seconds difficulty 10
              unlocks.freeze = true; //unlock freeze
            } //10 seconds on difficulty 10
            if (unlocks.repel == false && seekMode == true && timer >= 600) {
              unlocks.repel = true;
            }
            seekMode = false;
          } //unlockables
          createUC(); //create a user code based on the current data and display the copy and pasteable html text element with the code
        } //end of death variable changes
        //for (var ec = 0; ec < e.length; ec++) {//area check?
        //}//area check??
      } //close for every enemy
      if (debugKill == true) { //if debug kill is set to true, via keyPress function, kill the player and reset the variables
        playSpeed = 2; //reset player speed
        bombNum = 0; //reset bomb timer
        freezePow = 0; //reset freeze power
        starPow = 0; //reset star power timer
        start = 2; //start equals 2//player died//
        debugKill = false; //reset debug kill
        used = 0; //reset the powerup used
        seekMode = false;
      } { //Clock and enemy spawning/////////////////////////////////////////////////////
        if (timer % 60 == 0 && timer != 0) { //if timer % 60 is 0 and timer is not equal to 0 add to second
          secTimer++; //add to second
          for (var spawn = 0; spawn < currentD; spawn++) { //for the length of the difficult setting, spawn enemies
            if (freezePow <= 0) { //if freeze power is less than or equal to 0, be allowed to push new elements
              e.push(new Enemy(canvasSize / 2, canvasSize / 2, random(10, 20) / 2, round(random(0.5, 2.2)))); //push a new enemy to the array to be rendered and updated
            } //check freeze powerup
          } //for the length of difficulty, spawn enemies
        } //every second
        if (secTimer % 60 == 0 && secTimer != 0) { //if second % 60 is 0 and second timer is not equal to 0 add to minute
          secTimer = 0; //reset second to 0
          minTimer++; //add to minute
        } //check minute
        if (minTimer % 60 == 0 && minTimer != 0) { //if minute % 60 is 0 and minute timer is not equal to 0 add to hour
          mintimer = 0; //reset minute
          hourTimer++; //add hour
        } //check hour
      } //Clock and Enemy Spawning ///////////////////////////////////////////////////\
    } //Play Game
    else if (start == 2) { //death screen//////////////////////////////////////////////////////////
      e = []; //clear array of enemies
      noStroke(); //set no stroke
      p.pos.x = canvasSize / 2; //reset position of the player
      p.pos.y = canvasSize * 0.67 + margin.top; //reset the position of the player
      if (unlocks.cPlay) { //if the colour is unlocked, colour the player
        p.render(pR.value(), pG.value(), pB.value(), 0, -margin.top); //render player
        p.renderImage(playerImage, 0, -margin.top);
      } else { //otherwise use the default colour
        p.render(14, 209, 69, 0, -margin.top); //render player
      } //use the default colour
      imageMode(CENTER); //set image mode center and create more images for death screen
      image(died, canvasSize / 2, canvasSize * 0.3, canvasSize, canvasSize * 0.7); //show death screen image
      imageMode(CORNER); //reset image positioning
      if (mouseIsPressed && start == 2 && mouseX > margin.left && mouseX < margin.left + canvasSize && mouseY > margin.top && mouseY < margin.top + canvasSize) { //if the game is on the death screen, and the mouse is clicked on the screen, reset the timer and the position of the player and add to round count
        timer = 0; //set timer to zero
        secTimer = 0; //reset timer
        minTimer = 0; //reset timer
        hourTimer = 0; //reset timer
        p.pos.x += margin.left; //reset position of the player (random bug from translation)
        currentD = difficulty.value(); //set difficulty for the new round
        currentPower = power.value(); //set powerup for the current round
        start = 1; //set start to 1
        roundCount++; //add to the round count
      } //if on death screen and mouse is pressed on the arena
    } //Death Screen//////////////////////////////////////////////////////////////////
    pop(); //revert arena
  } //GAME CHUNK
  { //INTERFACE//creates more game interface 
    fill(0); //fill black
    stroke(0); //stroke black
    rect(0, 0, width, margin.top); //add outer margins
    rect(0, 0, margin.left, height); //add margins
    rect(0, height - margin.bottom, width, margin.bottom); //add margins
    rect(width - margin.right, 0, margin.right, height); //add margins

    fill(pR.value(), pG.value(), pB.value()); //draw player demo (for the colour selector
    ellipse(canvasSize + margin.left + 70, margin.top + canvasSize * 0.65, 60, 60); //draw demo circle
    textEdit(CENTER, 11, 255, 255, 255, 255, 255, 255, "PLAY 10 ROUNDS TO UNLOCK\nCOLOUR FOR YOUR PLAYER\nOR YOU CAN DROP AN IMAGE\n ONTO YOUR PLAYER!(Press C to Clear)", canvasSize + margin.left + (margin.right / 2) / 2, margin.top + canvasSize * 0.5, true, false); //instruction to unlock colour

    image(logo, margin.left + canvasSize, margin.top); //adds the logo to the top of the screen
    image(seekModeLogo, margin.left + canvasSize + margin.right * 0.45, -margin.top - canvasSize * 0.28, margin.right * 0.8);
    if (!unlocks.cPlay) { //if the colour is not unlocked, display the lock symbol
      image(lock, margin.left + canvasSize + 10, margin.top + canvasSize * 0.525, 120, 120); //create lock image
    } //if the colour is not unlocked, display the lock symbol

    textEdit(CENTER, 25, 255, 255, 255, 255, 255, 255, "Timer: " + nf(hourTimer, 2) + ":" + nf(minTimer, 2) + ":" + nf(secTimer, 2), canvasSize + margin.left + (margin.right / 2) / 2, canvasSize * 0.25, true, false); //display timer

    textEdit(CORNER, 20, 255, 255, 255, 255, 255, 255, "Difficulty : " + nf(difficulty.value(), 3), margin.left + canvasSize + 65, canvasSize * 0.33, true, false); //show the difficutly
    textEdit(CENTER, 12, 255, 255, 255, 255, 255, 255, "INSTRUCTIONS:\nCLICK TO PLAY\nAVOID THE RED ENEMIES FOR AS\nLONG AS YOU CAN!\nUSE THE MOUSE TO CONTROL\n THE LARGE CIRCLE! INCREASE THE\nDIFFICULTY TO UNLOCK\nACHIEVEMENTS AND\nSCORE HIGHER TIMES.\nPress the space bar to activate the powerups!\nYou can only use one powerup\nper round so pick wisely!\nHow to unlock:\nSpeed Boost-30 seconds difficulty 3\nBomb-25 rounds\nStar-5 rounds on difficulty one with 45 seconds\nFreeze-10 seconds on difficulty 10\nRepel-10 seconds on Seek Mode", margin.left + canvasSize + margin.right * 0.75, canvasSize / 2 + margin.top, true, false); //display instructions

    //powerup section//show all the powerup images
    image(wing, canvasSize + margin.left + (margin.right / 2) * 0.27, canvasSize * 0.40 + margin.top, 40, 40);
    image(bomb, canvasSize + margin.left + (margin.right / 2) * 0.27 + 40, canvasSize * 0.40 + margin.top, 40, 40);
    image(star, canvasSize + margin.left + (margin.right / 2) * 0.27 + 80, canvasSize * 0.40 + margin.top, 40, 40);
    image(freeze, canvasSize + margin.left + (margin.right / 2) * 0.27 + 120, canvasSize * 0.40 + margin.top, 40, 40);
    image(repel, canvasSize + margin.left + (margin.right / 2) * 0.27 + 160, canvasSize * 0.40 + margin.top, 40, 40);
    //show all the powerup images
    //show all the lock images where required
    if (!unlocks.speed) {
      image(lock, canvasSize + margin.left + (margin.right / 2) * 0.27 - 20, canvasSize * 0.40 + margin.top - 20, 80, 80);
    }
    if (!unlocks.bomb) {
      image(lock, canvasSize + margin.left + (margin.right / 2) * 0.27 + 40 - 20, canvasSize * 0.40 + margin.top - 20, 80, 80);
    }
    if (!unlocks.star) {
      image(lock, canvasSize + margin.left + (margin.right / 2) * 0.27 + 80 - 20, canvasSize * 0.40 + margin.top - 20, 80, 80);
    }
    if (!unlocks.freeze) {
      image(lock, canvasSize + margin.left + (margin.right / 2) * 0.27 + 120 - 20, canvasSize * 0.40 + margin.top - 20, 80, 80);
    }
    if (!unlocks.repel) {
      image(lock, canvasSize + margin.left + (margin.right / 2) * 0.27 + 160 - 20, canvasSize * 0.40 + margin.top - 20, 80, 80);
    }
    //show all the lock images where required
    textEdit(CENTER, 15, 255, 255, 255, 255, 255, 255, "Powerup:\n" + unlockName[power.value()], margin.left + canvasSize + 40, margin.top + canvasSize * 0.35, true, false); //show the unlocked powerup

    if (freezePow > 0) { //if the timer for freeze is greater than 0
      fill(0, 0, 255, map(freezePow, 0, 10, 0, 100)); //create a blue overlay for the screen
      rect(margin.left, margin.top, canvasSize, canvasSize);
    } //check freeze timer
    if (starPow > 0) { //check star power timer
      fill(255, 255 - random(0, 55), 0, map(starPow, 0, 10, 0, 100)); //create a random colour circle with alpha
      ellipse(p.pos.x, p.pos.y, p.r * random(0, 3), p.r * random(0, 3)); //create a random colour circle with alpha
    } //check star timer 
    if (playSpeed > 0) { //if the speed is greater than 2
      fill(255, 0, 0, map(playSpeed, 0, 10, 0, 100)); //create a red overlay
      rect(margin.left, margin.top, canvasSize, canvasSize);
    } //if the speed is greater than 2
    if (bombNum > 0) { //check bomb timer
      fill(0, 100); //create a circle that "explodes"
      ellipse(center.x, center.y, map(bombNum, 0, 10, 0, canvasSize), map(bombNum, 0, 10, 0, canvasSize));
    } //chekc bomb timer
    if (used == 0) { //fill circle green if the powerup is not used
      fill(0, 255, 0);
    } else { //otherwise fill red
      fill(255, 0, 0);
    }
    ellipse(margin.left + canvasSize + (margin.right / 2) * 0.15, margin.top + canvasSize * 0.44, 30, 30); //draw circle
    //powerup section
    var sS = split(str(nf(seekScore, 6)), "");
    textEdit(CENTER, 20, 255, 255, 255, 255, 255, 255, "SEEK MODE HIGHSCORE:\n" + sS[0] + sS[1] + ":" + sS[2] + sS[3] + ":" + sS[4] + sS[5], canvasSize + margin.left + margin.right * 0.75, margin.top + canvasSize * 0.22, true, false);
    textEdit(CENTER, 15, 255, 255, 255, 255, 255, 255, "SEEK MODE INSTRUCTIONS:\nWATCH OUT because the\nenemies FOLLOW YOU!\nScore 15 seconds and unlock REPEL!", canvasSize + margin.left + margin.right * 0.75, margin.top + canvasSize * 0.31, true, false);

    textEdit(CENTER, 20, 255, 255, 255, 255, 255, 255, "HIGHSCORES by Difficulty:", margin.left + canvasSize + (margin.right / 2) * 0.5, canvasSize * 0.77 + margin.top, true, false); //display highscores
    for (var high = 0; high < 10; high += 2) { //loops through the high scores
      var score1 = [0, 0, 0, 0, 0, 0]; //creates an array of each digit
      score1 = split(str(nf(scoreList[high], 6)), ""); //splits the score
      var score2 = [0, 0, 0, 0, 0, 0]; //creates one for the next difficulty
      score2 = split(str(nf(scoreList[high + 1], 6)), ""); //split the second one
      textEdit(CENTER, 13, 255, 255, 255, 255, 255, 255, (high + 1) + "- " + score1[0] + score1[1] + ":" + score1[2] + score1[3] + ":" + score1[4] + score1[5] + "\t" + (high + 2) + "-" + score2[0] + score2[1] + ":" + score2[2] + score2[3] + ":" + score2[4] + score2[5], margin.left + canvasSize + (margin.right / 2) * 0.5, canvasSize * 0.8 + (high * 10) + margin.top, true, false); //display them both in a chart form
    } //loop through every other difficulty
    fill(0, 255, 0); //fill green
    if (entered == 0) { //show an entered status bar theat drops down every time entered is changed
      rect(margin.left + canvasSize + (margin.right / 2) - 10, margin.top + canvasSize * 0.95, 10, 4);
    } else if (entered == 1) {
      rect(margin.left + canvasSize + (margin.right / 2) - 10, margin.top + canvasSize * 0.97, 10, 4);
    } else if (entered == 2) {
      rect(margin.left + canvasSize + (margin.right / 2) - 10, margin.top + canvasSize * 0.99, 10, 4);
    } //show an entered status bar theat drops down every time entered is changed
    stroke(255);
    line(margin.left + canvasSize + margin.right / 2 + 5, margin.top, margin.left + canvasSize + margin.right / 2 + 5, margin.top + canvasSize);
    line(margin.left + canvasSize + margin.right / 2 + 20, margin.top + canvasSize / 2 - 20, margin.left + canvasSize + margin.right - 20, margin.top + canvasSize / 2 - 20);
    line(margin.left + canvasSize + margin.right / 2 + 12, margin.top + canvasSize / 2 - 16, margin.left + canvasSize + margin.right - 12, margin.top + canvasSize / 2 - 16);
    line(margin.left + canvasSize + margin.right / 2 + 20, margin.top + canvasSize / 2 - 12, margin.left + canvasSize + margin.right - 20, margin.top + canvasSize / 2 - 12);
    noStroke();
    textEdit(CENTER, 10, 255, 255, 255, 255, 255, 255, "AVOID.IO designed and created by Erich M.Computer Game ID: " + roundCount, margin.left + canvasSize + margin.right * 0.5, canvasSize + margin.top + margin.bottom - 2, true, false);
  } //INTERFACE

} //lose draw//commmented

class Circle { //creates a circle class that creates a circle with diameter and radius as well as a center position created as a vector
  constructor(x, y, r) { //constructor function to create the circle
    this.x = x; //creates the x pos
    this.y = y; //creates the y pos
    this.r = r; //creates the radius 
    this.d = this.r * 2; //creates the diameter by multiplying the radius by 2

    this.pos = createVector(this.x, this.y); //creates a position vector which acts as a point
  } //closes constructor

  render(rED, g, b, offsetX, offsetY) { //creates a render function for the circle that takes in a set of colour parameters, and an offset to fix some of the translation bugs
    noStroke(); //noStroke of the circles
    fill(rED, g, b); //fill the colour of the parameters
    ellipse(this.pos.x + offsetX, this.pos.y + offsetY, this.d, this.d); //creates a circle
  } //close render function
} //close circle class//commented

class Player extends Circle { //create player class
  constructor(x, y, r) { //creates a constructor class that extends circle
    super(x, y, r); //super class circle
  } //close constructor function

  update(speed) { //create update function
    var stuck = false; //determines whether the player is stuck on an edge
    var mc = dist(mouseX, mouseY, center.x, center.y); //creates a vector from the mouse to the center of the screen
    var mp = dist(mouseX, mouseY, this.pos.x, this.pos.y); //creates a vector from the mouse to the player
    var pc = dist(this.pos.x, this.pos.y, center.x, center.y); //creates a vector from the player to the center
    if (mp > 1.75) { //If the mouse not where the player is, check for update
      if (pc > this.r + canvasSize / 20 && this.pos.x > margin.left + this.r && this.pos.x < margin.left + canvasSize - this.r && this.pos.y > margin.top + this.r && this.pos.y < canvasSize + margin.top - this.r && !stuck) { //if the distance from the player to the center is greater than the radius + the radius of the portal and the player position is within the canvas and the player is not stuck
        this.m = createVector(mouseX - this.pos.x, mouseY - this.pos.y); //create a vector in the direction of the mouse
        this.m.normalize(); //make it a unit vector
        this.m.mult(speed); //multiply it by speed
        this.pos.add(this.m); //add the move to the position
      } else { //otherwise
        stuck = true; //set stuck to true
      } //close check if not stuck

      if (stuck) { //if it is stuck, check the conditions that would make it unstuck
        if (pc <= this.r + canvasSize / 20) { //check that the player distance to center is less than the radii of the circle and the center
          if (mp < mc) { //and checks that the distance from the mouse to the player is less than the mouse to the center 
            this.m = createVector(mouseX - this.pos.x, mouseY - this.pos.y); //creates movement vector
            this.m.normalize(); //make it a unit vector
            this.m.mult(speed); //multiply it by the speed
            this.pos.add(this.m); //add the move to the position
            stuck = false; //set stuck to false
          } //and checks that the distance from the mouse to the player is less than the mouse to the center 
        } //check that the player distance to center is less than the radii of the circle and the center
        if ((this.pos.x <= margin.left + this.r || this.pos.x >= margin.left + canvasSize - this.r) || this.pos.y <= margin.top + this.r || this.pos.y >= canvasSize + margin.top - this.r) { //if the player is stuck on the edge
          if (mouseX > margin.left + this.r && mouseX < canvasSize + margin.left - this.r && mouseY > margin.top + this.r && mouseY < canvasSize + margin.top - this.r) { //if the player is stuck and the mouse is within the canvas size, and within the radius of the player
            this.m = createVector(mouseX - this.pos.x, mouseY - this.pos.y); //create movement vector
            this.m.normalize(); //make it a unit vector
            this.m.mult(speed); //muoltiply it by the speed
            this.pos.add(this.m); //add move to position
            stuck = false; //set stuck to false
          } //if the player is stuck and the mouse is within the canvas size, and within the radius of the player
        } //if the player is stuck on the edge
      } //if it is stuck, check the conditions that would make it unstuck
    } //If the mouse not where the player is, check for update
  } //close update function
  renderImage(img, offsetX, offsetY) { //if there is an image file that is dropped onto the canvas, the player will display it 
    if (unlocks.cPlay == true && img) { //if colour your player is unlocked and there is a file 
      imageMode(CENTER); //set image mode to center
      //(l) = Sqrt((d^2)/2)
      var l = sqrt((pow(this.d, 2) / 2)); //find the with of the image if it is to be perfectly inscribed within the player
      try { //try to load the file as an image
        image(img, this.pos.x + offsetX, this.pos.y + offsetY, l, l); //create an image here
      } //close try statement
      catch (InvalidStateError) { //catch invalid state error (which is where the file is not the right type for loading. this means the user cant drop a text file onto the canvas
        //do nothing
      } //close catch statement
      imageMode(CORNER); //set image mode corner
    } //close if colour unlocked
  } //close renderImage function
} //close player class//commented

class Enemy extends Circle { //open enemy class extending circle
  constructor(x, y, r, s) { //create enemy constructor
    super(x, y, r); //extends circle super class
    this.speed = s; //creates a random speed (max 4 units/frame)
    this.point = createVector(round(random(margin.left + this.r, canvasSize + margin.left - this.r)), round(random(margin.top + this.r, canvasSize + margin.top - this.r))); //picks a random point in the arena//must pick this first//
    this.moveVector = createVector(-(canvasSize / 2 - this.point.x), -(canvasSize / 2 - this.point.y)); //creates a move vector
    this.moveVector.normalize(); //makes move to a unit vector
    this.moveVector.mult(this.speed); //multiply it by the speed of the enemy
    this.u = 0;
  } //close constructor function
  update(play, move) { //creates update function
    if (move) { //if move is set to true

      if (seekMode == false) { //if seek mode is not on, move normally


        if (repelTimer <= 0) {
          if (used == 1 && repelTimer <= 0 && this.u == 0) {
            this.point = createVector(round(random(1, canvasSize - 1)), round(random(1, canvasSize - 1))); //pick a new point
            this.moveVector = createVector(-(this.pos.x - this.point.x), -(this.pos.y - this.point.y)); //create a move vector
            this.moveVector.normalize(); //make the move vector a unit vector
            this.moveVector.mult(this.speed); //multiply it by the speed
            if (this.speed < 4) { //only if the speed is less than 4, add to the speed
              this.speed += 0.0001; //add to speed
            } //close speed check
            this.u++;
          }
          if (floor(dist(this.pos.x, this.pos.y, this.point.x, this.point.y)) > 1) { //if the distance floored is greater than 1 to it's destination point, move
            this.pos.add(this.moveVector); //add the move vector
          } else { //otherwise
            this.point = createVector(round(random(1, canvasSize - 1)), round(random(1, canvasSize - 1))); //pick a new point
            this.moveVector = createVector(-(this.pos.x - this.point.x), -(this.pos.y - this.point.y)); //create a move vector
            this.moveVector.normalize(); //make the move vector a unit vector
            this.moveVector.mult(this.speed); //multiply it by the speed
            if (this.speed < 4) { //only if the speed is less than 4, add to the speed
              this.speed += 0.0001; //add to speed
            } //close speed check
          } //close else statement
        } else {
          this.moveVector = createVector(-(this.pos.x - (play.pos.x - margin.left)), -(this.pos.y - play.pos.y - margin.top));
          this.moveVector.normalize();
          this.moveVector.mult(-this.speed);
          if (this.speed < 4) { //only if the speed is less than 4, add to the speed
            this.speed += 0.0001; //add to speed
          } //close speed check

          if (this.pos.x - this.r > 0 && this.pos.x + this.r < canvasSize && this.pos.y - this.r > 0 && this.pos.y + this.r < canvasSize) {
            this.pos.add(this.moveVector);
          }
        }


      } //if seek mode is not on, move normally
      else { //seekMode is on
        this.moveVector = createVector(-(this.pos.x - (play.pos.x - margin.left)), -(this.pos.y - (play.pos.y - margin.top)));
        this.moveVector.normalize();
        this.moveVector.mult(this.speed);
        if (this.speed < 2.5) { //only if the speed is less than 4, add to the speed
          this.speed += 0.0001; //add to speed
        } //close speed check
        if (repelTimer > 0) {
          this.moveVector.mult(-1);
        }
        if (used == 1 && repelTimer <= 0 && this.u == 0) {
          this.moveVector = createVector(-(this.pos.x - (play.pos.x - margin.left)), -(this.pos.y - (play.pos.y - margin.top)));
          this.moveVector.normalize();
          this.moveVector.mult(this.speed);
          if (this.speed < 2.5) { //only if the speed is less than 4, add to the speed
            this.speed += 0.0001; //add to speed
          } //close speed check
          this.pos.add(this.moveVector);
          this.u++;
        }
        if (this.pos.x - this.r > 0 && this.pos.x + this.r < canvasSize && this.pos.y - this.r > 0 && this.pos.y + this.r < canvasSize) {
          this.pos.add(this.moveVector);
        }
        //  stroke(0);
        //  line(this.pos.x,this.pos.y,play.pos.x-margin.left,play.pos.y-margin.top);
      } //seekMode is on
    } //move
    this.pd = dist(this.pos.x, this.pos.y, play.pos.x - margin.left, play.pos.y - margin.top); //create a field which calculates the distance the player is to intself
  } //close update function
} //close enemey class//commented

function textEdit(a, tS, sR, sG, sB, fR, fG, fB, t, x, y, voidStroke, voidFill) { //crea5te a text stylist function
  textAlign(a); //align the text
  textSize(tS); //create the size of the text
  if (voidStroke == false) { //determines whether the stroke is on or off
    stroke(sR, sG, sB); //if it is not off, colour respectively
  } else { //otherwise
    noStroke(); //set no stroke
  } //close stroke
  if (voidFill == false) { //determines whether to fill the text
    fill(fR, fG, fB); //fill respectively
  } else { //otherwise
    noFill(); //dont fill
  } //close fill check
  text(t, x, y); //create text at defined position
} //close text styler function//commented

function keyPressed() { //keyPressed function is called whenever the key is pressed
  if (start == 1) { //if the game is being played (start == 1)
    if (testRunLength && keyCode == 81) { //if q is pressed
      debugKill = true; //activate debug kill (used for testing the length of runs,etc)
    } //close q
    if (keyCode == 32 && used == 0) { //if the space bar is pressed and the powerup for the round has not been used (used == 0) activate the selected powerup if it unlocked
      if (unlocks.speed && currentPower == 0) { //if speed is unlocked and the selected powerup is speed
        playSpeed = 5.8; //set the speed to 5.8 (acts as a timer as well
      } //close speed
      if (unlocks.bomb && currentPower == 1) { //if bomb is unlocked and the current power up is bomb
        bombNum = 10; //set the timer to 10 (used for UI)
        e = []; //clear enemy array
      } //close bomb
      if (unlocks.star && currentPower == 2) { //if star is unlocked and the current power is star
        starPow = 10; //set star timer to 10
      } //close star
      if (unlocks.freeze && currentPower == 3) { //if freeze is unlocked and selected
        freezePow = 10; //set freeze timer to 10
      } //close freeze
      if (unlocks.repel && currentPower == 4) {
        repelTimer = 10;
      }
      used++; //add one to freeze
    } //close if space is presssed
  } //close if game is running
  else { //if the game is not running 
    if (keyCode == 67 && unlocks.cPlay == true && playerImage) { //and c is pressed
      playerImage = ""; //clear the image file
    } //close C
  } //close while game is not being pressed
} //close keypressed function//commented

function createUC() { //create a usercode with the current data
  var r = round(random(1, 4));
  var scoreCode = str(r) + str(r * 2);
  for (var i = 0; i < 10; i++) {
    scoreCode += str(nf(scoreList[i], 6));
  }
  scoreCode += str(nf(seekScore, 6));

  var unlockCode = "";
  if (unlocks.freeze) {
    unlockCode += "2";
  } else {
    unlockCode += "1";
  }
  if (unlocks.star) {
    unlockCode += "2";
  } else {
    unlockCode += "1";
  }
  if (unlocks.speed) {
    unlockCode += "2";
  } else {
    unlockCode += "1";
  }
  if (unlocks.bomb) {
    unlockCode += "2";
  } else {
    unlockCode += "1";
  }
  if (unlocks.repel) {
    unlockCode += "2";
  } else {
    unlockCode += "1";
  }

  var counts = "";
  counts += str(nf(roundCount, 6));
  counts += str(nf(starCount, 1));

  var code = scoreCode + unlockCode + counts;
  var splitCode = code.split("");
  var subSet = [];

  for (var s = 0; s < 80; s += 5) {
    subSet.push(subset(splitCode, s, 5));
  }
  var newCode = "";
  for (var s1 = 0; s1 < subSet.length; s1++) {
    subSet[s1] = hex(int(join(subSet[s1], "")), 6);
    var sub = split(subSet[s1], "");
    while (sub[0] == "0" && sub.length > 1) {
      sub.splice(0, 1);
    }
    subSet[s1] = join(sub, "");
  }
  for (var s2 = 0; s2 < subSet.length; s2++) {
    if (s2 < subSet.length - 1) {
      newCode += subSet[s2] + "-";
    } else {
      newCode += subSet[s2];
    }
  }
  newCode = r + "-" + newCode;
  newCode = newCode + "-" + (r * 2);

  myCode.style('color', '#ffffff'); //adds style to the html elemnent
  textEdit(CENTER, 10, 255, 255, 255, 255, 255, 255, "Copy and Paste this code into the submit box to save your data: ", margin.left, margin.top + canvasSize, true, false);
  myCode.html('Copy and Paste this code into the submit box to save your data: ' + newCode); //creates the code in the form of an html element so it is copy and pasteable
  // console.log(newnewCode);
} //close create user code//Commented

function loadData() { //function to process user code
  if (entered < 3) { //if entered is greater than 3 (the user only gets 3 chances to enter a proper user code)
    userIn = input.value(); //user input bar
    userIn = trim(userIn); //trim any whitespace off of the ends of the string but not the whitespace in between
    var code = ""; //create a code string variable
    //1-32C7-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-18652-56B8-F-2
    if (int(userIn[0]) * 2 == int(userIn[userIn.length - 1])) { //check double
      var subSet = split(userIn, "-");
      subSet.pop();
      subSet.splice(0, 1);

      for (var i = 0; i < subSet.length; i++) {
        code += (str(nf(unhex(subSet[i]), 5)));
      }
      if (code[0] * 2 == code[1]) {
        var codeA = split(code, "");
        starCount = codeA[codeA.length - 1];
        codeA.pop();
        roundCount = int(join(subset(codeA, codeA.length - 6, 6), ""));
        unlocks.cPlay = roundCount >= 10;
        codeA.splice(codeA.length - 6, 6);

        var unlocksCode = subset(codeA, codeA.length - 5, 5);
        codeA.splice(codeA.length - 5, 5);
        unlocks.freeze = unlocksCode[0] == 2;
        unlocks.star = unlocksCode[1] == 2;
        unlocks.speed = unlocksCode[2] == 2;
        unlocks.bomb = unlocksCode[3] == 2;
        unlocks.repel = unlocksCode[4] == 2;

        var ss = int(join(subset(codeA, codeA.length - 6, 6), ""));
        seekScore = ss;
        if (ss != 0) {
          level[10] = 1;
        }
        codeA.splice(codeA.length - 6, 6);

        for (var w = 9; w >= 0; w--) {
          score = int(join(subset(codeA, codeA.length - 6, 6), ""));
          scoreList[w] = score;
          codeA.splice(codeA.length - 6, 6);
        }
      }
    } //check double

    entered++; //input
  } //close if entered is < 3
} //close code processing//commented

function gotFile(file) { //creates a got file function that detects if an image is draged onto the screen
  playerImage = createImg(file.data).hide(); //sets player image to the dropped image
} //closes gotFile function//commented

function seekSetup() {
  if(start !=1){
  start = 1;
  timer = 0;
  secTimer = 0;
  minTimer = 0;
  hourTimer = 0;
  currentD = 1; //sets the difficulty for the game session
  currentPower = power.value(); //sets the power to whatever the slider was set to
  start = 1; //set start to 1 to begin game
  roundCount++; //adds to the current round round
  seekMode = true;
  }
}

//3-9087-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-1869F-18652-56B8-2337-6