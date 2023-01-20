// Elements selection
const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const diceFaceImg = document.querySelector(".dice-face");
const loaderRing = document.querySelector(".loader-ring");
const diceBackground = document.querySelector(".dice-background");

// Stats element player 1 selection
const player0TotalScoreElement = document.querySelector(".player-0-total-score");
const player0CurrentScoreElement = document.querySelector(".player-0-current-score");
// Stats element player 2 selection
const player1TotalScoreElement = document.querySelector(".player-1-total-score");
const player1CurrentScoreElement = document.querySelector(".player-1-current-score");

// Inputs selection
const playerInput1 = document.querySelector("#player-input-1");
const playerInput2 = document.querySelector("#player-input-2");

// Buttons selection
const startBtn = document.querySelector(".start-button");
const newGameBtn = document.querySelector(".new-game-btn");
const rollDiceBtn = document.querySelector(".roll-dice-btn");
const holdScoreBtn = document.querySelector(".hold-score-btn");

// Game data
let isGameEnd = false;
let playerActive = 0;
let playersTotalScore = [0, 0];
let playersCurrentScore = [0, 0];

// Functions
function switchPlayer() {
    // Remove old active player in UI
    document.querySelector(`.player-${playerActive}`).classList.remove("player-active");
    // Check which player is active and switch it
    if(playerActive === 0) {
        playerActive = 1;
    } else {
        playerActive = 0;
    }
    // Add new active player in UI
    document.querySelector(`.player-${playerActive}`).classList.add("player-active");
}

// Start button
startBtn.addEventListener("click", () => {
    let name1 = playerInput1.value;
    let name2 = playerInput2.value;
    if((name1 !== "" && name2 !== "") && (name1.length <= 8 && name2.length <= 8)) {
        document.querySelector(".player-name-0").textContent = playerInput1.value;
        document.querySelector(".player-name-1").textContent = playerInput2.value;
        startScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
    } else {
        alert("Empty field or too long name! (max 8 characters)");
    }
});

// New game button
newGameBtn.addEventListener("click", () => {
    // Reset game data
    isGameEnd = false;
    playerActive = 0;
    playersTotalScore = [0, 0];
    playersCurrentScore = [0, 0];
    // Reset scores in UI
    player0TotalScoreElement.textContent = 0;
    player0CurrentScoreElement.textContent = 0;
    player1TotalScoreElement.textContent = 0;
    player1CurrentScoreElement.textContent = 0;
    // Remove player active
    document.querySelector(`.player-1`).classList.remove("player-active");
    // Remove player winner
    document.querySelector(`.player-0`).classList.remove("player-winner");
    document.querySelector(`.player-1`).classList.remove("player-winner");
    // Set player active
    document.querySelector(`.player-0`).classList.add("player-active");
    // Change screen
    gameScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

// Roll dice button
rollDiceBtn.addEventListener("click", () => {
    if(!isGameEnd) {
        // Loading effects
        diceBackground.classList.add("hidden");
        loaderRing.classList.remove("hidden");
        // Dice rolling
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        diceBackground.style.backgroundColor = "black";
        diceFaceImg.src = `./media/dice-${diceRoll}.png`;
        setTimeout(() => {
            // Load dice face
            loaderRing.classList.add("hidden");
            diceBackground.classList.remove("hidden");
            // Set Score and update UI
            playersCurrentScore[playerActive] += diceRoll;
            document.querySelector(`.player-${playerActive}-current-score`).textContent = playersCurrentScore[playerActive];
            // Checking if rolled dice is equal 1
            if(diceRoll === 1) {
                // Set dice background red
                diceBackground.style.backgroundColor = "red";
                // Reset current score of player active
                playersCurrentScore[playerActive] = 0;
                document.querySelector(`.player-${playerActive}-current-score`).textContent = 0;
                // Switch player active
                switchPlayer();
            }
        }, 600);
    }
});

// Hold score button
holdScoreBtn.addEventListener("click", () => {
    if(!isGameEnd) {
        // Update total score and reset current score of active player
        playersTotalScore[playerActive] += playersCurrentScore[playerActive];
        playersCurrentScore[playerActive] = 0;
        // Set total score and update UI
        document.querySelector(`.player-${playerActive}-total-score`).textContent = playersTotalScore[playerActive];
        document.querySelector(`.player-${playerActive}-current-score`).textContent = 0;
        if(playersTotalScore[playerActive] >= 100) {
            isGameEnd = true;
            diceBackground.classList.add("hidden");
            document.querySelector(`.player-${playerActive}`).classList.remove("player-active");
            document.querySelector(`.player-${playerActive}`).classList.add("player-winner");
            document.querySelector(`.player-name-${playerActive}`).textContent = "You won!";
        } else {
            // Hide dice for new player
            diceBackground.classList.add("hidden");
            // Switch player active
            switchPlayer();
        }
    }
});
