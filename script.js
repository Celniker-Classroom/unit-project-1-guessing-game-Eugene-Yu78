// Game Start
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];
//player Name
let playerName = prompt("Enter your name:");
//play
document.getElementById("playBtn").addEventListener("click",function(){
    let radios = document.getElementsByName("level");
    let range = 3;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value);
        }
    }
//random number generator
    answer = Math.floor(Math.random() * range) + 1;
//button 
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value = " ";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
//disable level selection
    let levelRadios = document.getElementsByName("level");
    for (let i=0; i<levelRadios.length; i++){
        levelRadios[i].disabled = true;
    }
});

//guess
document.getElementById("guessBtn").addEventListener("click", function(){
    let guessInput = document.getElementById("guess");
    let guess = parseInt(guessInput.value);
    guessCount++;
    totalGuesses++;
    if(guess === answer){
        document.getElementById("msg").textContent = "Congratulations " + playerName + "! You guessed the number in " + guessCount + " guesses.";
        totalWins++;
        scores.push(guessCount);
        endGame();
    } else if (guess < answer){
        document.getElementById("msg").textContent = "Too low! Try again.";
    } else {
        document.getElementById("msg").textContent = "Too high! Try again.";
    }
    guessInput.value = " ";
});

//give up
document.getElementById("giveUpBtn").addEventListener("click", function(){
    document.getElementById("msg").textContent = "The correct number was " + answer + ". Better luck next time, " + playerName + "!";
    endGame();
});

function endGame(){
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    let levelRadios = document.getElementsByName("level");
    for (let i=0; i<levelRadios.length; i++){
        levelRadios[i].disabled = false;
    }
    guessCount = 0;
}