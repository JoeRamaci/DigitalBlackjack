let suitsarray = new Array("Spades", "Clubs", "Hearts", "Diamonds");
let cardvaluearray = new Array(11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10);
let valuearray = new Array("Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King");

// initialize decks
let playerHand = new Array();
let dealerHand = new Array();
// TODO: make currentDeck here so all funcs can get

/**Creates a new deck array consisting of 52 cards.
 * Each card has an assigned Value (int), ValueName (string), and Suit (string).
 */
function createDeck(){
    let deck = new Array();
    for(let i = 0; i < suitsarray.length; i++){
        for(let x = 0; x < 13; x++){
            let card = {Value: cardvaluearray[x], ValueName: valuearray[x], Suit: suitsarray[i]};
            deck.push(card);
        }
    }
    return deck;
}

/**
 * Shuffles a deck using the Fisher-Yates shuffle algorithm.
 * @param {Array} Deck Object to be shuffled.
 * @returns Shuffled deck.
 */
function shuffleDeck(ShuffledDeck){
    let currentIndex = ShuffledDeck.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [ShuffledDeck[currentIndex], ShuffledDeck[randomIndex]] = [ShuffledDeck[randomIndex], ShuffledDeck[currentIndex]];
    }
    return ShuffledDeck;
}

function returnCardName(Deck, i){
    return (Deck[i].ValueName + (" of ") + Deck[i].Suit);
}

// Checks contents of deck and player hand; prints to console
function checkCards(Deck){
    // builds string in console
    HandString = "Current Hand: \n"
    for(let i = 0; i < Deck.length; i++){
        HandString = HandString + i + " " + returnCardName(Deck, i) + "\n";
        
    }
    console.log(HandString);
}

/**
 * Adds Cards to Hand from Deck.
 * @param {Array} hand Hand to push Card to.
 * @param {Array} Deck Shuffled Deck to deal Cards from.
 * @returns adds first card to the hand from the deck, and removes that card from the deck.
 */
function dealCard(hand, Deck){

    return hand.push(Deck[0]), Deck.shift();
}

/**
 * Sums all cards within a hand.
 * @param {Array} hand array of given hand.
 * @returns sum of hand.
 */
function cardSum(hand){
    sum = 0;
    for(let i = 0; i < hand.length; i++ ){
        sum = hand[i].Value + sum;
    }
    return sum;
}

/** 
 * Main Function
 * Creates both player hands, creates + shuffles deck, deals two cards each, displays player's hand total on page. Checks deck, and checks who won 
 * TODO: Currently will add cards to hand continually, while seemingly not removing them from CurrentDeck after initial kick. Must disallow clicking of start game button
 *      this function is tied to once game is started. 
  */
function createNewGame(){
    playerHand = [];
    dealerHand = [];
    const CurrentDeck = new createDeck;
    shuffleDeck(CurrentDeck);

    // Calls the dealCard function and deals two cards to the player hand and dealer hand.
    dealCard(playerHand, CurrentDeck);
    dealCard(dealerHand, CurrentDeck);
    dealCard(playerHand, CurrentDeck);
    dealCard(dealerHand, CurrentDeck);

    console.log("playerHand:")
    playerHand.forEach(e => console.log(e));
    console.log("dealerHand:")
    dealerHand.forEach(e => console.log(e));

    document.getElementById("hand-title").innerHTML=("Player hand total = " + cardSum(playerHand) + "\n");
    document.getElementById("startGame").value=("Restart Gambling!");
    checkCards(CurrentDeck);
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
 * TODO: get it working 
 */
function getPlayerHand(){
    console.log("playerHand:")
    playerHand.forEach(e => console.log(e));
    console.log("dealerHand:")
    dealerHand.forEach(e => console.log(e));
}

/**
 * adds no card to player's deck, 
 */
function stand(){

}

/**
 * TODO: write
 */
function getDealerHand(){}

    window.addEventListener('load', function(event){
    document.getElementById("startGame").addEventListener("click", createNewGame);
    document.getElementById("hit").addEventListener("click", dealCard(playerHand, CurrentDeck));
    document.getElementById("hand-title").value=("Player hand total = " + cardSum(playerHand) + "\n");

});

/** 
 * TODO:
 *  1) add a stand button
 *  2) add hit button
 *  3) disallow start game button once a game is started.
 *      1) Boolean check?
 *  4) make getPlayerHand/getDealerHand exportable for use in displaying React elements online
 *  5) make getDealerHand
 *  6) make Deck a global obj so all functions are looking at the same deck
 *  7) make hands global too?
 */