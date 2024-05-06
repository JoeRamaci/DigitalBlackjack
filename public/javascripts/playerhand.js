/**
 * displays player's hand as cards and numerical value
 * @returns React DOM element displaying cards and numerical value
 */

// import { getPlayerHand } from './blackjack.js';

// Renders player's hand on the board
// MUST be PascalCase to signify React element, and lower-case for HTML elements
function PlayerHand() {
    // let hand = getPlayerHand();
    return (
        // <p>{hand}</p>
        <p>x</p>
    );
}

const ph = ReactDOM.createRoot(document.getElementById('player-hand'));
ph.render(<PlayerHand />)