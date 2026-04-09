1. I added a 4th difficulty "Insane" that has them guess the random number between 1-1000. I think it improves the game because it adds a even more challenging level. I just added another radio button in the html file and set the value of the button to 1000. 
Line 15 in HTML
2. I added code so that if the user inputs something outside of the level diffuculty's range it output's "Please enter a number between 1 and (max number). I think this will improve the game because it prevents people from making a stupid mistake like entering a number outside the range. This does not impact their score. I checked if the "guess" was less than 1 or greater than the selection range based off the level difficulty.
Lines 55-58 in JS
3. I added a calculation for win percentage. I added 2 more variables, "wins" and "giveups". I think this improve the game because it gives the user a statistic to see how often they complete/win the game. I also added another thing in the HTML that displays the win percentage with the id "winP". Then I had the text content be wins/(wins+giveups) * 100%. 
HTML line 29
JS line 11, 12, 66, 126, 160
