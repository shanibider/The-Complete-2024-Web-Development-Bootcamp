
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];  // (4) new userClickedPattern arrey


// step 7 - Start the Game
var started = false;  //keep track of whether if the game has started or not
var level  = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//  step 4- Check Which Button is Pressed by user
$(".btn").click(function() {
  // Inside the handler, userChosenColour store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  // contents of the variable userChosenColour added to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
 // console.log(userClickedPattern);

 // (5) When a user clicks on a button, the corresponding sound should be played
  playSound(userChosenColour);

  // (8) Call checkAnswer() after a user has clicked and chosen their answer, passing the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

});



// Step 8 - Check the User's Answer Against the Game Sequence
function checkAnswer(currentLevel){

  // check if the most recent user answer is the same as the game pattern.
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");
    console.log(gamePattern);     //log the gamePattern array (random color chosen) 
    console.log(userClickedPattern);    //log the userClickedPattern array (the color the user clicked)
    // If the user got the most recent answer right in pervious if, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
    else{
      console.log("wrong");
      // Step 9 - Game Over
      playSound("wrong");
      
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
       //(10) Call startOver() if user gets the sequence wrong.
       startOver();
  }  
}




// step 2 - Create A New Pattern
function nextSequence() {

    //(8) Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

  //(7) update the h1 with this change in the value of level.
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Step 3 - Show the Sequence to the User with Animations and Sounds
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   // (5) work for both playing sound in nextSequence() and when the user clicks a button.
   playSound(randomChosenColour);
}



// Step 5 - Sounds added to Button Clicks
function playSound(name){
 var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Step 6 - Add Animations to User Clicks
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed"); //add this pressed class to the button that gets clicked

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);      //remove the added class
}




// Step 10 - Restart the Game
function startOver() {

  // reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
