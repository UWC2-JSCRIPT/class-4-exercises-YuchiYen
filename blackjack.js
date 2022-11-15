//const blackjackDeck = getDeck();
// copied from the in-class exercise

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  drawCard = () => {
    let drawedCard = getDeck()[Math.floor(Math.random() * 52)];
    this.hand.push(drawedCard);
    console.log(drawedCard);
    var msg = `${this.name} drawed {${drawedCard.suit} ${drawedCard.displayVal} ${drawedCard.val}}`;
    console.log(msg);
    gameDisplay.innerHTML = msg + "<br/>"

  };
};

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer');
const player = new CardPlayer('Player');
let gameDisplay = document.getElementById("gameDisplay");



/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  let total = 0;
  let aceCount = 0;
  let aceCountAs_01 = 0;
  let aceCountAs_11 = 0;

  for (i = 0; i < hand.length; i++) {
    if (hand[i].val == 11) {  //handle Ace
      aceCount++;
      if ((total + 11) > 21) { //Ace count as 1
        total += 1;
        aceCountAs_01++;
      } else {                 //Ace Count as 11
        total += 11;
        aceCountAs_11++;
      }
    } else {                //handle non-Ace
      total += hand[i].val;
    }
  }

  let isSoft = aceCount > 0 && aceCountAs_11 > 0;

  return { isSoft, total };
}


/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */

const dealerShouldDraw = (dealerHand) => {
  let points = calcPoints(dealerHand);
  return (points.total < 17 || (points.total === 17 && points.isSoft));
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */

const determineWinner = (playerScore, dealerScore) => {
  let result = '';
  if (playerScore > dealerScore) {
    result = 'Player Wins';
  }
  else if (playerScore < dealerScore) {
    result = 'Dealer Wins';
  }
  else {
    result = 'tie';
  }
  return `Player Score: ${playerScore}, Dealer Score: ${dealerScore}, ${result}`;
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  let msg = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`;
  console.log(msg);
  gameDisplay.innerHTML += msg + "<br/>"
}

/**
 * Runs Blackjack Game
 */
const startGame = function () {

  console.log('gamestarts here');
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();
  var playerDrawTally = 2;
  var dealerDrawTally = 2;

  let playerScore = calcPoints(player.hand).total;
  
  showHand(player);

  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerDrawTally++;
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }

  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  let msg = `Player stands at ${playerScore}`;
  console.log(msg);
  gameDisplay.innerHTML += msg + "<br/>";

  if (playerScore === 21 && playerDrawTally === 2)
    return ("Player wins - 21 points without additional draw")

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerDrawTally++;
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }

  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  let msg1 = `Dealer stands at ${dealerScore}`;
  console.log(msg1);
  gameDisplay.innerHTML += msg + "<br/>" + msg1 + "<br/>";

  if (dealerScore === 21 && dealerDrawTally === 2)
    return ("Dealer wins - 21 points without additional draw")

  return determineWinner(playerScore, dealerScore);
}
let result = startGame();
console.log(result);
gameDisplay.innerHTML += result + "<br/>"; 