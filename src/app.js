ReactDOM.render(
    <DiceRoller history={ window.diceHistory(window.localStorage) }></DiceRoller>,
    document.getElementById('dice-roller')
);