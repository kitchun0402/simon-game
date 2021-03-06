var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStarted = false;

$(document).on("keydown", function() {
  if (!isStarted) {
    $("h1").text("Level 0");
    nextSequence();
    isStarted = true;
  }
})

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("h1").text("Level " + level);
  var randomNum = Math.floor(Math.random() * 3);
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}

function playSound(chosenColor) {
  switch (chosenColor) {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "wrong":
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      break;
    default:

  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(lastIndexOfUserPattern) {

  var userClicked = userClickedPattern[lastIndexOfUserPattern];
  var gameClicked = gamePattern[lastIndexOfUserPattern];

  // Check every latest clicked pattern is the same as the pattern generated by the game.
  if (userClicked === gameClicked) {

    // Clicked all patterns.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  isStarted = false;
}
