let suitArray = new Array("Spades", "Clubs", "Hearts", "Diamonds");
let cardValueArray = new Array(11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10);
let faceArray = new Array("Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King");

/**
 * TODO: 10), 3) 
 */
function getPlayerHand(playerHand) {
    console.log("playerHand:")
    playerHand.forEach(e => console.log(e));
}

/**
 * TODO: 11), 3)
 */
function getDealerHand(dealerHand) {
    console.log("dealerHand:")
    dealerHand.forEach(e => console.log(e));
}

/**
 * Creates a new deck array consisting of 52 unshuffled cards.
 * @returns Unshuffled deck.
 */
function createDeck() {
    let deck = new Array();
    for (let i = 0; i < suitArray.length; i++) {
        for (let x = 0; x < 13; x++) {
            let card = { faceValue: cardValueArray[x], faceName: faceArray[x], suit: suitArray[i] };
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
function shuffleDeck(deck) {
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
function returnCardName(cards, i) {
    console.log("RETURNCARDNAME " + cards[i].faceName + (" of ") + cards[i].suit);
    return (cards[i].faceName + (" of ") + cards[i].suit);
}

/**
 * Creates a string of each card in a hand or deck and outputs the result to the console.
 * @param {*} cards Hand or deck input.
 */
function checkCards(cards) {
    cardsString = "Current Hand: \n";
    for (let i = 0; i < cards.length; i++) {
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
function dealCard(hand, deck) {
    return hand.push(deck[0]), deck.shift();
}

/**
 * Sums all cards within a hand.
 * @param {*} hand Hand to sum all cards.
 * @returns Sum of hand.
 */
function cardSum(hand) {
    sum = 0;
    if (hand[0].faceValue == 11 && hand[1].faceValue == 11) {
        hand[0].faceValue = 1;
    }
    for (let i = 0; i < hand.length; i++) {
        sum = hand[i].faceValue + sum;
    }
    if (sum > 21) {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].faceValue == 11) {
                hand[i].faceValue = 1;
                break;
            }
        }
        sum = 0;
        for (let i = 0; i < hand.length; i++) {
            sum = hand[i].faceValue + sum;
        }
        return sum;
    }
    return sum;
}

// create global vars to be referenced elsewhere, though they will be defined here
let playerHand;
let dealerHand;
let currentDeck;
function createNewGame() {
    // document.getElementById("player_card3").setAttribute("hidden", "");
    // document.getElementById("player_card4").setAttribute("hidden", "");
    // document.getElementById("dealer_card3").setAttribute("hidden", "");


    // Initializes two empty hands for the player and dealer.
    playerHand = [];
    dealerHand = [];

    // Creates a new deck and shuffles.
    currentDeck = new createDeck;
    shuffleDeck(currentDeck);

    //Deals the initial two cards to each hand from the top of the shuffled deck.
    dealCard(playerHand, currentDeck);
    dealCard(dealerHand, currentDeck);
    dealCard(playerHand, currentDeck);
    dealCard(dealerHand, currentDeck);

    // document.getElementById("dealer-hand-message").innerHTML=("Dealer Hand: \n???\n" + returnCardName(dealerHand, 1) + "\nCurrent Dealer Sum: " + dealerHand[1].faceValue);
    // document.getElementById("player-hand-message").innerHTML=("Current Player Sum: " + cardSum(playerHand));
    
    cardName = returnCardName(playerHand, 0);
    changeImage(cardName, "player_card1");
    cardName = returnCardName(playerHand, 1);
    changeImage(cardName, "player_card2");

    changeImage("Unknown Card", "dealer_card1");
    cardName = returnCardName(dealerHand, 1);
    changeImage(cardName, "dealer_card2");


    // Replaces the start game button with a restart game button. And unhides the hit and stand buttons.
    document.getElementById("startGame").value = ("Restart Game!");
    document.getElementById("hit").removeAttribute("hidden");
    document.getElementById("stand").removeAttribute("hidden");

    checkWinCondition(cardSum(playerHand), cardSum(dealerHand));
    
}

function changeImage(img, id) {
    document.getElementById(id).src = "./images/Cards/" + img + ".png";
    console.log("CHANGEIMAGE ./images/Cards/" + img + ".png");
}

function checkWinCondition(playerHandSum, dealerHandSum) {
    if (playerHandSum == 21 && dealerHandSum != 21) {
        document.getElementById("win-loss-message").innerHTML = ("You win!");    
        return gameOver = true;
    }
    if (playerHandSum != 21 && dealerHandSum == 21 || playerHandSum > 21) {
        document.getElementById("win-loss-message").innerHTML = ("You lose!");
        // get the name of first card from dealer
        cardName = returnCardName(dealerHand, 0);
        // change image from unknown to known
        changeImage(cardName, "dealer_card1");
        return gameOver = true;
    }
    else {
        return gameOver = false;
    }
}

let playerCardCount = 2;
let dealerCardCount = 2;
function hit(playerHand, currentDeck, dealerHand) {
    // deal a card to player and dealer(should just deal to whomever we want it to deal to)
    dealCard(playerHand, currentDeck);
    dealCard(dealerHand, currentDeck);
    // get name of last player card
    let playerCardName = returnCardName(playerHand, playerCardCount);

    // PLAYER
    console.log("HIT PLAYER " + playerCardName);
    playerCardCount++;
    console.log(playerCardCount);
    let playerName = document.getElementsByName('player-cards');
    console.log("TAG PLAYER"+playerName);
    
    // Grab all elements with the name 'player-cards'
    const playerCards = document.getElementsByName('player-cards');
    // Loop through each element with the name 'player-cards'
    for (let i = 0; i < playerCards.length; i++) {
        // Create a new element
        const newElement = document.createElement('img');
        newElement.id = `player_card${playerCardCount}`;
        newElement.style.width = '15%';

        // Append the new element to the current element
        playerCards[i].appendChild(newElement);
    }
    console.log(playerCardName + `player_card${playerCardCount}`);
    changeImage(playerCardName, `player_card${playerCardCount}`);

    // // DEALER
    // let dealerCardName = returnCardName(dealerHand, dealerCardCount);
    // console.log("HIT DEALER" + dealerCardName);
    // dealerCardCount++;
    // console.log(dealerCardCount);
    // let dealerName = document.getElementsByName('dealer-cards');
    // console.log("TAG DEALER"+ dealerName);

    // // Grab all elements with the name 'player-cards'
    // const dealerCards = document.getElementsByName('dealer-cards');
    // // Loop through each element with the name 'player-cards'
    // for (let i = 0; i < dealerCards.length; i++) {
    //     // Create a new element
    //     const newElement = document.createElement('img');
    //     newElement.id = `dealer_card${dealerCardCount}`;
    //     newElement.style.width = '15%';

    //     // Append the new element to the current element
    //     dealerCards[i].appendChild(newElement);
    // }
    // console.log(dealerCardName + ` dealer_card${dealerCardCount}`);
    // changeImage(dealerCardName, `dealer_card${dealerCardCount}`);

    // DEBUG
    console.log("\nPlayerHand post hit:");
    checkCards(playerHand);
    console.log("\nDealerHand post hit:");
    checkCards(dealerHand);
    console.log("\n");

    // REVEAL DEALER
    // get the name of first card from dealer
    // cardName = returnCardName(dealerHand, 0);
    // // change image from unknown to known
    // changeImage(cardName, "dealer_card1");

    // check if someone won
    checkWinCondition(cardSum(playerHand), cardSum(dealerHand));
}

/**
 * TODO: 1)
 * adds no card to player's deck, 
 */
function stand() {
    checkWinCondition(cardSum(playerHand), cardSum(dealerHand));
    // REVEAL DEALER
    // get the name of first card from dealer
    cardName = returnCardName(dealerHand, 0);
    // change image from unknown to known
    changeImage(cardName, "dealer_card1");
}

// const hitButton = document.getElementById("hit");

// hitButton.addEventListener("click", hit(playerHand, currentDeck, dealerHand));


window.addEventListener('load', function() {
    document.getElementById("startGame").addEventListener("click", function() {
        createNewGame();
    });
    document.getElementById('hit').addEventListener('click', function() {
        console.log("HIT");
        hit(playerHand, currentDeck, dealerHand);
    });
});