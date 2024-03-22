let suitsarray = new Array("Spades", "Clubs", "Hearts", "Diamonds");
let cardvaluearray = new Array(11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10);
let valuearray = new Array("Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King");
let gameOver = false;


/**Creates a new deck object consisting of 52 cards.
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

function checkDeck(DeckObj){
    HandString = "Current Hand: \n"
    for(let i = 0; i < DeckObj.length; i++){
        HandString = HandString + returnCardName(DeckObj, i) + "\n";
        
    }
    console.log(HandString);
}

function dealCard(hand, DeckObj){

    return hand.push(DeckObj[0]), DeckObj.shift();
}

function cardSum(hand){
    sum = 0;
    for(let i = 0; i < hand.length; i++ ){
        sum = hand[i].Value + sum;
    }
    return sum;
}

function createNewGame(){
    let playerHand = new Array();
    let dealerHand = new Array();
    const CurrentDeck = new createDeck;
    shuffleDeck(CurrentDeck);

    // Calls the dealCard function and deals two cards to the player hand and dealer hand.
    dealCard(playerHand, CurrentDeck);
    dealCard(dealerHand, CurrentDeck);
    dealCard(playerHand, CurrentDeck);
    dealCard(dealerHand, CurrentDeck);
        document.getElementById("hand-title").innerHTML=("Player hand total = " + cardSum(playerHand) + "\n");
        checkDeck(CurrentDeck);
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

// export function getPlayerHand(){

// }

window.addEventListener('load', function(event){
    document.getElementById("startGame").addEventListener("click", createNewGame);
});