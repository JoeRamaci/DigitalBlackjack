let suitsarray = new Array("Spades", "Clubs", "Hearts", "Diamonds");
let cardvaluearray = new Array(11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10);
let valuearray = new Array("Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King");
let gameOver = false;


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
 * @param {deck} DeckObj Object to be shuffled.
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

function returnCardName(DeckObj, i){
    return (DeckObj[i].ValueName + (" of ") + DeckObj[i].Suit);
}

// Checks contents of deck and player hand; prints to console
// TODO: make this sum a hand and return an int
function checkHand(DeckObj){
    // builds string in console
    HandString = "Current Hand: \n"
    for(let i = 0; i < DeckObj.length; i++){
        HandString = HandString + i + " " + returnCardName(DeckObj, i) + "\n";
        
    }
    console.log(HandString);
}

/**
 * Adds Cards to Hand from DeckObj
 * @param {*} hand Hand to push Card to 
 * @param {*} DeckObj Shuffled Deck to deal Cards from
 * 
 * @returns adds first card to the hand from the deck, and removes that card from the deck.
 */
function dealCard(hand, DeckObj){

    return hand.push(DeckObj[0]), DeckObj.shift();
}

/**
 * sums up all cards within a hand
 * @param {*} hand array of given hand
 * @returns sum of hand
 */
function cardSum(hand){
    sum = 0;
    for(let i = 0; i < hand.length; i++ ){
        sum = hand[i].Value + sum;
    }
    return sum;
}

/**
 * created outside function so it can be passed to other functions
 */
let playerHand = new Array();
let dealerHand = new Array();
/** 
 * Main Function
 * Creates both player hands, creates + shuffles deck, deals two cards each, displays player's hand total on page. Checks deck, and checks who won 
 * TODO: Currently will add cards to hand continually, while seemingly not removing them from CurrentDeck after initial kick. Must disallow clicking of start game button
 *      this function is tied to once game is started. 
  */
function createNewGame(){
    // let playerHand = new Array();
    // let dealerHand = new Array();
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
    checkHand(CurrentDeck);
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
 * TODO: write
 */
function getDealerHand(){}

window.addEventListener('load', function(event){
    document.getElementById("startGame").addEventListener("click", createNewGame);
});

/** 
 * TODO:
 *  1) add a stand button
 *  2) add hit button
 *  3) disallow start game button once a game is started.
 *  4) make getPlayerHand/getDealerHand exportable for use in displaying React elements online
 *  5) make getDealerHand
 */