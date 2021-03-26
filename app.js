// Rock Paper Scissors Game

function rpsGame(yourChoice) {
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberTochoice(randomToRpsInt());
  results = decideWinner(humanChoice, botChoice);
  console.log("ComputerChoice", botChoice);
  console.log("result", results);
  message = finalMessage(results);
  console.log(message)
  rpsFrontEnd(humanChoice, botChoice, message);
}

function randomToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberTochoice(number) {
  return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(humanChoice, botChoice) {
  let rpsDatabase = {
    'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0, },
    'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0, },
    'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0, }
  };

  let yourScore = rpsDatabase[humanChoice][botChoice];
  let botScore = rpsDatabase[botChoice][humanChoice];
  return [yourScore, botScore]
}

function finalMessage([yourScore]) {
  if (yourScore === 0) {
    return { 'message': 'You Lost!', 'color': 'red' };
  } else if (yourScore == 0.5) {
    return { 'message': 'You Tied!', 'color': 'yellow' };
  } else {
    return { 'message': 'You Win!', 'color': 'green' };
  }
}

function rpsFrontEnd(humanImageChoise, botImageChoice, finalMessage) {
  let imageDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src,
  }
  document.getElementById('rock').remove()
  document.getElementById('paper').remove()
  document.getElementById('scissors').remove()
  let humanDiv = document.createElement('div');
  let botDiv = document.createElement('div');
  let messageDiv = document.createElement('div');
  humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoise] + "' height=150 width=150/>";
  botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150/>";
  messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 2em; padding:2em;'>" + finalMessage['message'] + "</h1>"
  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
}

// Change color with select option 
let all_buttons = document.getElementsByTagName('button');
let copyAllButtons = [];
for (let button of all_buttons) {
  copyAllButtons.push(button.classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'red') {
    buttonRed()
  } else if (buttonThingy.value === "green") {
    buttonGreen()
  } else if (buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if (buttonThingy.value === 'random') {
    randomColors()
  }
}

function buttonRed() {
  for (let button of all_buttons) {
    button.classList.remove(button.classList[1])
    button.classList.add('btn-danger')
  }
}
function buttonGreen() {
  for (let button of all_buttons) {
    button.classList.remove(button.classList[1])
    button.classList.add('btn-success')
  }
}
function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

// The BlackJack-Game 
let blackjackGame = {
  'you': { 'scoreSpan': '#your-blackjack-score', 'div': '#your-box', 'score': 0 },
  'dealer': { 'scoreSpan': '#dealer-blackjack-score', 'div': '#dealer-box', 'score': 0 },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false,
}
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU)
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play()
  }
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {
    let yourImages = document.querySelector("#your-box").querySelectorAll('img');
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
    for (let yourImage of yourImages) {
      yourImage.remove()
    }
    for (let dealerImage of dealerImages) {
      dealerImage.remove()
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-score').textContent = 0;
    document.querySelector('#your-blackjack-score').style.color = "white";
    document.querySelector('#dealer-blackjack-score').textContent = 0
    document.querySelector('#dealer-blackjack-score').style.color = "white";
    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = 'black';
    blackjackGame['isStand'] = false;
    blackjackGame["turnsOver"] = false;
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;
  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  return showResult(winner);
}

function computeWinner() {
  let winner;
  if (YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++
      winner = YOU;
    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++
      winner = DEALER;
    } else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++
    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++
    winner = DEALER;
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = "You won!";
      messageColor = 'green';
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = "You Lost!";
      messageColor = 'red';
      lossSound.play()
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You draw!';
      messageColor = 'black';
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }

}