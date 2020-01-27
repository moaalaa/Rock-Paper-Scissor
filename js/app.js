// Elements
const choices       = document.querySelectorAll('.choice');
const score         = document.getElementById('score');
const result        = document.getElementById('result');
const restartBtn    = document.getElementById('restart-game');
const modal         = document.getElementById('modal');

// Conditions
const conditions = [
    // Rock Conditions
    {player_choice: 'rock', machine_choice: 'rock', result: 'draw'},
    {player_choice: 'rock', machine_choice: 'scissors', result: 'player'},
    {player_choice: 'rock', machine_choice: 'paper', result: 'machine'},
    
    // Paper Conditions
    {player_choice: 'paper', machine_choice: 'paper', result: 'draw'},
    {player_choice: 'paper', machine_choice: 'scissors', result: 'machine'},
    {player_choice: 'paper', machine_choice: 'rock', result: 'player'},
    
    // scissors Conditions
    {player_choice: 'scissors', machine_choice: 'scissors', result: 'draw'},
    {player_choice: 'scissors', machine_choice: 'paper', result: 'player'},
    {player_choice: 'scissors', machine_choice: 'rock', result: 'machine'},
];

// Scoreboard
const scoreboard = {
    player: 0,
    machine: 0
}

// Play Function
const play = (e) => {
    restartBtn.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const machineChoice = makeChoice();

    const winner = decideWinner(playerChoice, machineChoice);

    console.log(machineChoice);
    
    updateUI(winner, machineChoice)
}

// Machine Choice
const makeChoice = () => {
    const rand = Math.floor(Math.random() * 3); // 3 Is the number of choices we have

    if (rand == 0) {
        return 'rock';
    } else if (rand == 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

const decideWinner = (playerChoice, machineChoice) => {
    for (const condition of conditions) {
        if (condition.player_choice == playerChoice && condition.machine_choice == machineChoice) {
            return condition.result;
        }
    }
}

const updateUI = (winner, machineChoice) => {
    if (winner == 'player') {
        scoreboard.player++;
        result.innerHTML = `
            <h1 class="text-win">You Win</h1>
            <i class="fas fa-hand-${machineChoice} fa-10x"></i>
            <p>Machine Chose ${machineChoice}</p>
        `;
    } else if (winner == 'machine') {
        scoreboard.machine++;
        result.innerHTML = `
            <h1 class="text-lose">You Lose</h1>
            <i class="fas fa-hand-${machineChoice} fa-10x"></i>
            <p>Machine Chose ${machineChoice}</p>
        `;
    } else {
        result.innerHTML = `
            <h1 class="text-draw">Draw</h1>
            <i class="fas fa-hand-${machineChoice} fa-10x"></i>
            <p>Machine Chose ${machineChoice}</p>
        `;
    }

    // Show Score
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Machine: ${scoreboard.machine}</p>
    `;

    modal.style.display = 'block';
}

const clearModal = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

const restartGame = (e) => {
    scoreboard.player = 0;
    scoreboard.machine = 0;

    // Show Score
    score.innerHTML = `
        <p>Player: 0</p>
        <p>Machine: 0</p>
    `;

    restartBtn.style.display = 'none';
}

restartBtn.addEventListener('click', restartGame);

// Event Listeners
choices.forEach(choice => choice.addEventListener('click', play))

window.addEventListener('click', clearModal)