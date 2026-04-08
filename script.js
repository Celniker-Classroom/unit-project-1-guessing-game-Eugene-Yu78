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
    let input = document.getElementById("guess");
    let guess = parseInt(input.value);
    if(isNaN(guess)){
        document.getElementById("msg").textContent = "Please enter a valid number,!";
        return;
    }
    guessCount++;
    totalGuesses++;
    
    //correct, too low, too high
    if(guess === answer){
        document.getElementById("msg").textContent = "Correct! " + playerName + ", you guessed the number in " + guessCount + " guesses.";

    } else if (guess < answer){
        document.getElementById("msg").textContent = "Too low! Try again.";
    } else {
        document.getElementById("msg").textContent = "Too high! Try again.";
    }
    updatescore(guessCount);

    //difference hot cold
    let diff = Math.abs(guess - answer);
    if(diff <= 2 && guess !== answer){
        document.getElementById("msg").textContent += " You're HOT!";
    }  
    else if(diff <= 5 && guess !== answer){
        document.getElementById("msg").textContent += " You're WARM!";
    }
    else if(diff > 5){
        document.getElementById("msg").textContent += " You're COLD!";
    }
    input.value = " ";
});

function updatescore(score){
        totalWins++;
        totalGuesses += score;
        document.getElementById("wins").textContent = "Total Wins: " + totalWins;
        document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalWins).toFixed(2);
}

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