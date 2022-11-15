/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds']
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
          displayVal = j.toString()
          break;
      }

      //for each loop, push a card object to the deck.
      const card = {
        val: j > 10 ? 10 : j,
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

// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);

console.log(randomCard);