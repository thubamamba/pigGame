/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his ENTIRE score when he rolls two 6 in a rows, after which, it will be the next player's turn.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//Event Listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random Number
        //Uses the Math Object
        dice1 = Math.floor(Math.random() *6) + 1;
        dice2 = Math.floor(Math.random() *6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'assets/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'assets/dice-' + dice2 + '.png';

        //3. Update the round score only IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }  
});

//Implement Hold
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        //Checks if the users have defined the winning value: Type coesion - undefined, 0, null or "" are coerced to false and anything else is coerced to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Hooray!!! Winner!!'
            //Removes 'active' class
            document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //Apply 'winner' class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //Stops Roll Dice from adding numbers after game has been won
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //reset the round score 
    roundScore = 0; 

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Update active user UI
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Hide dice when player rolls a 1
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

//New Game Button
//This method passes the init function and doesn't call the anonymous function
document.querySelector('.btn-new').addEventListener('click', init);

//init function
function init () {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    gamePlaying = true;

    //Changing CSS - this hides the dice when opening the game
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    //Resets the default score when opening the page
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Changes player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //Changes the player styling
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
