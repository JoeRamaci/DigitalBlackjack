// Renders player's hand on the board
// MUST be PascalCase to signify React element, and lower-case for HTML elements
function PlayerHand(){
    return (<p>X</p>);
}

const ph = ReactDOM.createRoot(document.getElementById('player-hand'));
ph.render(<PlayerHand />)