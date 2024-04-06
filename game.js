var buttonColor= ["green","red","yellow","blue"];
var gamePattern =[];
var userClickedPattern = [];

var level = 0;
var isGameStarted = false;

document.addEventListener("keydown",function(){
    if(!isGameStarted){
        nextSequence();

        isGameStarted = true;
    }
})    


    //  NOW WE WILL TAKE INPUT FROM PLAYER 
    //detect click of mouse
    $(".btn").click(function(){
        // store the id of the button that got clicked
        var userChosenColor = $(this).attr("id");

        userClickedPattern.push(userChosenColor);
        //console.log(userClickedPattern);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    });

    //check is answer by user is correct or not to go to next level
    function checkAnswer(currentLevel){
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            //console.log("success");

            if (userClickedPattern.length === gamePattern.length){
                userClickedPattern = [];
                setTimeout(function () {
                  nextSequence();
                }, 700);
            }
        } else {
            $("h1").text("GameOver, Press Any KEYBOARD Key to Restart");
            isGameStarted = false;
            level = 0 ;
            gamePattern =[];
            userClickedPattern = [];
            //console.log("wrong");
      }
    }

    //GIVE RANDOM COLOR TO PLAYER ,
    function nextSequence() {
        level ++;
        $("h1").text("Level " + level);
        var randomColor = buttonColor[Math.floor(Math.random()*4)];
        gamePattern.push(randomColor);

        $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomColor);
    }

    //fun for adding sound where called (called from above)
    function playSound(name){
        var audio = new Audio("sounds/" + name +".mp3");
        audio.play();
    }
    //fun for adding animation where called (called from above)
    function animatePress(currentColor){
        $("." + currentColor).addClass("pressed");
        
        setTimeout(function(){
            $("." + currentColor).removeClass("pressed");
        },100);
    }


