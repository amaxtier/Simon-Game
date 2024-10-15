var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickedPattern = [];
var level = 0;
started = false;


$(document).keydown(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});



$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
        
    }
    else {
        if (started) {
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over")
            setTimeout(function() {
                $("body").removeClass("game-over")
            },200);
        
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }   
    }
}


function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
};

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    $("h1").text("level " + level);
    level++;
};

function animatePress(currentColor) {
    $("." +  currentColor).addClass("pressed");
    setTimeout(function(){
        $("."  +  currentColor).removeClass("pressed");
    }, 100);
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started= false;
};