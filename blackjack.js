const blackjackDeck = getDeck();

// copied from the in-class exercise

const getDeck = () => {
  const suits = ['hearts', 'spades', 'clubs', 'diamonds']
  const deck = []

  for (let i = 0; i < suits.length; i++) {
    //create an array of 13 objects for each suit
    for (j = 1; j <= 13; j++) {

      let displayVal = ""
      switch (j) {
        case (1):
          displayVal = "Ace"
          break;
        case (11):
          displayVal = "Jack"
          break;
        case (12):
          displayVal = "Queen"
          break;
        case (13):
          displayVal = "King"
          break;
        default:
          displayVal = j
          break;
      }

      //for each loop, push a card object to the deck.
      const card = {
        val: j,
        displayVal: displayVal,
        suit: suits[i]
      }

      if (displayVal === "Ace") {
        card.val = 11;
      }

      deck.push(card);
    }
  }
  return deck;
}
/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name){
    this.name = name;
    this.hand = [];
    this.cardElementId ='';
    drawCard = () => {
      let drawedCard = blackjackDeck[Math.floor(Math.random() * 52)];
      this.hand.push(drawedCard);
      console.log(drawedCard);
      document.getElementById(this.cardElementId).innerText = this.hand.map((card) => `${card.suit}-${card.displayVal}`).join(', ');
    };
  }
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('dealer');
const player = new CardPlayer('player');

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
    } else {                //handle non Ace
      total += hand[i].val; 
    }
  }

  let isSoft = aceCount > 0 && aceCountAs_11 > 0;

  return {isSoft,total};

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
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
 console.log(startGame());