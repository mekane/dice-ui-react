const DiceInput = (props) => (
    <div className="dice-input">
        <input className="dice-input__number" type="text" name="number"/>
        <span className="dice-input__d">d</span>
        <span className="dice-input__size">{ props.size }</span>
        <div className="dice-input__controls">
            <button type="button" className="dice-input__controls__button">-</button>
            <button type="button" className="dice-input__controls__button">+</button>
        </div>
    </div>
);