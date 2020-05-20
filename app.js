/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, currentPlayer, dice, isHumanRound, isGamePlaying, winPoint;
isGamePlaying = 0;



// while (scores[0] < 100 && scores[1] < 100 ){

//     dice = Math.floor( 6 * Math.random() ) + 1;

//     console.log("This round : dice gives ", dice);
//     console.log("Current score board", scores);
//     document.querySelector('#current-'+currentPlayer).innerHTML = dice;
//     document.querySelector("#score-"+currentPlayer).innerHTML = scores[currentPlayer];
//     scores[currentPlayer] += dice;
//     currentPlayer = 1 - currentPlayer;
//     // await sleep(2000);
// }

function initGame() {
    scores = [0, 0];
    roundScore = 0;
    currentPlayer = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.btn-hold').addEventListener('click', hold);
    document.querySelector('.btn-roll').addEventListener('click', roll);

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');


    document.querySelector("#name-0").textContent = "Player";
    document.querySelector("#name-1").textContent = "Computer";
    document.querySelector('.btn-hold').classList.remove('btn-deactivate');
    document.querySelector('.btn-roll').classList.remove('btn-deactivate');

    isGamePlaying = 1;
}

function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function computerRounds() {
    alert("Computer's round")

    if (isGamePlaying) {
        isHumanRound = 0;
        while (isHumanRound === 0) {

            //await new Promise(r => setTimeout(r, 2000));
            console.log(1);

            var holdProb = roundScore / 30;
            if (holdProb > 0.6) {
                //hold
                hold();
                //It's player's round;
            } else {
                //continue
                roll();
            }
        }
    }

}

function switchPlayer() {
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-' + (1 - currentPlayer) + '-panel').classList.toggle('active');
    document.querySelector('.player-' + currentPlayer + '-panel').classList.toggle('active');
    // document.getElementById('dice-1').style.display = 'none';
    // document.getElementById('dice-2').style.display = 'none';
}

function hold() {

    if (isGamePlaying) {
        scores[currentPlayer] += roundScore;

        document.getElementById('score-0').textContent = scores[0];
        document.getElementById('score-1').textContent = scores[1];
        currentPlayer = 1 - currentPlayer;
        roundScore = 0;

        if (scores[1 - currentPlayer] > 66) {
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + (1 - currentPlayer) + '-panel').classList.add('winner');
            document.querySelector("#name-" + (1 - currentPlayer)).textContent = "Winner!";
            document.querySelector('.btn-hold').removeEventListener('click', hold);
            document.querySelector('.btn-hold').classList.add('btn-deactivate');
            document.querySelector('.btn-roll').removeEventListener('click', roll);
            document.querySelector('.btn-roll').classList.add('btn-deactivate');
            isGamePlaying = 0;

            if (currentPlayer === 0) {
                isHumanRound = 1;
            }

        } else {
            switchPlayer();

            if (currentPlayer === 1) {
                isHumanRound = 0;
                computerRounds();
            } else {
                isHumanRound = 1
            }
        }
    }
    // add the current score;
}

function roll() {
    if (isGamePlaying) {
        dice_1 = Math.floor(6 * Math.random()) + 1;
        dice_2 = Math.floor(6 * Math.random()) + 1;

        var diceDOM_1 = document.getElementById('dice-1');
        var diceDOM_2 = document.getElementById('dice-2');
        diceDOM_1.style.display = 'block';
        diceDOM_2.style.display = 'block';
        diceDOM_1.src = 'dice-' + dice_1 + '.png';
        diceDOM_2.src = 'dice-' + dice_2 + '.png';

        console.log("This round : dice gives ", dice_1, ", ", dice_2);

        if ((dice_1 === dice_2)) {

            if (dice_1 === 6) {
                alert("Double Six, player " + (currentPlayer + 1) + " loses all his scores!");
                scores[currentPlayer] = 0
                document.getElementById('score-0').textContent = scores[0];
                document.getElementById('score-1').textContent = scores[1];
            }

            if (dice_1 === 1) {
                alert("Double One, player " + (2 - currentPlayer) + " loses all his scores!");
                scores[1 - currentPlayer] = 0
                document.getElementById('score-0').textContent = scores[0];
                document.getElementById('score-1').textContent = scores[1];
            }

            currentPlayer = 1 - currentPlayer;
            roundScore = 0;
            switchPlayer();
            if (currentPlayer === 1) {
                isHumanRound = 0;
                computerRounds();
            } else {
                isHumanRound = 1
            }
        } else {
            roundScore += dice_1 > dice_2 ? dice_1 : dice_2;
            document.querySelector('#current-' + currentPlayer).innerHTML = roundScore;
        }


        console.log("Current score board", scores);
    }
}

// set the button listeners
document.querySelector(".btn-new").addEventListener('click', initGame);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-roll').addEventListener('click', roll);

//Start the game
initGame();