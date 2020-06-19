/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice(dado) as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

// Dice's event
document.querySelector('.btn-roll').addEventListener('click', function(){

    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1 (rule)
        if(dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }else{
            // Next player
            nextPlayer();

        }        
    }

});

// Hold's event
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update de UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // Change gamePlaying to false (have a winner)
            gamePlaying = false;
            
        }else{
            nextPlayer();

        }

    }

});

// Next player
function nextPlayer(){

    // Change the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Restart
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Put on active
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide the dice
    document.querySelector('.dice').style.display = 'none';

}

// New game
document.querySelector('.btn-new').addEventListener('click', init);

// Restart
function init(){

    // Initialize
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    // Hide the dice
    document.querySelector('.dice').style.display = 'none';

    // Initialize both scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    // Initialize both current scores to zero
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // if has a winner, remove the name in the pannel
    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';

    // Remove the 'Winner' css class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Glitch
    document.querySelector('.player-0-panel').classList.add('active');

};