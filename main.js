const buttons = document.querySelectorAll('.user-choice');
let userSelection;
let computerSelection;
const score = {"user": 0, "computer": 0};
const game = ["rock","scissors","paper"];
const mark = document.getElementById('mark');
const result = document.querySelectorAll('.result');
let computerChoice;
let userChoice;
const main = document.querySelector('.main');
const resultOfRound = document.querySelector('#round-result');
const winnerDiv = document.getElementById('winner');

const toggleDisplay = () => {
    main.classList.toggle("toggle-display-main");
    resultOfRound.classList.toggle("round-result"); 
}
const showRoundResult = (user,computer) => {
    computerChoice = document.querySelector('.comp-selected');
    computerChoice.innerHTML = document.getElementById(computer).innerHTML;
    computerChoice.classList.add(computer);
    userChoice = document.querySelector('.user-selected');
    userChoice.innerHTML = document.getElementById(user).innerHTML;
    userChoice.classList.add(user);
}
const roundResult = (userChoice,computerChoice) => {
    if(userChoice === computerChoice)
        return "TIE";
    else if((game.indexOf(userChoice) + 1)%3 === game.indexOf(computerChoice)){
        score["user"]++;
        return "YOU SCORED";
    }else{
        score["computer"]++;
        return "OOPS :(";
    }       
}
const computerPlay = () => { return game[Math.floor(Math.random()*3)]; }

const findWinner = () => { return (score["user"] === 5) ? "USER" : "COMPUTER"; }

const declareWinner = () => {
    resultOfRound.classList.toggle("round-result"); 
    let winner = document.getElementById('winner-result');
    winner.innerText = findWinner() + " WON !!";
    winnerDiv.style.display =  "block";
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        userSelection = btn.id;
        computerSelection = computerPlay();
        let res = roundResult(userSelection,computerSelection);
        result.forEach( (text) => {
            text.innerText = res;
        });
        mark.innerText = score["user"] + "/" + score["computer"];
        toggleDisplay();
        showRoundResult(userSelection,computerSelection);
        if(score["user"] === 5 || score["computer"] === 5)
            declareWinner();
    });
});

let btnContinue = document.querySelectorAll('.continue-btn');
btnContinue.forEach( (btn) => {
    btn.addEventListener('click' , () => {
        toggleDisplay();
        computerChoice.classList.remove(computerSelection);
        userChoice.classList.remove(userSelection);
    });    
});


document.getElementById('play-again-button').addEventListener("click" , () =>{
    score["user"] = 0;
    score["computer"] = 0;
    mark.innerText = 0 + "/" + 0;
    main.classList.toggle("toggle-display-main");
    winnerDiv.style.display = "none";
});