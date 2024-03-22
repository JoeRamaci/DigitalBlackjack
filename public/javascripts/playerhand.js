// Renders player's hand on the board
// MUST be PascalCase to signify React element, and lower-case for HTML elements
function PlayerHand(){
    return (<button className="square">X</button>);
}

const ph = ReactDOM.createRoot(document.getElementById('player-hand'));
ph.render(<PlayerHand />)