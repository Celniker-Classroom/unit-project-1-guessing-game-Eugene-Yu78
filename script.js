// Game Start
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];
let totalRounds = 0;
let totalTimeMs = 0;
let fastestTimeMs = null;
let roundStartMs = 0;

function formatPlayerName(name) {
    if (!name || name.trim() === "") {
        return "Player";
    }
    const cleaned = name.trim().toLowerCase();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function getSelectedRange() {
    let radios = document.getElementsByName("level");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return parseInt(radios[i].value, 10);
        }
    }
    return 3;
}

let playerName = formatPlayerName(prompt("Enter your name:"));
//play
document.getElementById("playBtn").addEventListener("click",function(){
    let range = getSelectedRange();
    answer = Math.floor(Math.random() * range) + 1;
    roundStartMs = new Date().getTime();
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
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
        document.getElementById("msg").textContent = "Please enter a valid number.";
        return;
    }
    guessCount++;
    
    //correct, too low, too high
    if(guess === answer){
        document.getElementById("msg").textContent = "Correct! " + playerName + ", you guessed the number in " + guessCount + " guesses.";
        updateScore(guessCount, true);
        updateTimers(new Date().getTime());
        endGame();
        input.value = "";
        return;
    } else if (guess < answer){
        document.getElementById("msg").textContent = "Too low!";
    } else {
        document.getElementById("msg").textContent = "Too high!";
    }

    let diff = Math.abs(guess - answer);
    if(diff <= 2){
        document.getElementById("msg").textContent += " You're hot!";
    }  
    else if(diff <= 5){
        document.getElementById("msg").textContent += " You're warm!";
    }
    else if(diff > 5){
        document.getElementById("msg").textContent += " You're cold!";
    }
    input.value = "";
});

function updateScore(score, isWin){
    if(isWin){
        totalWins++;
        totalGuesses += score;
    }

    scores.push(score);
    scores.sort(function(a, b){ return a - b; });

    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    if(totalWins > 0){
        document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalWins).toFixed(2);
    } else {
        document.getElementById("avgScore").textContent = "Average Score: 0";
    }

    let leaderboard = document.getElementsByName("leaderboard");
    for(let i = 0; i < leaderboard.length; i++){
        if(i < scores.length){
            leaderboard[i].textContent = scores[i];
        } else {
            leaderboard[i].textContent = "";
        }
    }
}

const updatescore = updateScore;

//give up
document.getElementById("giveUpBtn").addEventListener("click", function(){
    let range = getSelectedRange();
    document.getElementById("msg").textContent = "The correct number was " + answer + ". Better luck next time, " + playerName + "!";
    updateScore(range, false);
    updateTimers(new Date().getTime());
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

function formatTimeMs(ms){
    return (ms / 1000).toFixed(2) + "s";
}

function updateTimers(endMs){
    if(!roundStartMs){
        return;
    }
    let roundTimeMs = endMs - roundStartMs;
    totalRounds++;
    totalTimeMs += roundTimeMs;
    if(fastestTimeMs === null || roundTimeMs < fastestTimeMs){
        fastestTimeMs = roundTimeMs;
    }
    document.getElementById("fastest").textContent = "Fastest Game: " + formatTimeMs(fastestTimeMs);
    document.getElementById("avgTime").textContent = "Average Time: " + formatTimeMs(totalTimeMs / totalRounds);
    roundStartMs = 0;
}

function formatDaySuffix(day){
    if(day >= 11 && day <= 13){
        return "th";
    }
    let lastDigit = day % 10;
    if(lastDigit === 1) return "st";
    if(lastDigit === 2) return "nd";
    if(lastDigit === 3) return "rd";
    return "th";
}

function time(){
    let now = new Date();
    let monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = monthNames[now.getMonth()];
    let day = now.getDate();
    let suffix = formatDaySuffix(day);
    let year = now.getFullYear();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    return month + " " + day + suffix + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
}

function updateDateTime(){
    document.getElementById("date").textContent = time();
}

updateDateTime();
setInterval(updateDateTime, 1000);
