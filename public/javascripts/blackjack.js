let suitArray = new Array("Spades", "Clubs", "Hearts", "Diamonds");
let cardValueArray = new Array(11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10);
let faceArray = new Array("Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King");

/**
 * Creates a new deck array consisting of 52 unshuffled cards.
 * @returns Unshuffled deck.
 */
function createDeck(){
    let deck = new Array();
    for(let i = 0; i < suitArray.length; i++){
        for(let x = 0; x < 13; x++){
            let card = {faceValue: cardValueArray[x], faceName: faceArray[x], suit: suitArray[i]};
            deck.push(card); 
        }
    }
    return deck;
}

/**
 * Shuffles a deck object using the Fisher-Yates shuffle algorithm.
 * @param {*} deck Deck to be shuffled.
 * @returns Shuffled deck.
 */
function shuffleDeck(deck){
    let currentIndex = deck.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}

/**
 * Returns the name of a card from a hand or deck using a specified index.
 * @param {*} cards Hand or deck to be indexed.
 * @param {*} i Index for hand or deck.
 * @returns String i.e. "Ace of Spades"
 */
function returnCardName(cards, i){
    return (cards[i].faceName + (" of ") + cards[i].suit);
}

/**
 * Creates a string of each card in a hand or deck and outputs the result to the console.
 * @param {*} cards Hand or deck input.
 */
function checkCards(cards){
    cardsString = "Current Hand: \n";
    for(let i = 0; i < cards.length; i++){
        cardsString = cardsString + " " + returnCardName(cards, i) + "\n";
        
    }
    console.log(cardsString);
}

/**
 * Adds card from deck to hand.
 * @param {*} hand Hand to have card added to.
 * @param {*} deck Deck to deal card from.
 * @returns hand with dealt card and deck with card removed.
 */
function dealCard(hand, deck){
    return hand.push(deck[0]), deck.shift();
}

/**
 * Sums all cards within a hand.
 * @param {*} hand Hand to sum all cards.
 * @returns Sum of hand.
 */
function cardSum(hand){
    sum = 0;
    if(hand[0].faceValue == 11 && hand[1].faceValue == 11){
        hand[0].faceValue = 1;
    }
    for(let i = 0; i < hand.length; i++ ){
        sum = hand[i].faceValue + sum;
    }
    if(sum > 21){
        for(let i = 0; i < hand.length; i++ ){
            if(hand[i].faceValue == 11){
                hand[i].faceValue = 1;
                break;
            }
        }
        sum = 0;
        for(let i = 0; i < hand.length; i++ ){
            sum = hand[i].faceValue + sum;
        }
        return sum;
    }
    return sum;
}

function createNewGame(){
    let playerHand = [];
    let dealerHand = [];
    let currentDeck = new createDeck;
    shuffleDeck(currentDeck);
    
    dealCard(playerHand, currentDeck);
    dealCard(dealerHand, currentDeck);
    dealCard(playerHand, currentDeck);
    dealCard(dealerHand, currentDeck);

    checkCards(playerHand);
    console.log("Dealer Hand: \n???\n" + returnCardName(dealerHand, 1) + "\n\nCurrent Player Sum: " + cardSum(playerHand) + "\nCurrent Dealer Sum: " + dealerHand[1].faceValue);

    document.getElementById("dealer-hand-message").innerHTML=("Dealer Hand: \n???\n" + returnCardName(dealerHand, 1) + "\nCurrent Dealer Sum: " + dealerHand[1].faceValue);
    document.getElementById("player-hand-message").innerHTML=("Current Player Sum: " + cardSum(playerHand));
    document.getElementById("startGame").value=("Restart Gambling!");
    checkCards(currentDeck);
    checkWinCondition(cardSum(playerHand), cardSum(dealerHand));
    
    //while(cardSum(playerHand) < 21 && cardSum(dealerHand) < 21){
    //    console.log("test loop");
  //      var input = prompt("Enter something here");
//
    //}
}

function checkWinCondition(playerHandSum, dealerHandSum){
    if(playerHandSum == 21 && dealerHandSum != 21){
        document.getElementById("hand-title").innerHTML=("You win!")
        return gameOver = true;
    }
    if(playerHandSum != 21 && dealerHandSum == 21 || playerHandSum > 21){
        document.getElementById("hand-title").innerHTML=("You lose!")
        return gameOver = true;
    }
    else{
      return gameOver = false;  
    }
}

/**
 * TODO: 10), 3) 
 */
function getPlayerHand(){
    console.log("playerHand:")
    playerHand.forEach(e => console.log(e));
    console.log("dealerHand:")
    dealerHand.forEach(e => console.log(e));
}

/**
 * TODO: 11), 3)
 */
function getDealerHand(){}

/**
 * TODO: 1)
 * adds no card to player's deck, 
 */
function stand(){
    var elem = document.getElementById("hit");
}

window.addEventListener('load', function(event){
    document.getElementById("startGame").addEventListener("click", createNewGame);
    document.getElementById("hit").addEventListener("click", dealCard(playerHand, currentDeck));

    // TODO: this gives TypeError because when playerHand is initialied, it is empty with nothing. cardSum will 
    // not work on it until it has items, but by the time cardSum is called, playerHand is populated. 
    document.getElementById("hand-title").innerHTML=("Player hand total = " + cardSum(playerHand) + "\n");
});