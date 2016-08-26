
function getDiceString(diceConfigState) {
    return diceConfigState.diceConfig
        .map(cfg => cfg.number ? `${cfg.number}d${cfg.size} ` : '')
        .join('')
        .concat(diceConfigState.modifier ? ` + ${diceConfigState.modifier}` : '');
}

const DiceString = (props) => (
    <span className="dice-string">{ getDiceString(props.data) }</span>
);