/*

GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score.
- After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();   // Calling the init() function

// Working on the ROLL DICE button

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) { // If the game is being played
    // 1. Random number
    var dice = Math.floor(Math.random()*6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; // Choosing the dice image to display

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) { // If dice gives a number that is not 1 then keeping adding to the score
      // Add score
      roundScore = roundScore + dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {        // If the dice gives 1, then switch to the next player
      // Next player
      nextPlayer();
    }
  }
});

// Working on the HOLD button

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Adding the player's CURRENT score to the GLOBAL score
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Updating the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Checking if the player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.dipslay = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;   // Stopping the game
    } else {
      // Next player
      nextPlayer(); // Calling the nextPlayer() function
    }
  }
});


// The Next Player function switches the active player status from one player
// to the other one, when one player finishes his/her turn.

function nextPlayer() {
  // Next player
  // If activePlayer is 0, then activePlayer = 1, else activePlayer = 0
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0; // Setting current player's score to 0

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Switching the active status from one player to another
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none'
}

// Working on the New Game button

document.querySelector('.btn-new').addEventListener('click', init);

// On clicking the New Game button, the ini() function is called
// and the game restarts

// The init() function starts the game by setting the players' scores
// to 0

function init() {
  scores = [0, 0];    // Resetting both players' scores to 0
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // Initializing our UI
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  // We are removing the 'active' and 'winner' classes first from both players
  // as no one is active at the beginning of the game; and then we are adding
  // the 'active' class back to Player 1 (player-0) as Player 1 starts the game.
}
